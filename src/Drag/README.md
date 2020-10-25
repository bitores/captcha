

canvas  分割
flexBox 布局 
flex order 切换
draggable 原生拖拽



```js
var timer,i=0;
var timer1,i1=0;
//兼容IE8-浏览器
test.onmousedown = function(){
    if(this.dragDrop){
        this.dragDrop();
    }
}
test.ondragstart = function(){
    this.style.backgroundColor = 'lightgreen';
    this.innerHTML = '开始拖动';
}
test.ondrag = function(){
    if(timer) return;
    timer = setInterval(function(){
        test.innerHTML =  '元素已被拖动' + ++i + '秒';
    },1000);
}
test.ondragend = function(){
    clearInterval(timer);
    timer = 0;i =0;
    this.innerHTML = '结束拖动';
    this.style.backgroundColor = 'pink';
}
target.ondragenter = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    this.innerHTML = '有元素进入目标区域';
    this.style.background = 'red';
}
target.ondragover = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    if(timer1) return;
    timer1 = setInterval(function(){
        target.innerHTML =  '元素已进入' + (++i1) + '秒';
    },1000);
}
target.ondragleave = function(){
    clearInterval(timer1);
    timer1 = 0;i1=0;
    this.innerHTML = '元素已离开目标区域';
    this.style.backgroundColor = 'lightblue';
}
target.ondrop = function(){
    clearInterval(timer1);
    timer1 = 0;i1=0;
    this.innerHTML = '元素已落在目标区域';
    this.style.backgroundColor = 'orange';    
}
```