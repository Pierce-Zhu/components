Node
====

* Node.js是单线程异步非阻塞的，以单线程为基础，注意Node.js在底层访问I/O还是多线程的（阻塞/非阻塞与异步/同步是两个不同的概念，同步不代表阻塞，但是阻塞肯定就是同步）
  * 时间驱动
  * 单进程，单线程
  * 高并发
* 单线程优点
  * 单线程避免了传统PHP那样频繁创建、切换线程的开销，使执行速度更加迅速。
  * 第二，资源占用小
  * 单线程的js还保证了绝对的线程安全，不用担心同一变量同时被多个线程进行读写而造成的程序崩溃
  * 缺点：
  * 如果PHP代码损坏，不会拖垮整个服务器。 PHP代码只运行在自己的进程范围中，当某个请求显示错误时，它只对特定的请求产生影响。而在Node.js环境中，所有的请求均在单一的进程服务中，当某个请求导致未知错误时，整个服务器都会受到影响。

* listen EADDRINUSE   通常是端口被占用。使用pkill node 
  * 查看node端口占用：ps -ef | grep node   
* 单元测试，在子模块中npm test,调用测试脚本。 
* node是单进程单线程，通过事件和回调支持并发

既然我们可以通过V8的调试插件来调试，也可以借用Chrome浏览器的JavaScript调试器来调试？node-inspector模块提供了这样一种可能。<br>

npm install -g node-inspector  // -g 导入安装路径到环境变量 <br>

* node同事连接多个后台（如java）或者多个数据库配置
* Nginx最主要的功能是反向代理，负载均衡，是为其他web server服务的。而node.js一般是作为web server使用的，两者的用途不一样，两者的性能比较意义不大。Nginx因为其功能简单，没有太复杂的逻辑，主要解决的I/O (socket)的资源占用(内存，线程)而出名的，它的改进对比对象应该是apache httpd与IIS
* async.auto的“管道”操作
  * async.auto({
    * 'a': function(){},
    * 'b':['a'，function(cb,param){
      * param.axxxxxxxxxx
    * }]
  * })

* js异步渲染页面，比如页面中点击不同投资人，然后弹出该投资人详情模态框（数据很多），如何避免直接渲染父页面（消耗大，而且不好实现）？将模态框单独作为新的，页面这时候异步向后台查询，然后渲染模态框页面，最后将渲染后的模态框页面用js添加到父页面。
  $('#table').on('click', 'a[class=userDetail]', function(event) {
        _id = $(this).data('no');
        $.get("/lender/list/" + _id, null, function (json) {
            $('#investor-modal').html(json);
            $('#investor-modal').modal('show');
        });
    });
* eventproxy   管理并发结果，可以理解为计数器的作用
* superagent  类似于request库，kttp请求，可以看做是服务端的 ajax
* 需要循操作数据库时用async.eachSeries(data, function(item, cb){})
*  使用ajax时，想node层传递参数时，要封装成json格式，即{‘name’: value},如果单传一个value值得花，node会自动封装成{value: ‘’}，导致出错;
* node excel导出包 util-excel
* node在单线程，大型web系统中作为的server端存在很多弊端，go某种意义上是很好地替代品
* exports 是 module.exports 的一个引用,module.exports 初始值为一个空对象 {}，所以 exports 初始值也是 {},require 引用模块后，返回的是 module.exports 而不是 exports!!!!!,exports.xxx 相当于在导出对象上挂属性，该属性对调用模块直接可见,exports = 相当于给 exports 对象重新赋值，调用模块不能访问 exports 对象及其属性
* node cluster模块
