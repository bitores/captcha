import React, { useEffect, useRef, useState } from 'react';
import './style.less';
import {debounce, getRandomNumberByRange, createImg} from '../utils'

export default ({onRefresh, onFail, onSuccess, 
  l = 42, // 滑块边长
  r = 9, // 滑块半径
  offset = 10,//验证容错偏差值
})=>{
  const [loading, setLoading] = useState(true)
  const [draging, setDraging] = useState(0);
  const [targetX, setTargetX] = useState(0);

  const targetRef = useRef();
  const canvasRef = useRef();
  const dragRef = useRef();
  const sliderRef = useRef();
  const sliderMaskRef = useRef();


  function drawPath (ctx, x, y, operation) {
    const PI = Math.PI
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
    ctx.lineTo(x + l, y)
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
    ctx.lineTo(x + l, y + l)
    ctx.lineTo(x, y + l)
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
    ctx.lineTo(x, y)
    ctx.lineWidth = 2
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.stroke()
    ctx.globalCompositeOperation = 'destination-over'
    operation === 'fill'? ctx.fill() : ctx.clip()
  }


  function reset(canvasCurrent, dragCurrent){
    const L = l + r * 2 + 3 // 滑块实际边长
    const rect = canvasCurrent.getBoundingClientRect()
    sliderRef.current.style.left = 0 + 'px';
    dragRef.current.style.left = 0 + 'px'
    sliderMaskRef.current.style.width = 0 + 'px';
    setDraging(0)
    setLoading(true)
    createImg((img)=>{
      setLoading(false)

      // 随机位置创建拼图形状
      let x = getRandomNumberByRange(L + 10, rect.width - (L + 10))
      let y = getRandomNumberByRange(10 + r * 2, rect.height - (L + 10))

      const ctx =canvasCurrent.getContext('2d')
      
      // 清空画布
      ctx.clearRect(0,0, rect.width, rect.height)
      drawPath(ctx, x, y, 'fill')
      ctx.drawImage(img, 0, 0, rect.width, rect.height)

      const dragCtx =dragCurrent.getContext('2d')
      dragCurrent.width = rect.width;
      dragCtx.clearRect(0,0, rect.width, rect.height)
      drawPath(dragCtx, x, y, 'clip')
      dragCtx.drawImage(img, 0, 0, rect.width, rect.height)
      const ImageData = dragCtx.getImageData(x - 3, y - r * 2 - 1, L, L)
      dragCurrent.width = L;
      dragCtx.putImageData(ImageData, 0, y - r * 2 - 1)
      
      
      setTargetX(x);
      onRefresh&&onRefresh()
    }, rect.width, rect.height)
  }

  useEffect(()=>{
    const canvasCurrent = canvasRef.current;
    const dragCurrent = dragRef.current;
    function resize(){
      const rect = canvasCurrent.getBoundingClientRect()
      //
      canvasCurrent.setAttribute('width',rect.width )
      canvasCurrent.setAttribute('height',rect.height )
      dragCurrent.setAttribute('width',rect.width )
      dragCurrent.setAttribute('height',rect.height )
      reset(canvasCurrent, dragCurrent)
    }
    resize()

    let originX, originY, trail = [], isMouseDown = false

    const handleDragStart = function (e) {
      originX = e.touches? e.touches[0].clientX : e.clientX;
      originY = e.touches? e.touches[0].clientY : e.clientY;
      isMouseDown = true
    }

    const handleDragMove = (e) => {
      if (!isMouseDown) return false
      e.preventDefault()
      const eventX = e.touches? e.touches[0].clientX : e.clientX;
      const eventY = e.touches? e.touches[0].clientY : e.clientY;
      const moveX = eventX - originX
      const moveY = eventY - originY

      const rect = canvasCurrent.getBoundingClientRect()
      const width = rect.width;
      if (moveX < 0 || moveX + 38 >= width) return false
      sliderRef.current.style.left = moveX + 'px'
      sliderMaskRef.current.style.width = moveX + 'px';
      const blockLeft = (width - 40 - 20) / (width - 40) * moveX
      dragRef.current.style.left = blockLeft + 'px'
      
      setDraging(1);
    }

    const handleDragEnd = (e) => {
      if (!isMouseDown) return false
      isMouseDown = false
      const eventX = e.clientX || e.changedTouches[0].clientX
      if (eventX === originX) return false
      const left = parseInt(dragRef.current.style.left)
      if(Math.abs(targetRef.current - left) < offset) {
        console.log('成功')
        onSuccess&&onSuccess()
        setDraging(2)
      } else {
        onFail&&onFail()
        setDraging(3)
        setTimeout(()=>{
          reset(canvasCurrent, dragCurrent)
        }, 1000)
      }
    }

    const debounceResize = debounce(resize, 1000);    
    sliderRef.current.addEventListener('mousedown', handleDragStart)
    sliderRef.current.addEventListener('touchstart', handleDragStart)
    dragRef.current.addEventListener('mousedown', handleDragStart)
    dragRef.current.addEventListener('touchstart', handleDragStart)
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('touchmove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchend', handleDragEnd)
    window.addEventListener('resize', debounceResize)
    return ()=>{
      sliderRef.current.removeEventListener('mousedown', handleDragStart)
      sliderRef.current.removeEventListener('touchstart', handleDragStart)
      dragRef.current.removeEventListener('mousedown', handleDragStart)
      dragRef.current.removeEventListener('touchstart', handleDragStart)
      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('touchmove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)
      document.removeEventListener('touchend', handleDragEnd)
      window.removeEventListener('resize', debounceResize)
    }
  },[])

  useEffect(()=>{
    targetRef.current= targetX;
  },[targetX])

  return  (<div id="slider-captcha" className="hzj01-slider-captcha">
    <div className="captcha-body">
      <canvas className="m-canvas" ref={canvasRef}></canvas>
      <canvas className="drag-canvas" ref={dragRef}></canvas>
      {
        loading&&<div className="loading">
        <span className="loadingIcon"></span>
        <span>加载中。。。</span> 
      </div>
      }
    </div>
    <div className="refreshIcon" onClick={()=>{
      const canvasCurrent = canvasRef.current;
      const dragCurrent = dragRef.current;
  
      reset(canvasCurrent, dragCurrent)
    }} ></div>
    <div className={`slider-container ${['','active','success','fail'][draging]}`}>
      <div className="sliderMask" ref={sliderMaskRef}>
        <div className="slider" ref={sliderRef}>
          <span className="sliderIcon"></span>
        </div>
      </div>
      <span className="sliderText">向右滑动填充拼图</span>
    </div>
  </div>)
}