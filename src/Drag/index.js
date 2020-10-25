import React, { useEffect, useRef, useState } from 'react';
import './style.less';
import {debounce, createImg} from '../utils'


export default ({onRefresh, onFail, onSuccess})=>{
  const [loading, setLoading] = useState(false);
  const [checkState, setCheckState] = useState(0)
  const [draggable, setDraggable] = useState(true)
  const canvasRef = useRef();
  const targetRef = useRef()

  
  function reset(canvasCurrent){
    const rect  =canvasCurrent.getBoundingClientRect();
    let w = parseInt(rect.width/4);
    setCheckState(0)
    setLoading(true)
    createImg((img)=>{
      setLoading(false)
      let sw = parseInt(img.width/4);
      let sh = parseInt(img.height/2);
      const children = canvasCurrent.children;
      let arr = [];
      for (let index = 0; index < children.length; index++)  {
        arr.push(index);
        const item = children[index];
        item.style.order = index+1;
        const ctx = item.getContext('2d')
        // debugger
        ctx.drawImage(img, index%4 * sw, parseInt(index/4)*sh, sw, sh, 0,0,w,w)
        ctx.strokeRect(0, 0, w, w);
      }

      // 随机两个
      let nArr = arr.sort(()=>{
        return Math.random()-0.5;
      });

      let a = nArr[0];
      let b = nArr[2];

      const orderA = children[a].style.order;
      const orderB = children[b].style.order;
      children[a].style.order = orderB;
      children[b].style.order = orderA;


      onRefresh&&onRefresh()
    }, 300, 150)
  }

  useEffect(()=>{
    const canvasCurrent = canvasRef.current;

    function resize(){

      const rect  =canvasCurrent.getBoundingClientRect();
      let w = parseInt(rect.width/4);
      const children = canvasCurrent.children;

      for (let index = 0; index < children.length; index++)  {
        const item = children[index];
        item.width = w;
        item.height = w;
        
        
        item.style.padding = 0;
        // item.style.width = w + 'px';
        // item.style.height = w + 'px';
        item.style.width = '25%';
        item.style.height = '25%';
      }

      reset(canvasCurrent);
    }

    resize()

    const debounceResize = debounce(resize, 1000);
    window.addEventListener('resize', debounceResize)
    return ()=>{
      window.removeEventListener('resize', debounceResize)
    }
  },[])

  function checkVer(){
    const canvasCurrent = canvasRef.current;
    const rect  =canvasCurrent.getBoundingClientRect();
    // let w = parseInt(rect.width/4);
    const children = canvasCurrent.children;

    let fail = false;

    for (let index = 0; index < children.length; index++)  {
      const item = children[index];
      if(item.style.order!==`${index+1}`) {
        fail = true;
      }
    }

    if(fail) {
      onFail&&onFail()
      setCheckState(2)
      setTimeout(()=>{
        reset(canvasCurrent)
      }, 1000)
      
      // console.log('失败')

    } else {
      setCheckState(1);
      setTimeout(()=>{
        onSuccess&&onSuccess();
      },1000)
      
      // console.log('成功')
    }
  }

  function ondragstart(e){

    targetRef.current = e.target;
    return false;
  }


  function ondragenter(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }

    e.target.style.border = '2px solid red';
    e.target.style.filter = 'grayscale(100%)';
  }

  function ondragleave(e) {
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    e.target.style.border = 'unset';
    e.target.style.filter = 'unset';
  }

   function ondragover(e) {
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    
    return false;
  }

  function ondrop(e) {
    setDraggable(false)
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    
    e.target.style.border = 'unset';
    e.target.style.filter = 'unset';
   let orderOrigin = targetRef.current.style.order;
   let orderTarget = e.target.style.order;

   targetRef.current.style.order = orderTarget;
   e.target.style.order = orderOrigin;
  
   setTimeout(()=>{
     checkVer();
     setDraggable(true)
   },0)
   
  }

  return (<div className="hzj02-drag-captcha">
    <div className="captcha-body" ref={canvasRef}  onDragStart={ondragstart}  onDragEnter={ondragenter} onDragLeave={ondragleave} onDragOver={ondragover} onDrop={ondrop}>
      <canvas className="item" draggable={draggable}></canvas>
      <canvas className="item" draggable={draggable}></canvas>
      <canvas className="item" draggable={draggable}></canvas>
      <canvas className="item" draggable={draggable}></canvas>
      <canvas className="item" draggable={draggable}></canvas>
      <canvas className="item" draggable={draggable}></canvas>
      <canvas className="item" draggable={draggable}></canvas>
      <canvas className="item" draggable={draggable}></canvas>
      {
      loading&&(<div className="loading">
        <span className="loadingIcon"></span>
        <span>加载中。。。</span> 
      </div>)
      }
    </div>
    <div className={`slider-container ${['', 'success', 'fail'][checkState]}`}>请拖动交换2个图块复原图片<span className="sliderMask"></span> </div>
    <div className="refresh-btn"  onClick={()=>{
      const canvasCurrent = canvasRef.current;
      reset(canvasCurrent)
    }} />
  </div>)
}