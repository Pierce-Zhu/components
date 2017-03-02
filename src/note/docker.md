docker
==

* 镜像，容器，仓库
    * docker仓库（repository）类似于代码仓库，是docker存放镜像的地方。注册服务器是存放仓库的地方，其上可能存放多个仓库，每个仓局集中存放某一类镜像，往往包含多个镜像文件，通过不同的标签tag进行区分。
    * 公开仓局与私有仓局，目前最大的公开仓库Docker Hub。包含大量镜像宫下载。
    * 镜像是运行docker容器的前提
* 命令
    * docker images 查看本地主机已有的镜像
    * docker inspect [IMAGE ID]
    * docker inspect -f [{{".Created"}}] [版本号]  查看具体某一项信息，如创建时间
    * docker search [name] 搜索远端仓局中的共享镜像
    * docker rmi [image] 根据tag或者id删除镜像 （docker rmi mysql:latest）
        * 注意该镜像创建的容器存在时，镜像文件默认为无法删除
        * 强行删除镜像：sudo docker rmi -f mysql