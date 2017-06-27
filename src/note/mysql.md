mysql
======

* 模糊查询select * from order_info where tickets like '%123456%'
* 连接池
* mysqldump -u 用户名 -p 数据库名 > 导出的文件名 
* 使用连接（JOIN）来代替子查询,left join等
* 索引
* sql += " limit " + Number(req.query.start) + ', ' + Number(req.query.length);
* 查询为空：where a is null ,判断不为空可以用 where a !='' 或者 where a is not null
* 排序时生成序号:
    * set @i := 0;select @i := @i + 1 as num ,allinvest from usercount ORDER BY allinvest desc limit 10
* case when....按字段范围统计数据
    * 查询输出以及where条件均可使用
* 模糊查询：
    * SELECT * FROM [user] WHERE u_name LIKE '%三%' 
    * SELECT * FROM [user] WHERE u_name LIKE '_三_' 只找出“唐三藏”这样u_name为三个字且中间一个字是“三”的； 
    * SELECT * FROM [user] WHERE u_name LIKE '老[1-9]' 将找出“老1”、“老2”、……、“老9”；
    * SELECT * FROM [user] WHERE u_name LIKE '老[^1-4]'; 将排除“老1”到“老4”，寻找“老5”、“老6”、…
* 修改某字段的指定条数update usercount set sex = '0' limit 1000
* update usercount set user_id=?,sex=?,reinvestrate=? where user_id='user_id'
* join 与left join的效率问题
* left outer join

