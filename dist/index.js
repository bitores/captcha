'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".hzj02-drag-captcha {\n  position: relative;\n  width: 100%;\n}\n@keyframes loading-icon-rotate {\n  from {\n    transform: rotate(0);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.hzj02-drag-captcha .captcha-body {\n  position: relative;\n  display: flex;\n  width: 100%;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.hzj02-drag-captcha .captcha-body .item {\n  width: 0;\n  height: 0;\n  padding: 12.5%;\n  cursor: pointer;\n  cursor: grab;\n}\n.hzj02-drag-captcha .captcha-body .item:active {\n  cursor: grabbing;\n}\n.hzj02-drag-captcha .slider-container {\n  position: relative;\n  text-align: center;\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  margin-top: 15px;\n  background: #f7f9fa;\n  color: #45494c;\n  border: 1px solid #e4e7eb;\n}\n.hzj02-drag-captcha .slider-container .sliderMask {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n.hzj02-drag-captcha .slider-container .sliderMask::before {\n  content: '';\n}\n.hzj02-drag-captcha .slider-container.success .sliderMask {\n  height: 38px;\n  border: 1px solid #52CCBA;\n  background-color: #D2F4EF;\n  color: #52CCBA;\n}\n.hzj02-drag-captcha .slider-container.success .sliderMask::before {\n  content: '验证成功';\n}\n.hzj02-drag-captcha .slider-container.fail .sliderMask {\n  height: 38px;\n  top: -1px;\n  border: 1px solid #f57a7a;\n  background-color: white !important;\n  color: #f57a7a;\n}\n.hzj02-drag-captcha .slider-container.fail .sliderMask::before {\n  content: '验证失败';\n}\n.hzj02-drag-captcha .loading {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  top: 0;\n  right: 0;\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.hzj02-drag-captcha .loading .loadingIcon {\n  width: 32px;\n  height: 32px;\n  margin-bottom: 10px;\n  background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png) 0 -332px;\n  background-size: 32px 544px;\n  animation: loading-icon-rotate 0.8s linear infinite;\n}\n.hzj02-drag-captcha .refresh-btn {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 30px;\n  height: 30px;\n  cursor: pointer;\n  background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png) 0 -233px;\n  background-size: 32px 544px;\n}\n";
styleInject(css);

function getRandomNumberByRange(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

function getRandomImgSrc(w, h) {
  // 随机图像服务
  // https://picsum.photos/1920/1080
  // https://placeimg.com/1920/1080/any
  // https://placekitten.com/1920/1080
  // https://source.unsplash.com/random/1920x1080
  return 'https://picsum.photos/id/' + getRandomNumberByRange(0, 1084) + '/' + parseInt(w) + '/' + parseInt(h);
}

function createImg(onload, w, h) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function (e) {
    onload(img, e);
  };
  img.onerror = function () {
    img.setSrc(getRandomImgSrc(w, h)); // 图片加载失败的时候重新加载其他图片
  };

  img.setSrc = function (src) {
    var isIE = window.navigator.userAgent.indexOf('Trident') > -1;
    if (isIE) {
      // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
      var xhr = new XMLHttpRequest();
      xhr.onloadend = function (e) {
        var file = new FileReader(); // FileReader仅支持IE10+
        file.readAsDataURL(e.target.response);
        file.onloadend = function (e) {
          img.src = e.target.result;
        };
      };
      xhr.open('GET', src);
      xhr.responseType = 'blob';
      xhr.send();
    } else img.src = src;
  };

  img.setSrc(getRandomImgSrc(w, h));
  return img;
}

