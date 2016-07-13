* 1路由：res.locals.A  ,ejs中locals.A  ||| rs.send({'code': -1}),ejs中则为rs.code
* listen EADDRINUSE   通常是端口被占用。使用pkill node
* 注册调教表单前记得：		req.session.register = null;
* 单元测试，在子模块中npm test,调用测试脚本。 <br>
* 基于Chrome浏览器的调试器  <br>

既然我们可以通过V8的调试插件来调试，那是否也可以借用Chrome浏览器的JavaScript调试器来调试呢？node-inspector模块提供了这样一种可能。我们需要先通过npm来安装node-inspector   <br>

npm install -g node-inspector  // -g 导入安装路径到环境变量 <br>
node-inspector是通过websocket方式来转向debug输入输出的。因此，我们在调试前要先启动node-inspector来监听Nodejs的debug调试端口。 <br>

* 使用forEach前最好先对数据进行处理一下，以免出错，:<br>	
	<% var cards = locals.cards || [];%> <br>
	<% cards.forEach(function(v,i){%>

* uncaughtException Can't set headers after they are sent<br>
	* 通常是因为在最后希望res.render渲染页面之前，已经出现了res.render或者res.send，阻塞了最后代码的执行。在每个res.xxxx代码结尾处执行return或者return true/flase，保证罗家的互斥性，使代码不会相互干扰。
