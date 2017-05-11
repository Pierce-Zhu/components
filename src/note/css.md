css  &&   bootstrap
======

* bootstrap禁止点击空白处：$(‘#myModal’).modal({backdrop: ‘static’, keyboard: false})
* 表单水平排列
 1.加类  form-horizontal  
 2.用删格排列		
* border-radius: 5px 5px 0 0;上面两个角为圆角。
* input背景颜色透明	background-color:transparent;
* 背景颜色渐变
    background: -webkit-gradient(linear, left top, right top, color-stop(0%, #ff9900), color-stop(100%, #fff));
    background: -webkit-linear-gradient(left, #ff9900 0%, #fff 100%);
    background: -o-linear-gradient(left, #ff9900 0%, #fff 100%);
    background: -ms-linear-gradient(left, #ff9900 0%, #fff 100%);
    background: linear-gradient(to right, #ff9900 0%, #fff 100%);
* input透明无边框
    * .form-group form input{
        * border: none;
        * background-color: transparent;
        * outline:medium;
        * cursor:pointer;
    * }
* 背景色渐变    background: -webkit-linear-gradient(top,#9CD463,#457002);
	background:-moz-linear-gradient(top,#9CD463,#457002);
    background:-o-linear-gradient(top,#9CD463,#457002);
* 去除a的效果 <br> a {
	text-decoration: none !important;
	color: rgb(137,137,137);
}
* 禁止textarea拉伸      style="resize: none;"
* 左右居中，text-align :center
* 在图片上要放置其他元素进行绝对定位，而且又需要自适应时，这是把图片当做img元素在页面插入比吧图片当做背景更好控制。而且绝对定位偏移时时用百分比就全部用百分比，包括一些按钮的大小。
* 图标旋转90度 <br>
.rotate {
    transform: rotate(90deg);
	-ms-transform: rotate(90deg); /* Internet Explorer */
	-moz-transform: rotate(90deg); /* Firefox */
	-webkit-transform: rotate(90deg); /* Safari 和 Chrome */
	-o-transform: rotate(90deg); /* Opera */
}
*用表格陈列图片时,如<table><tr><td><img src="xxx"></td></td></table>，当某一项的td空置不放图片时，该出会出现一个border框框，可以对img使用display：none
