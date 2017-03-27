mongo
======

* Mongoose 是 MongoDB 的 ODM(Object Document Mapper)。
    * ODM和ORM(Object Relational Mapper)是同类型的工具。都是将数据库的数据转化为代码对象的库，使用转化后的对象可以直接对数据库的数据进行CRUD(增删改查)；
    *  MongoDB 是文档型数据库(Document Database)，不是关系型数据库(Relational Database)。而Mongoose可以将 MongonDB 数据库存储的文档(documents)转化为 javascript 对象，然后可以直接进行数据的增删改查；
    * 非关系型数据库在建立数据的关联时会比较麻烦。为了解决这个问题，Mongoose封装了一个Population功能。使用Population可以实现在一个 document 中填充其他 collection(s) 的 document(s)；
* userinfo.find({查询条件}，{返回字段}，{过滤条件}，function(er, data) {});  <br>
	userinfo.find({}，{}，{'limit': 1, 'sort': $%^$^$^%}，function(er, data) {}); 
* 过滤：db.collection.find({ "field" : { $gt: value } } ); // greater than : field > value
* 查询2条以后的数据 db.user.find().skip(2);
* 查询在2-10之间的数据　> db.user.find().limit(10).skip(2);
* 去掉重复数据 > db.user.distinct('name');
* annitask.find({'$or':[{'persons': {'$gte': 1}}, {'money': {'$gte': 5000}}]}, function(er, data) {})
* mac /document/vagrant/docker 为共享目录，导入导出表君放在这里。
* 导出数据
    * 进入本机vagrant 中,
    * 执行docker exec -it docker_mongo_1 /bin/bash
    * cd data/db
    * mongoexport -d analysis -c staff -o staff.dat
* docker exec -it common_mongo_1 /bin/bash 进入mongoDB shell
