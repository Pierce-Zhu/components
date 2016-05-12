* mac 虚拟机 终端 docker 进入 postgres：docker exec -it 数据库名（docker_postgres_1） /bin/bash
* 显示所有数据库：psql -U postgres --list
* createdb mydb 创建数据库
* create table mytable(name varchar(10),pwd varchar(20));创建表
* drop table **