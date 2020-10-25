



export function getRandomNumberByRange (start, end) {
  return Math.round(Math.random() * (end - start) + start)
}

export function getRandomImgSrc (w, h) {
  // 随机图像服务
  // https://picsum.photos/1920/1080
  // https://placeimg.com/1920/1080/any
  // https://placekitten.com/1920/1080
  // https://source.unsplash.com/random/1920x1080
  return `https://picsum.photos/id/${getRandomNumberByRange(0, 1084)}/${parseInt(w)}/${parseInt(h)}`
}

export function createImg (onload, w, h) {
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = (e)=>{
    onload(img, e)
  }
  img.onerror = () => {
   img.setSrc(getRandomImgSrc(w, h)) // 图片加载失败的时候重新加载其他图片
  }

  img.setSrc = function (src) {
    const isIE = window.navigator.userAgent.indexOf('Trident') > -1
    if (isIE) { // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
      const xhr = new XMLHttpRequest()
      xhr.onloadend = function (e) {
        const file = new FileReader() // FileReader仅支持IE10+
        file.readAsDataURL(e.target.response)
        file.onloadend = function (e) {
          img.src = e.target.result
        }
      }
      xhr.open('GET', src)
      xhr.responseType = 'blob'
      xhr.send()
    }
    else img.src = src
  }

  img.setSrc(getRandomImgSrc(w, h))
  return img
}

export function debounce(func, wait) {
  let timeout;
  return function () {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);
      
      timeout = setTimeout(() => {
          func.apply(context, args)
      }, wait);
  }
}