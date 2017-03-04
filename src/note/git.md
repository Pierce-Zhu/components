git
======
* 本地新建分支，关联yuanduan: git checkout -b [name] origin/[name]
* 强行删除分支： git branch -D [name]
* 项目多阶段上线，每一阶段本地新建分支，避免维护前一阶段时将后面修改的无关代码推到线上
* 回退远端版本：本地先恢复到需要的版本，然后：git push origin a:b --force强行覆盖元旦版本