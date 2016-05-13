* mac 虚拟机 终端 docker 进入 postgres：docker exec -it 数据库名（docker_postgres_1） /bin/bash
* 显示所有数据库：psql -U postgres --list
* createdb mydb 创建数据库
* create table mytable(name varchar(10),pwd varchar(20));创建表
* drop table **
* 外键 你想确保没有人可以在A表里插入一条在B表里没有匹配记录的数据行。这就叫维护你的表的参考完整性。这个方法有许多问题，而且非常不便，因此 PostgreSQL 可以为你做这些。
CREATE TABLE cities (
        city            varchar(80) primary key,
        location        point
);
CREATE TABLE weather (
        city            varchar(80) references cities(city),
        temp_lo         int,
        temp_hi         int,
);