function debounce(func, wait) {
  var timeout = void 0;
  return function () {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var index = (function (_ref) {
  var onRefresh = _ref.onRefresh,
      onFail = _ref.onFail,
      onSuccess = _ref.onSuccess;

  var _useState = React.useState(false),
      _useState2 = slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = React.useState(0),
      _useState4 = slicedToArray(_useState3, 2),
      checkState = _useState4[0],
      setCheckState = _useState4[1];

  var _useState5 = React.useState(true),
      _useState6 = slicedToArray(_useState5, 2),
      draggable = _useState6[0],
      setDraggable = _useState6[1];

  var canvasRef = React.useRef();
  var targetRef = React.useRef();

  function reset(canvasCurrent) {
    var rect = canvasCurrent.getBoundingClientRect();
    var w = parseInt(rect.width / 4);
    setCheckState(0);
    setLoading(true);
    createImg(function (img) {
      setLoading(false);
      var sw = parseInt(img.width / 4);
      var sh = parseInt(img.height / 2);
      var children = canvasCurrent.children;
      var arr = [];
      for (var index = 0; index < children.length; index++) {
        arr.push(index);
        var item = children[index];
        item.style.order = index + 1;
        var ctx = item.getContext('2d');
        // debugger
        ctx.drawImage(img, index % 4 * sw, parseInt(index / 4) * sh, sw, sh, 0, 0, w, w);
        ctx.strokeRect(0, 0, w, w);
      }

      // 随机两个
      var nArr = arr.sort(function () {
        return Math.random() - 0.5;
      });

      var a = nArr[0];
      var b = nArr[2];

      var orderA = children[a].style.order;
      var orderB = children[b].style.order;
      children[a].style.order = orderB;
      children[b].style.order = orderA;

      onRefresh && onRefresh();
    }, 300, 150);
  }

  React.useEffect(function () {
    var canvasCurrent = canvasRef.current;

    function resize() {

      var rect = canvasCurrent.getBoundingClientRect();
      var w = parseInt(rect.width / 4);
      var children = canvasCurrent.children;

      for (var index = 0; index < children.length; index++) {
        var item = children[index];
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

    resize();

    var debounceResize = debounce(resize, 1000);
    window.addEventListener('resize', debounceResize);
    return function () {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  function checkVer() {
    var canvasCurrent = canvasRef.current;
    var rect = canvasCurrent.getBoundingClientRect();
    // let w = parseInt(rect.width/4);
    var children = canvasCurrent.children;

    var fail = false;

    for (var index = 0; index < children.length; index++) {
      var item = children[index];
      if (item.style.order !== '' + (index + 1)) {
        fail = true;
      }
    }

    if (fail) {
      onFail && onFail();
      setCheckState(2);
      setTimeout(function () {
        reset(canvasCurrent);
      }, 1000);

      // console.log('失败')
    } else {
      setCheckState(1);
      setTimeout(function () {
        onSuccess && onSuccess();
      }, 1000);

      // console.log('成功')
    }
  }

  function ondragstart(e) {

    targetRef.current = e.target;
    return false;
  }

  function ondragenter(e) {
    e = e || event;
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }

    e.target.style.border = '2px solid red';
    e.target.style.filter = 'grayscale(100%)';
  }

  function ondragleave(e) {
    e = e || event;
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    e.target.style.border = 'unset';
    e.target.style.filter = 'unset';
  }

  function ondragover(e) {
    e = e || event;
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }

    return false;
  }

  function ondrop(e) {
    setDraggable(false);
    e = e || event;
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }

    e.target.style.border = 'unset';
    e.target.style.filter = 'unset';
    var orderOrigin = targetRef.current.style.order;
    var orderTarget = e.target.style.order;

    targetRef.current.style.order = orderTarget;
    e.target.style.order = orderOrigin;

    setTimeout(function () {
      checkVer();
      setDraggable(true);
    }, 0);
  }

  return React__default.createElement(
    'div',
    { className: 'hzj02-drag-captcha' },
    React__default.createElement(
      'div',
      { className: 'captcha-body', ref: canvasRef, onDragStart: ondragstart, onDragEnter: ondragenter, onDragLeave: ondragleave, onDragOver: ondragover, onDrop: ondrop },
      React__default.createElement('canvas', { className: 'item', draggable: draggable }),
      React__default.createElement('canvas', { className: 'item', draggable: draggable }),
      React__default.createElement('canvas', { className: 'item', draggable: draggable }),
      React__default.createElement('canvas', { className: 'item', draggable: draggable }),
      React__default.createElement('canvas', { className: 'item', draggable: draggable }),
      React__default.createElement('canvas', { className: 'item', draggable: draggable }),
      React__default.createElement('canvas', { className: 'item', draggable: draggable }),
      React__default.createElement('canvas', { className: 'item', draggable: draggable }),
      loading && React__default.createElement(
        'div',
        { className: 'loading' },
        React__default.createElement('span', { className: 'loadingIcon' }),
        React__default.createElement(
          'span',
          null,
          '\u52A0\u8F7D\u4E2D\u3002\u3002\u3002'
        )
      )
    ),
    React__default.createElement(
      'div',
      { className: 'slider-container ' + ['', 'success', 'fail'][checkState] },
      '\u8BF7\u62D6\u52A8\u4EA4\u63622\u4E2A\u56FE\u5757\u590D\u539F\u56FE\u7247',
      React__default.createElement('span', { className: 'sliderMask' }),
      ' '
    ),
    React__default.createElement('div', { className: 'refresh-btn', onClick: function onClick() {
        var canvasCurrent = canvasRef.current;
        reset(canvasCurrent);
      } })
  );
});

var css$1 = ".hzj01-slider-captcha {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.hzj01-slider-captcha .captcha-body {\n  position: relative;\n}\n.hzj01-slider-captcha .captcha-body .m-canvas {\n  width: 100%;\n  height: 100%;\n}\n.hzj01-slider-captcha .captcha-body .drag-canvas {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 100%;\n}\n.hzj01-slider-captcha .captcha-body .loading {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  top: 0;\n  right: 0;\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.hzj01-slider-captcha .captcha-body .loading .loadingIcon {\n  width: 32px;\n  height: 32px;\n  margin-bottom: 10px;\n  background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png) 0 -332px;\n  background-size: 32px 544px;\n  animation: loading-icon-rotate 0.8s linear infinite;\n}\n.hzj01-slider-captcha .refreshIcon {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  width: 30px;\n  height: 30px;\n  cursor: pointer;\n  background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png) 0 -233px;\n  background-size: 32px 544px;\n}\n.hzj01-slider-captcha .slider-container {\n  position: relative;\n  text-align: center;\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  margin-top: 15px;\n  background: #f7f9fa;\n  color: #45494c;\n  border: 1px solid #e4e7eb;\n}\n.hzj01-slider-captcha .slider-container.active .slider {\n  height: 38px;\n  top: -1px;\n  border: 1px solid #1991FA;\n}\n.hzj01-slider-captcha .slider-container.active .sliderMask {\n  height: 38px;\n  border-width: 1px;\n}\n.hzj01-slider-captcha .slider-container.success .slider {\n  height: 38px;\n  top: -1px;\n  border: 1px solid #52CCBA;\n  background-color: #52CCBA !important;\n}\n.hzj01-slider-captcha .slider-container.success .sliderMask {\n  height: 38px;\n  border: 1px solid #52CCBA;\n  background-color: #D2F4EF;\n}\n.hzj01-slider-captcha .slider-container.success .sliderIcon {\n  background-position: 0 -26px !important;\n}\n.hzj01-slider-captcha .slider-container.fail .slider {\n  height: 38px;\n  top: -1px;\n  border: 1px solid #f57a7a;\n  background-color: #f57a7a !important;\n}\n.hzj01-slider-captcha .slider-container.fail .sliderMask {\n  height: 38px;\n  border: 1px solid #f57a7a;\n  background-color: #fce1e1;\n}\n.hzj01-slider-captcha .slider-container.fail .sliderIcon {\n  top: 14px;\n  background-position: 0 -82px !important;\n}\n.hzj01-slider-captcha .slider-container.active .sliderText,\n.hzj01-slider-captcha .slider-container.success .sliderText,\n.hzj01-slider-captcha .slider-container.fail .sliderText {\n  display: none;\n}\n.hzj01-slider-captcha .slider-container .sliderMask {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 40px;\n  border: 0 solid #1991FA;\n  background: #D1E9FE;\n}\n.hzj01-slider-captcha .slider-container .slider {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 40px;\n  height: 40px;\n  background: #fff;\n  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);\n  transition: background 0.2s linear;\n  cursor: pointer;\n  cursor: grab;\n}\n.hzj01-slider-captcha .slider-container .slider:active {\n  cursor: grabbing;\n}\n.hzj01-slider-captcha .slider-container .slider:hover {\n  background: #1991FA;\n}\n.hzj01-slider-captcha .slider-container .sliderIcon {\n  position: absolute;\n  top: 15px;\n  left: 13px;\n  width: 14px;\n  height: 12px;\n  background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png) 0 -13px;\n  background-size: 32px 544px;\n}\n.hzj01-slider-captcha .slider-container .slider:hover .sliderIcon {\n  background-position: 0 0;\n}\n";
styleInject(css$1);

var index$1 = (function (_ref) {
  var onRefresh = _ref.onRefresh,
      onFail = _ref.onFail,
      onSuccess = _ref.onSuccess,
      _ref$l = _ref.l,
      l = _ref$l === undefined ? 42 : _ref$l,
      _ref$r = _ref.r,
      r = _ref$r === undefined ? 9 : _ref$r,
      _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? 10 : _ref$offset;

  var _useState = React.useState(true),
      _useState2 = slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = React.useState(0),
      _useState4 = slicedToArray(_useState3, 2),
      draging = _useState4[0],
      setDraging = _useState4[1];

  var _useState5 = React.useState(0),
      _useState6 = slicedToArray(_useState5, 2),
      targetX = _useState6[0],
      setTargetX = _useState6[1];

  var targetRef = React.useRef();
  var canvasRef = React.useRef();
  var dragRef = React.useRef();
  var sliderRef = React.useRef();
  var sliderMaskRef = React.useRef();

  function drawPath(ctx, x, y, operation) {
    var PI = Math.PI;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.stroke();
    ctx.globalCompositeOperation = 'destination-over';
    operation === 'fill' ? ctx.fill() : ctx.clip();
  }

  function reset(canvasCurrent, dragCurrent) {
    var L = l + r * 2 + 3; // 滑块实际边长
    var rect = canvasCurrent.getBoundingClientRect();
    sliderRef.current.style.left = 0 + 'px';
    dragRef.current.style.left = 0 + 'px';
    sliderMaskRef.current.style.width = 0 + 'px';
    setDraging(0);
    setLoading(true);
    createImg(function (img) {
      setLoading(false);

      // 随机位置创建拼图形状
      var x = getRandomNumberByRange(L + 10, rect.width - (L + 10));
      var y = getRandomNumberByRange(10 + r * 2, rect.height - (L + 10));

      var ctx = canvasCurrent.getContext('2d');

      // 清空画布
      ctx.clearRect(0, 0, rect.width, rect.height);
      drawPath(ctx, x, y, 'fill');
      ctx.drawImage(img, 0, 0, rect.width, rect.height);

      var dragCtx = dragCurrent.getContext('2d');
      dragCurrent.width = rect.width;
      dragCtx.clearRect(0, 0, rect.width, rect.height);
      drawPath(dragCtx, x, y, 'clip');
      dragCtx.drawImage(img, 0, 0, rect.width, rect.height);
      var ImageData = dragCtx.getImageData(x - 3, y - r * 2 - 1, L, L);
      dragCurrent.width = L;
      dragCtx.putImageData(ImageData, 0, y - r * 2 - 1);

      setTargetX(x);
      onRefresh && onRefresh();
    }, rect.width, rect.height);
  }

  React.useEffect(function () {
    var canvasCurrent = canvasRef.current;
    var dragCurrent = dragRef.current;
    function resize() {
      var rect = canvasCurrent.getBoundingClientRect();
      //
      canvasCurrent.setAttribute('width', rect.width);
      canvasCurrent.setAttribute('height', rect.height);
      dragCurrent.setAttribute('width', rect.width);
      dragCurrent.setAttribute('height', rect.height);
      reset(canvasCurrent, dragCurrent);
    }
    resize();

    var originX = void 0,
        originY = void 0,
        isMouseDown = false;

    var handleDragStart = function handleDragStart(e) {
      originX = e.touches ? e.touches[0].clientX : e.clientX;
      originY = e.touches ? e.touches[0].clientY : e.clientY;
      isMouseDown = true;
    };

    var handleDragMove = function handleDragMove(e) {
      if (!isMouseDown) return false;
      e.preventDefault();
      var eventX = e.touches ? e.touches[0].clientX : e.clientX;
      var eventY = e.touches ? e.touches[0].clientY : e.clientY;
      var moveX = eventX - originX;

      var rect = canvasCurrent.getBoundingClientRect();
      var width = rect.width;
      if (moveX < 0 || moveX + 38 >= width) return false;
      sliderRef.current.style.left = moveX + 'px';
      sliderMaskRef.current.style.width = moveX + 'px';
      var blockLeft = (width - 40 - 20) / (width - 40) * moveX;
      dragRef.current.style.left = blockLeft + 'px';

      setDraging(1);
    };

    var handleDragEnd = function handleDragEnd(e) {
      if (!isMouseDown) return false;
      isMouseDown = false;
      var eventX = e.clientX || e.changedTouches[0].clientX;
      if (eventX === originX) return false;
      var left = parseInt(dragRef.current.style.left);
      if (Math.abs(targetRef.current - left) < offset) {
        console.log('成功');
        onSuccess && onSuccess();
        setDraging(2);
      } else {
        onFail && onFail();
        setDraging(3);
        setTimeout(function () {
          reset(canvasCurrent, dragCurrent);
        }, 1000);
      }
    };

    var debounceResize = debounce(resize, 1000);
    sliderRef.current.addEventListener('mousedown', handleDragStart);
    sliderRef.current.addEventListener('touchstart', handleDragStart);
    dragRef.current.addEventListener('mousedown', handleDragStart);
    dragRef.current.addEventListener('touchstart', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    window.addEventListener('resize', debounceResize);
    return function () {
      sliderRef.current.removeEventListener('mousedown', handleDragStart);
      sliderRef.current.removeEventListener('touchstart', handleDragStart);
      dragRef.current.removeEventListener('mousedown', handleDragStart);
      dragRef.current.removeEventListener('touchstart', handleDragStart);
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  React.useEffect(function () {
    targetRef.current = targetX;
  }, [targetX]);

  return React__default.createElement(
    'div',
    { id: 'slider-captcha', className: 'hzj01-slider-captcha' },
    React__default.createElement(
      'div',
      { className: 'captcha-body' },
      React__default.createElement('canvas', { className: 'm-canvas', ref: canvasRef }),
      React__default.createElement('canvas', { className: 'drag-canvas', ref: dragRef }),
      loading && React__default.createElement(
        'div',
        { className: 'loading' },
        React__default.createElement('span', { className: 'loadingIcon' }),
        React__default.createElement(
          'span',
          null,
          '\u52A0\u8F7D\u4E2D\u3002\u3002\u3002'
        )
      )
    ),
    React__default.createElement('div', { className: 'refreshIcon', onClick: function onClick() {
        var canvasCurrent = canvasRef.current;
        var dragCurrent = dragRef.current;

        reset(canvasCurrent, dragCurrent);
      } }),
    React__default.createElement(
      'div',
      { className: 'slider-container ' + ['', 'active', 'success', 'fail'][draging] },
      React__default.createElement(
        'div',
        { className: 'sliderMask', ref: sliderMaskRef },
        React__default.createElement(
          'div',
          { className: 'slider', ref: sliderRef },
          React__default.createElement('span', { className: 'sliderIcon' })
        )
      ),
      React__default.createElement(
        'span',
        { className: 'sliderText' },
        '\u5411\u53F3\u6ED1\u52A8\u586B\u5145\u62FC\u56FE'
      )
    )
  );
});

var css$2 = ".tap-captcha-container {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 10px;\n}\n@keyframes loading-icon-rotate {\n  from {\n    transform: rotate(0);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.tap-captcha-container .slider-container {\n  position: relative;\n  text-align: center;\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  margin-top: 15px;\n  background: #f7f9fa;\n  color: #45494c;\n  border: 1px solid #e4e7eb;\n}\n.tap-captcha-container .slider-container .sliderMask {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n}\n.tap-captcha-container .slider-container .sliderMask::before {\n  content: '';\n}\n.tap-captcha-container .slider-container.success .sliderMask {\n  height: 38px;\n  border: 1px solid #52CCBA;\n  background-color: #D2F4EF;\n  color: #52CCBA;\n}\n.tap-captcha-container .slider-container.success .sliderMask::before {\n  content: '验证成功';\n}\n.tap-captcha-container .slider-container.fail .sliderMask {\n  height: 38px;\n  top: -1px;\n  border: 1px solid #f57a7a;\n  background-color: white !important;\n  color: #f57a7a;\n}\n.tap-captcha-container .slider-container.fail .sliderMask::before {\n  content: '验证失败';\n}\n.tap-captcha-container .loading {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  top: 0;\n  right: 0;\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.tap-captcha-container .loading .loadingIcon {\n  width: 32px;\n  height: 32px;\n  margin-bottom: 10px;\n  background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png) 0 -332px;\n  background-size: 32px 544px;\n  animation: loading-icon-rotate 0.8s linear infinite;\n}\n.tap-captcha-container .refresh-btn {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 30px;\n  height: 30px;\n  cursor: pointer;\n  background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png) 0 -233px;\n  background-size: 32px 544px;\n}\n.tap-captcha-container .check-btn {\n  cursor: pointer;\n  background-color: #539ffe;\n  color: white;\n  padding: 5px;\n  border-radius: 2px;\n}\n.tap-captcha-container .simCaptcha-marks {\n  position: relative;\n  overflow: hidden;\n}\n.tap-captcha-container .simCaptcha-marks .simCaptcha-mark {\n  position: absolute;\n  z-index: 9999;\n  width: 25px;\n  height: 25px;\n  background-color: #539ffe;\n  color: #fff;\n  text-align: center;\n  line-height: 25px;\n  border-radius: 50%;\n  border: 2px solid #fff;\n  box-shadow: 0 0 10px black;\n  user-select: none;\n}\n.tap-captcha-container .simCaptcha-marks canvas {\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css$2);

var WORDS = "指以形式化话语组织象征性地表现个人内心情感一类文学活它与叙事相对具有主观和诗意";
// 可选色值
var BRAND_COLORS = {
  '4ormat': '#fb0a2a',
  '500px': '#02adea',
  'About.me (blue)': '#00405d',
  'About.me (yellow)': '#ffcc33',
  Addvocate: '#ff6138',
  Adobe: '#ff0000',
  Aim: '#fcd20b',
  Amazon: '#e47911',
  Android: '#a4c639',
  "Angie's List": '#7fbb00',
  AOL: '#0060a3',
  Atlassian: '#003366',
  Behance: '#053eff',
  'Big Cartel': '#97b538',
  bitly: '#ee6123',
  Blogger: '#fc4f08',
  Boeing: '#0039a6',
  'Booking.com': '#003580',
  Carbonmade: '#613854',
  Cheddar: '#ff7243',
  'Code School': '#3d4944',
  Delicious: '#205cc0',
  Dell: '#3287c1',
  Designmoo: '#e54a4f',
  Deviantart: '#4e6252',
  'Designer News': '#2d72da',
  Devour: '#fd0001',
  DEWALT: '#febd17',
  'Disqus (blue)': '#59a3fc',
  'Disqus (orange)': '#db7132',
  Dribbble: '#ea4c89',
  Dropbox: '#3d9ae8',
  Drupal: '#0c76ab',
  Dunked: '#2a323a',
  eBay: '#89c507',
  Ember: '#f05e1b',
  Engadget: '#00bdf6',
  Envato: '#528036',
  Etsy: '#eb6d20',
  Evernote: '#5ba525',
  'Fab.com': '#dd0017',
  Facebook: '#3b5998',
  Firefox: '#e66000',
  'Flickr (blue)': '#0063dc',
  'Flickr (pink)': '#ff0084',
  Forrst: '#5b9a68',
  Foursquare: '#25a0ca',
  Garmin: '#007cc3',
  GetGlue: '#2d75a2',
  Gimmebar: '#f70078',
  GitHub: '#171515',
  'Google Blue': '#0140ca',
  'Google Green': '#16a61e',
  'Google Red': '#dd1812',
  'Google Yellow': '#fcca03',
  'Google+': '#dd4b39',
  Grooveshark: '#f77f00',
  Groupon: '#82b548',
  'Hacker News': '#ff6600',
  HelloWallet: '#0085ca',
  'Heroku (light)': '#c7c5e6',
  'Heroku (dark)': '#6567a5',
  HootSuite: '#003366',
  Houzz: '#73ba37',
  HTML5: '#ec6231',
  IKEA: '#ffcc33',
  IMDb: '#f3ce13',
  Instagram: '#3f729b',
  Intel: '#0071c5',
  Intuit: '#365ebf',
  Kickstarter: '#76cc1e',
  kippt: '#e03500',
  Kodery: '#00af81',
  LastFM: '#c3000d',
  LinkedIn: '#0e76a8',
  Livestream: '#cf0005',
  Lumo: '#576396',
  Mixpanel: '#a086d3',
  Meetup: '#e51937',
  Nokia: '#183693',
  NVIDIA: '#76b900',
  Opera: '#cc0f16',
  Path: '#e41f11',
  'PayPal (dark)': '#1e477a',
  'PayPal (light)': '#3b7bbf',
  Pinboard: '#0000e6',
  Pinterest: '#c8232c',
  PlayStation: '#665cbe',
  Pocket: '#ee4056',
  Prezi: '#318bff',
  Pusha: '#0f71b4',
  Quora: '#a82400',
  'QUOTE.fm': '#66ceff',
  Rdio: '#008fd5',
  Readability: '#9c0000',
  'Red Hat': '#cc0000',
  Resource: '#7eb400',
  Rockpack: '#0ba6ab',
  Roon: '#62b0d9',
  RSS: '#ee802f',
  Salesforce: '#1798c1',
  Samsung: '#0c4da2',
  Shopify: '#96bf48',
  Skype: '#00aff0',
  Snagajob: '#f47a20',
  Softonic: '#008ace',
  SoundCloud: '#ff7700',
  'Space Box': '#f86960',
  Spotify: '#81b71a',
  Sprint: '#fee100',
  Squarespace: '#121212',
  StackOverflow: '#ef8236',
  Staples: '#cc0000',
  'Status Chart': '#d7584f',
  Stripe: '#008cdd',
  StudyBlue: '#00afe1',
  StumbleUpon: '#f74425',
  'T-Mobile': '#ea0a8e',
  Technorati: '#40a800',
  'The Next Web': '#ef4423',
  Treehouse: '#5cb868',
  Trulia: '#5eab1f',
  Tumblr: '#34526f',
  'Twitch.tv': '#6441a5',
  Twitter: '#00acee',
  TYPO3: '#ff8700',
  Ubuntu: '#dd4814',
  Ustream: '#3388ff',
  Verizon: '#ef1d1d',
  Vimeo: '#86c9ef',
  Vine: '#00a478',
  Virb: '#06afd8',
  'Virgin Media': '#cc0000',
  Wooga: '#5b009c',
  'WordPress (blue)': '#21759b',
  'WordPress (orange)': '#d54e21',
  'WordPress (grey)': '#464646',
  Wunderlist: '#2b88d9',
  XBOX: '#9bc848',
  XING: '#126567',
  'Yahoo!': '#720e9e',
  Yandex: '#ffcc00',
  Yelp: '#c41200',
  YouTube: '#c4302b',
  Zalongo: '#5498dc',
  Zendesk: '#78a300',
  Zerply: '#9dcc7a',
  Zootool: '#5e8b1d'
};

var index$2 = React.memo(function (_ref) {
  var onRefresh = _ref.onRefresh,
      onFail = _ref.onFail,
      onSuccess = _ref.onSuccess,
      _ref$r = _ref.r,
      r = _ref$r === undefined ? 15 : _ref$r;

  var _useState = React.useState([]),
      _useState2 = slicedToArray(_useState, 2),
      targetWord = _useState2[0],
      setTargetWord = _useState2[1];

  var _useState3 = React.useState([]),
      _useState4 = slicedToArray(_useState3, 2),
      record = _useState4[0],
      setRecord = _useState4[1];

  var _useState5 = React.useState(true),
      _useState6 = slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useState7 = React.useState(0),
      _useState8 = slicedToArray(_useState7, 2),
      checkState = _useState8[0],
      setCheckState = _useState8[1];

  var targetRef = React.useRef();
  var canvasRef = React.useRef();
  var marksRef = React.useRef();

  function reset(canvasCurrent, marksRefCurrent) {
    var children = marksRefCurrent.children;
    for (var i = 1, len = children.length; i < len; i++) {
      marksRefCurrent.removeChild(children[1]);
    }
    setCheckState(0);

    setTargetWord([]);
    setLoading(true);
    var rect = canvasCurrent.getBoundingClientRect();
    createImg(function (img) {
      setLoading(false);

      var ctx = canvasCurrent.getContext('2d');
      // 清空画布
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
      var colorKeys = Object.keys(BRAND_COLORS);
      var words = Array.from(new Set(WORDS.split(''))).sort(function () {
        return Math.random() - 0.5;
      });

      ctx.font = '30px bold';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      var wdpos = [];
      function renderWD(index) {
        var wdKey = words[index]; // 随机排序的数组前几位就是数据中随机抽取的几位
        var colorKey = colorKeys[Math.round(Math.random() * (colorKeys.length - 1))];
        var background = BRAND_COLORS[colorKey];

        ctx.strokeStyle = background;

        var x = Math.floor(Math.random() * (rect.width - 40)) + 20;
        var y = Math.floor(Math.random() * (rect.height - 40)) + 20;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI * 2 * Math.random());
        // ctx.font="30px Georgia";
        ctx.strokeText(wdKey, 0, 0);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.restore();
        wdpos.push({
          wd: wdKey,
          x: x,
          y: y
        });
      }

      for (var index = 0; index < 4; index++) {

        renderWD(index);
      }

      setTargetWord(wdpos);
      onRefresh && onRefresh(wdpos);
    }, rect.width, rect.height);
  }

  React.useEffect(function () {

    var canvasCurrent = canvasRef.current;
    var marksRefCurrent = marksRef.current;

    function resize() {
      var rect = canvasCurrent.getBoundingClientRect();
      //
      canvasCurrent.setAttribute('width', rect.width);
      canvasCurrent.setAttribute('height', rect.height);

      reset(canvasCurrent, marksRefCurrent);
    }

    resize();

    function checkVer(ev) {
      // var e = ev || window.event;
      console.log('验证中。。。');

      // e.preventDefault()
      // e.stopPropagation()

      var children = marksRefCurrent.children;
      var fail = false;
      for (var i = 1, len = children.length; i < len; i++) {
        var child = children[i];
        var x = parseInt(child.style.left) + r;
        var y = parseInt(child.style.top) + r;

        var item = targetRef.current[i - 1];
        if (!(item && Math.abs(x - item.x) < r && Math.abs(y - item.y) < r)) {
          fail = true;
        }
      }

      if (children.length > 4) {

        if (fail) {
          var _canvasCurrent = canvasRef.current;
          onFail && onFail();
          setCheckState(2);
          setTimeout(function () {
            // const children = marksRefCurrent.children;
            // for(let i = 1,len = children.length; i <len; i++) { 
            //     marksRefCurrent.removeChild(children[1]); 
            // }
            reset(_canvasCurrent, marksRef.current);
          }, 1000);
        } else {
          setCheckState(1);
          setTimeout(function () {
            onSuccess && onSuccess();
          }, 1000);
        }
      }

      return false;
    }

    var handleDragStart = function handleDragStart(ev) {
      var e = ev || window.event,
          target = e.target || e.srcElement;
      e.preventDefault();
      e.stopPropagation();

      if (target.nodeName === 'CANVAS') {
        var originX = ev.clientX || ev.touches[0].clientX;
        var originY = ev.clientY || ev.touches[0].clientY;
        var rect = canvasCurrent.getBoundingClientRect();

        var rx = originX - rect.x;
        var ry = originY - rect.y;

        var index = marksRef.current.children.length;
        var oDiv = document.createElement('div');
        oDiv.className = 'simCaptcha-mark';
        oDiv.innerHTML = index;
        oDiv.setAttribute('style', 'top:' + (ry - 12) + 'px;left:' + (rx - 12) + 'px;');

        marksRef.current.appendChild(oDiv);

        var eve = function eve(ev) {
          ev.preventDefault();
          ev.stopPropagation();
          var children = marksRefCurrent.children;
          for (var i = index, len = children.length; i < len; i++) {
            marksRefCurrent.removeChild(children[index]);
          }
          return false;
        };

        // setTimeout(()=>{
        oDiv.addEventListener('mousedown', eve);
        oDiv.addEventListener('touchstart', eve);
        // },0)

        checkVer();

        setRecord([].concat(toConsumableArray(record), [{ x: rx, y: ry }]));
      }
    };

    var debounceResize = debounce(resize, 1000);
    marksRefCurrent.addEventListener('mousedown', handleDragStart);
    marksRefCurrent.addEventListener('touchstart', handleDragStart);

    window.addEventListener('resize', debounceResize);

    return function () {
      marksRefCurrent.removeEventListener('mousedown', handleDragStart);
      marksRefCurrent.removeEventListener('touchstart', handleDragStart);

      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  React.useEffect(function () {
    targetRef.current = targetWord;
    console.log(targetWord);
  }, [targetWord]);

  return React__default.createElement(
    'div',
    { className: 'tap-captcha-container' },
    React__default.createElement(
      'div',
      null,
      React__default.createElement(
        'div',
        { className: 'simCaptcha-marks', ref: marksRef },
        React__default.createElement('canvas', { ref: canvasRef })
      ),
      loading && React__default.createElement(
        'div',
        { className: 'loading' },
        React__default.createElement('span', { className: 'loadingIcon' }),
        React__default.createElement(
          'span',
          null,
          '\u52A0\u8F7D\u4E2D\u3002\u3002\u3002'
        )
      )
    ),
    React__default.createElement(
      'div',
      { className: 'slider-container ' + ['', 'success', 'fail'][checkState] },
      '\u8BF7\u4F9D\u6B21\u70B9\u51FB\uFF1A',
      targetWord.map(function (item) {
        return item.wd;
      }).join('、'),
      React__default.createElement('span', { className: 'sliderMask' }),
      ' '
    ),
    React__default.createElement('div', { className: 'refresh-btn', onClick: function onClick() {
        var canvasCurrent = canvasRef.current;
        reset(canvasCurrent, marksRef.current);
      } })
  );
});

exports.DragCaptcha = index;
exports.SlideCaptcha = index$1;
exports.TapCaptcha = index$2;
//# sourceMappingURL=index.js.map
