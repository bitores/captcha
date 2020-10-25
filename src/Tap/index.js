import React, { memo, useEffect, useRef, useState } from 'react';
import './style.less'
import {debounce, createImg} from '../utils'
import {WORDS, BRAND_COLORS} from './data'

export default memo(({ onRefresh, onFail, onSuccess, r = 15})=>{
  const [targetWord, setTargetWord] = useState([])
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true)
  const [checkState, setCheckState] = useState(0)

  const targetRef = useRef()
  const canvasRef = useRef()
  const marksRef = useRef()


  function reset(canvasCurrent, marksRefCurrent){
    const children = marksRefCurrent.children;
    for(var i = 1,len = children.length; i <len; i++) { 
      marksRefCurrent.removeChild(children[1]); 
    }
    setCheckState(0)
    
    setTargetWord([])
    setLoading(true)
    const rect = canvasCurrent.getBoundingClientRect()
    createImg((img)=>{
      setLoading(false);
      
      const ctx =canvasCurrent.getContext('2d')
      // 清空画布
      ctx.clearRect(0,0, rect.width, rect.height)
      ctx.drawImage(img, 0, 0, rect.width, rect.height)
      const colorKeys = Object.keys(BRAND_COLORS)
      const words = Array.from(new Set(WORDS.split(''))).sort(()=>{
        return Math.random()-0.5;
      });

      ctx.font = '30px bold';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      
      const wdpos = []
      function renderWD(index){
        const wdKey = words[index]// 随机排序的数组前几位就是数据中随机抽取的几位
        const colorKey = colorKeys[Math.round(Math.random() * (colorKeys.length - 1))]
        const background = BRAND_COLORS[colorKey]

        ctx.strokeStyle = background

        const x = Math.floor(Math.random()*(rect.width-40)) + 20;
        const y = Math.floor(Math.random()*(rect.height-40)) + 20;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI*2*Math.random());
        // ctx.font="30px Georgia";
        ctx.strokeText(wdKey, 0, 0);
        ctx.beginPath();
        ctx.arc(0,0,r, 0 , 2*Math.PI);
        ctx.stroke();
        
        ctx.restore();
        wdpos.push({
          wd: wdKey,
          x,
          y,
        })
      }
      
      for (let index = 0; index < 4; index++) {
        
        renderWD(index)
        
      }

      setTargetWord(wdpos)
      onRefresh&&onRefresh(wdpos)
    }, rect.width, rect.height)
  }

  useEffect(()=>{

    const canvasCurrent = canvasRef.current;
    const marksRefCurrent = marksRef.current;

    function resize(){
      const rect = canvasCurrent.getBoundingClientRect()
      //
      canvasCurrent.setAttribute('width',rect.width )
      canvasCurrent.setAttribute('height',rect.height )

      reset(canvasCurrent, marksRefCurrent)
    }
    

    
    resize();


    function checkVer(ev){
      // var e = ev || window.event;
      console.log('验证中。。。')

      // e.preventDefault()
      // e.stopPropagation()

      const children = marksRefCurrent.children;
      let fail = false;
      for(let i = 1,len = children.length; i <len; i++) { 
         const child = children[i];
         const x= parseInt(child.style.left) + r;
         const y= parseInt(child.style.top) + r;

         const item = targetRef.current[i-1];
        if(!(item && Math.abs(x-item.x)<r && Math.abs(y-item.y)<r)) {
          fail = true;
        }
      }

      
      if(children.length>4) {
        
        if(fail) {
          const canvasCurrent = canvasRef.current;
          onFail&&onFail();
          setCheckState(2)
          setTimeout(()=>{
            // const children = marksRefCurrent.children;
            // for(let i = 1,len = children.length; i <len; i++) { 
            //     marksRefCurrent.removeChild(children[1]); 
            // }
            reset(canvasCurrent, marksRef.current)
          },1000)
        } else {
          setCheckState(1)
          setTimeout(()=>{
            onSuccess&&onSuccess()
          },1000)
          
        }
      }

      return false;
    }

    const handleDragStart = function (ev) {
      var e = ev || window.event,
        target = e.target || e.srcElement;
        e.preventDefault()
        e.stopPropagation()

      if(target.nodeName==='CANVAS') {
        let originX = ev.clientX || ev.touches[0].clientX
        let originY = ev.clientY || ev.touches[0].clientY
        const rect = canvasCurrent.getBoundingClientRect()
        
        const rx = originX - rect.x ;
        const ry = originY - rect.y ;

        const index = marksRef.current.children.length;
        const oDiv  = document.createElement('div')
        oDiv.className = ('simCaptcha-mark')
        oDiv.innerHTML= index;
        oDiv.setAttribute('style', `top:${ry-12}px;left:${rx-12}px;`)

        marksRef.current.appendChild(oDiv)

        const eve = (ev)=>{
          ev.preventDefault()
          ev.stopPropagation()
          const children = marksRefCurrent.children;
          for(let i = index,len = children.length; i <len; i++) { 
             marksRefCurrent.removeChild(children[index]); 
          }
          return false;
        }

        // setTimeout(()=>{
          oDiv.addEventListener('mousedown',eve)
          oDiv.addEventListener('touchstart',eve)
        // },0)

        checkVer()
        
        setRecord([...record, {x: rx, y: ry}])
      }

      
    }

    
    const debounceResize = debounce(resize,1000);
    marksRefCurrent.addEventListener('mousedown', handleDragStart)
    marksRefCurrent.addEventListener('touchstart', handleDragStart)

    window.addEventListener('resize',debounceResize)

    return ()=>{
      marksRefCurrent.removeEventListener('mousedown', handleDragStart)
      marksRefCurrent.removeEventListener('touchstart', handleDragStart)

      window.removeEventListener('resize', debounceResize)
    }
  },[])

  useEffect(()=>{
    targetRef.current = targetWord;
    console.log(targetWord)
  },[targetWord])

  return (<div className="tap-captcha-container">
    <div>
      <div className="simCaptcha-marks" ref={marksRef}>
        <canvas ref={canvasRef}/>
      </div>
      {
      loading&&(<div className="loading">
        <span className="loadingIcon"></span>
        <span>加载中。。。</span> 
      </div>)
      }
    </div>
    
    <div className={`slider-container ${['', 'success', 'fail'][checkState]}`}>请依次点击：{targetWord.map(item=>item.wd).join('、')}<span className="sliderMask"></span> </div>
    <div className="refresh-btn"  onClick={()=>{
      const canvasCurrent = canvasRef.current;
      reset(canvasCurrent, marksRef.current)
    }} />
    
  </div>)
})

//