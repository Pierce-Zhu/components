docker
==

* 镜像，容器，仓库
    * docker仓库（repository）类似于代码仓库，是docker存放镜像的地方。注册服务器是存放仓库的地方，其上可能存放多个仓库，每个仓局集中存放某一类镜像，往往包含多个镜像文件，通过不同的标签tag进行区分。
    * 公开仓局与私有仓局，目前最大的公开仓库Docker Hub。包含大量镜像宫下载。
    * 镜像是运行docker容器的前提；容器是镜像的一个运行实例，带有额外的可写层
    * UnionFS（联合文件系统）：是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下。UnionFS是 Docker镜像的基础
* 镜像命令
    * docker images 查看本地主机已有的镜像
    * docker inspect [IMAGE ID]
    * docker inspect -f [{{".Created"}}] [版本号]  查看具体某一项信息，如创建时间
    * docker search [name] 搜索远端仓局中的共享镜像
    * docker rmi [image][:tag] 根据tag或者id删除镜像 （docker rmi mysql:latest）
        * 注意该镜像创建的容器存在时，镜像文件默认为无法删除
        * 强行删除镜像：sudo docker rmi -f mysql (不推荐)
    * 创建镜像 docker commit [options] container [repository[:tag]]
        * -a --author
        * -m --message
        * -p --pause=true
    * 从本地文件导入本地镜像库 docker load --input ubuntu_14.tar 或 docker load < ubuntu_14.tar
    * 上传到官方默认库dockerHub: docker push Name[:tag]
* 容器命令

    * docker create新建容器 docker create -it ubuntu:latest
    * docker run 等价于docker create  => docker start
    * docker ps 运行中的容器
    * docker stop xx
    * 进入容器： docker attach,docker exec -ti xxxx /bin/bash
    * docker rm [options] container 删除处于终止状态的容器（强行删除运行中的 -f）
    * docker port [names] 查看端口映射