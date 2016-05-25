* window.onload与document.ready的区别：window.onload = function(){}页面完全加载完，包括图片、css、html元素等，再执行function中的内容，$(document).ready(function() {});是在页面框架加载完成之后（具体内容如图片等不一定加载完成），就马上执行function中的内容。
