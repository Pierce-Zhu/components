* 表单水平排列
 1.加类  form-horizontal  
 2.用删格排列
	<div class="form-group col-xs-12" style="">
		<span class="col-xs-4">页面点击量</span>
		<div class="col-xs-4">
			<input type="" class="form-control" placeholder="<%= locals.pageNum ? locals.pageNum:0%>">
		</div>
	</div>
	<div class="form-group col-xs-12" style="">
		<span class="col-xs-4">安卓下载点击量</span>
		<div class="col-xs-4">
			<input type="" class="form-control" placeholder="<%= locals.downNum ? locals.downNum:0%>">
		</div>
	</div>	

	.form-group{
		margin-bottom: 10px;
		margin-left: -40px;
		height:35px;
	}
	.form-group > span{
		line-height: 30px;
		text-align: right;
	}		
* border-radius: 5px 5px 0 0;上面两个角为圆角。
* input背景颜色透明	background-color:transparent;
* 背景色渐变    background: -webkit-linear-gradient(top,#9CD463,#457002);
	background:-moz-linear-gradient(top,#9CD463,#457002);
    background:-o-linear-gradient(top,#9CD463,#457002);
* 去除a的效果 <br> a {
	text-decoration: none !important;
	color: rgb(137,137,137);
}
* 左右居中，text-align :center
* 在图片上要放置其他元素进行绝对定位，而且又需要自适应时，这是把图片当做img元素在页面插入比吧图片当做背景更好控制。而且绝对定位偏移时时用百分比就全部用百分比，包括一些按钮的大小。
