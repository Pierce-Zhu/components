
* mac 虚拟机 终端 docker 进入 postgres：docker exec -it 数据库名（docker_postgres_1） /bin/bash
* 显示所有数据库：psql -U postgres --list
* createdb mydb 创建数据库
* 清除表数据delete from user_info;
* create table mytable(name varchar(10),pwd varchar(20));创建表
* drop table xx
*  向表中插入数据INSERT INTO commission VALUES ('6af9ddd4191e4e9ba365b026ca88880c','2016-05-12 11:31:08',50.00000 ,34.99000,50.00000, '13618321841');  <br>
   或者INSERT INTO weather (city, temp_lo, temp_hi, prcp, date) VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');
*  一个聚集函数从多个输入行中计算出一个结果。 比如，我们有在一个行集合上计算 count（数目）， sum（和），avg（均值）， max（最大值）和min（最小值）的函数 <br>  SELECT max(temp_lo) FROM weather;
* 外键 你想确保没有人可以在A表里插入一条在B表里没有匹配记录的数据行。这就叫维护你的表的参考完整性。这个方法有许多问题，而且非常不便，因此 PostgreSQL 可以为你做这些。  <br>
CREATE TABLE cities (                           <br>
        city            varchar(80) primary key,<br>
        location        point                   <br>
);												<br>
CREATE TABLE weather (							<br>
        city            varchar(80) references cities(city),	<br>
        temp_lo         int,									<br>
        temp_hi         int,									<br>
);																<br>
* 联表查询：
	* 1.相关联的两个表，两个表中所有字段显示，select * from user_info,user_money;显示字段顺序会按照from后面的表排列顺序。<br>
   如果要根据相同的字段进行排列，SELECT * FROM weather, cities WHERE city = name;这里city和nam都是存储的城市名，分属于两个表。
	* 2.时间要用引号  select a.name, a.mobile, b.ypb_freeze from user_info as a, user_money as b
    where b.ypb_freeze >= 10000 and register_time >= '2015-12-12 00:00:00' and a.user_id = b.user_id
	* 3。子查询select * from invest where user_id in(select user_id from user_info where invest_time > '2016-02-02') and balabala
	* 4.另一种链表查询(left join 表示左边的表是主表)select * from invest as a left join produce as b on a.user_id = b.user_id left join receipt as c on b.user_id = c.user_id<br>
	where balalba <br>
	group by user_id<br>
	having (进一步过滤)

