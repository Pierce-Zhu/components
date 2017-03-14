Node
====

* Node.js是单线程异步非阻塞的，以单线程为基础，注意Node.js在底层访问I/O还是多线程的（阻塞/非阻塞与异步/同步是两个不同的概念，同步不代表阻塞，但是阻塞肯定就是同步）
* 单线程优点
  * 单线程避免了传统PHP那样频繁创建、切换线程的开销，使执行速度更加迅速。
  * 第二，资源占用小
  * 单线程的js还保证了绝对的线程安全，不用担心同一变量同时被多个线程进行读写而造成的程序崩溃
  * 缺点：
  * 如果PHP代码损坏，不会拖垮整个服务器。 PHP代码只运行在自己的进程范围中，当某个请求显示错误时，它只对特定的请求产生影响。而在Node.js环境中，所有的请求均在单一的进程服务中，当某个请求导致未知错误时，整个服务器都会受到影响。

* 1路由：res.locals.A  ,ejs中locals.A  ||| rs.send({'code': -1}),ejs中则为rs.code
* listen EADDRINUSE   通常是端口被占用。使用pkill node 
  * 查看node端口占用：ps -ef | grep node    <br>
* 单元测试，在子模块中npm test,调用测试脚本。 <br>
* 基于Chrome浏览器的调试器  <br>

既然我们可以通过V8的调试插件来调试，那是否也可以借用Chrome浏览器的JavaScript调试器来调试呢？node-inspector模块提供了这样一种可能。我们需要先通过npm来安装node-inspector   <br>

npm install -g node-inspector  // -g 导入安装路径到环境变量 <br>
node-inspector是通过websocket方式来转向debug输入输出的。因此，我们在调试前要先启动node-inspector来监听Nodejs的debug调试端口。 <br>

* 使用forEach前最好先对数据进行处理一下，以免出错，:<br>	
	<% var cards = locals.cards || [];%> <br>
	<% cards.forEach(function(v,i){%>

* uncaughtException Can't set headers after they are sent<br>
	* 通常是因为在最后希望res.render渲染页面之前，已经出现了res.render或者res.send，阻塞了最后代码的执行。在每个res.xxxx代码结尾处执行return或者return true/flase，保证逻辑的互斥性。

* js异步渲染页面，比如页面中点击不同投资人，然后弹出该投资人详情模态框（数据很多），如何避免直接渲染父页面（消耗大，而且不好实现）？将模态框单独作为新的，页面这时候异步向后台查询，然后渲染模态框页面，最后将渲染后的模态框页面用js添加到父页面。
  $('#table').on('click', 'a[class=userDetail]', function(event) {
        _id = $(this).data('no');
        $.get("/lender/list/" + _id, null, function (json) {
            $('#investor-modal').html(json);
            $('#investor-modal').modal('show');
        });
    });
* 获取当前时间 moment().format('YYYY-MM-DD HH:mm:ss')
* 需要循操作数据库时用async.eachSeries(data, function(item, cb){})；
* 当较多的sql需要处理时，尽量使用async异步处理，否则代码执行容易出问题。
*  使用ajax时，想node层传递参数时，要封装成json格式，即{‘name’: value},如果单传一个value值得花，node会自动封装成{value: ‘’}，导致出错;
* node excel带出包 util-excel