* 源文件名应当与public类名保持一致。一个源文件只能有一个public类，可以有多个非public类。
* static
	* 被static修饰的成员变量和成员方法独立于该类的任何对象。也就是说，它不依赖类特定的实例，被类的所有实例共享。
	* 只要这个类被加载，Java虚拟机就能根据类名在运行时数据区的方法区内定找到他们。因此，static对象可以在它的任何对象创建之前访问，无需引用任何对象。 
	* 用public修饰的static成员变量和成员方法本质是全局变量和全局方法，当声明它类的对象市，不生成static变量的副本，而是类的所有实例共享同一个static变量.
	* http://zhidao.baidu.com/link?url=MseSIv8EaR51WQ303hhfo1hRJ8gDDQSv_jpzwUBV2Dax_Nw242Uz8YLmTu8ZfB1MtGluSbEv96jZPQBa_OMtZq
* 如果一个类定义在某个包中，那么package语句应该在源文件的首行
* 类中的Final方法可以被子类继承，但是不能被子类修改。
* Jetty是一个开源的servlet容器，它为基于Java的web容器，Jetty是使用Java语言编写的，它的API以一组JAR包的形式发布。开发人员可以将Jetty容器实例化成一个对象，可以迅速为一些独立运行（stand-alone）的Java应用提供网络和web连接。
* Java 泛型（generics）是 JDK 5 中引入的一个新特性, 泛型提供了编译时类型安全检测机制，该机制允许程序员在编译时检测到非法的类型。
* int是一种基本数据类型，而Integer是一个类，是对int的封装。
* 初始化数组三种方式：1.String[] array = new String[3];    2.int array[] = { 2, 5, -2, 6, -3, 8, 0, -7, -9, 4 };    3.Integer[] numbers = { 8, 2, 7, 1, 4, 9, 5};
* 这是因为List集合为列表类型，以线性方式存储对象，可以通过对象的索引操作对象.因为List接口实现了Collection接口，所以List接口拥有Collection接口提供的所有常用方法，又因为List是列表类型，所以List接口还提供了一些适合于自身的常用方法