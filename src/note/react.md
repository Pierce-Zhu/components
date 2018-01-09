React
=

* 构建react
    * npm install -g create-react-app 
    * create-react-app hello-world 
    * cd hello-world 
    * npm start

* 有利于搜索引擎优化，React可以在服务器上预渲染应用再发送到客户端。它可以从预渲染的静态内容中恢复一样的记录到动态应用程序中。因为搜索引擎的爬虫程序依赖的是服务端响应而不是JavaScript的执行，预渲染你的应用有助于搜索引擎优化。

* react中数据的流动是单向的，父组件的数据可以通过设置子组件的props传递数据给子组件。如果想让子组件改变父组件的数据，可以在父组件中传一个callback(回调函数)给子组件，子组件内调用这个callback即可改变父组件的数据。
* 兄弟组件之间的数据传递可以通过全局事件和context。
* React Router 是建立在 history 之上的。 简而言之，一个 history 知道如何去监听浏览器地址栏的变化， 并解析这个 URL 转化为 location 对象， 然后 router 使用它匹配到路由，最后正确地渲染对应的组件。
* History三种：browserHistory，hashHistory，createMemoryHistory