js
===

* window.onload与document.ready的区别：window.onload = function(){}页面完全加载完，包括图片、css、html元素等，再执行function中的内容，$(document).ready(function() {});是在页面框架加载完成之后（具体内容如图片等不一定加载完成），就马上执行function中的内容。
* document是window的一个对象属性。window 指窗体。document指页面（文档）。document是window的一个子对象
* Js有有三部分组成：1）ECMAScript 2) 文档对象模型DOM 3)浏览器对象模型BOM
* Sizzle是jQuery的御用选择器引擎，是jQuery作者JohnResig写的DOM选择器引擎，速度号称业界第一。另外，Sizzle是独立的一部分，不依赖任何库，如果你不想用jQuery,可 以只用Sizzle
* domManip()是jQuery DOM操作的核心数,  DOM操作的核心buildFragment
* js中涉及Number类型的数据进行运算存储时一定要进行类型转换。否则在本次测试环境可能没错，但是在生产环境可能会报错。
* jsonpajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加script标签来调用服务器提供的js脚本，jsonp能够很好地解决跨域问题
* DOM2.0模型将事件处理流程分为三个阶段：一、事件捕获阶段，二、事件目标阶段，三、事件起泡阶段
* 数据类型转换parseInt()，parseFloat()，toString(),字符串转换成数组，array=str.split("");
* js变量是无类型的，用var或let申明，Number类型君存储为浮点型
* js判断手机操作系统
* 对字符串机型编码处理，尤其是在url处理中容易出现乱码的情景, encodeURI(_string, "utf-8")
* 在处理变量相加减时,即使数据库中是Number类型，也一定要使用parseInt()进行处理，否则很容易会被默认按照字符串拼接。
* 阻止a标签的跳转： a href="javascript:void(0);" onclick="js_method()"
* promise只有三种状态，未完成，完成(fulfilled)和失败(rejected)。
* n天后的日期moment().add('days',7).format('YYYY年MM月DD日');
* 区分用户第一次进入页面还是刷新操作，window.name = xx;
* Navigator 对象包含有关浏览器的信息;
* 纯JavaScript编写的一个图表库
    * http://www.runoob.com/highcharts/highcharts-tutorial.html
* 移动端滑动切换，swiper.js  http://www.swiper.com.cn/
* 获取元素data-no的值： var no = $(this).data('no');
* 异步提交避免使用button
* $('#province option:selected').text()
    * 或者该select的value var value_ = $(this).find("option:selected").val();
* 下载window.open(http);
* 数组push到末尾
*   $("#verifyForm").on('click', 'a[id="refuse"]', function(event) {
        $(this).attr('data-target', '#roleModal');
    });
* parseInt()向下取整。
* promise只有三种状态，未完成(pending)，完成(resolved),拒绝(rejected)
    * promise的状态可以由未完成转换成完成，或者未完成转换成失败。
    * promise的状态转换只发生一次
    * promise有一个then方法，then方法可以接受3个函数作为参数。前两个函数对应promise的两种状态fulfilled, rejected的回调函数。第三个函数用于处理进度信息
    * Promise要求then会返回一个新的promise
* 标准的 JavaScript 错误：
    * <EvalError> : 当调用 eval() 失败时抛出。
    * <SyntaxError> : 当 JavaScript 语法错误时抛出。
    * <RangeError> : 当值不在预期范围内时抛出。
    * <ReferenceError> : 当使用未定义的变量时抛出。
    * <TypeError> : 当传入错误类型的参数时抛出。
    * <URIError> : 当全局的 URI 处理函数被误用时抛出。

* jquery1.6*源码19-21行	防止document之类的全局变量被其他插件修改，因此引入了window来正确定义闭包体内的document、navigator、location  <br> 22-950行	jQuery的核心工具函数  <br>  
952-1149行	异步队列   <br>
1150-1405行	浏览器测试  <br>  
1406-1733行	数据缓存 data  <br>  
1734-1905行	队列  <br>  
1906-2535行	属性操作  <br>  
2536-3729行	事件处理  <br>  
3738-5152行	选择器sizzle  <br>  
5153-5482行	dom遍历  <br>  
5487-6247行	dom操作  <br>  
6251-6619行	CSS操作  <br>  
6623-7981行	异步请求  <br>  
7985-8600行	动画FX  <br>  
8604-8976行	坐标和大小  <br>  
8980行	
* window.jQuery = window.$ = jQuery;将jQuery转变为全局对象  <br>  
* jquery.form.min.js 文件上传
* $(this).closest('tr')  返回该元素的第一个祖先元素
* jquery.jOrgChart.js  异步加载生成组织框架图
* Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
* js同步 confirm，alert
* moment获取时间段
    * moment.duration().days();
* 回退网页<a href="javascript:history.go(-1);">返回</a>
* $("#materiel").find("tbody").on("change", '.pmater', function(){});
    * $("#materiel").find("tbody").on("keyup", '.materNumb', function(){})
* replace(/(^\s*)|(\s*$)/g, "")
* date = date.replace(/-/g, "");
* append() - 在被选元素的结尾插入内容
    * prepend() - 在被选元素的开头插入内容
    * after() - 在被选元素之后插入内容
    * before() - 在被选元素之前插入内容
* val=$('input:radio[name="sex"]:checked').val();