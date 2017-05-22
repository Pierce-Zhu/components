mysql
======

* 模糊查询select * from order_info where tickets like '%123456%'
* 连接池
* mysqldump -u 用户名 -p 数据库名 > 导出的文件名 
* 使用连接（JOIN）来代替子查询,left join等
* 索引
* sql += " limit " + Number(req.query.start) + ', ' + Number(req.query.length);