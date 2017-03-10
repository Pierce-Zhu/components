Number（js）
==

* a保留n位小数:a.toFixed(n);
* 字符串转换成数字，js提供了parseInt()和parseFloat()两个转换函数;将字符串转换成数字，得用到String类的toString方法
* 判断是否为数字： isNaN(val)
* 判断是否为整数：
    * if(!isNaN(n) || Math.floor(n) === n) 
    * typeof obj === 'number' && obj%1 === 0
    * ES6提供了Number.isInteger