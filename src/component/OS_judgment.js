//简单
<script type="text/javascript">
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
alert('是否是Android：'+isAndroid);
alert('是否是iOS：'+isiOS);
</script>


//多种判断
<script type="text/javascript">
    if(/android/i.test(navigator.userAgent)){
        document.write("This is Android'browser.");//这是Android平台下浏览
    }
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
      	document.write("This is iOS'browser.");//这是iOS平台下浏览器   
    }
    if(/Linux/i.test(navigator.userAgent)){
      	document.write("This is Linux'browser.");//这是Linux平台下浏览器   
    }
   	if(/MicroMessenger/i.test(navigator.userAgent)){
      	document.write("This is MicroMessenger'browser.");//这是微信平   
  	}
</script>

