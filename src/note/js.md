* window.onload与document.ready的区别：window.onload = function(){}页面完全加载完，包括图片、css、html元素等，再执行function中的内容，$(document).ready(function() {});是在页面框架加载完成之后（具体内容如图片等不一定加载完成），就马上执行function中的内容。
* Js有有三部分组成：1）ECMAScript 2) 文档对象模型DOM 3)浏览器对象模型BOM
* Sizzle是jQuery的御用选择器引擎，是jQuery作者JohnResig写的DOM选择器引擎，速度号称业界第一。另外，Sizzle是独立的一部分，不依赖任何库，如果你不想用jQuery,可 以只用Sizzle
* domManip()是jQuery DOM操作的核心数,  DOM操作的核心buildFragment
* jsonpajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加<script>标签来调用服务器提供的js脚本，jsonp能够很好地解决跨域问题
