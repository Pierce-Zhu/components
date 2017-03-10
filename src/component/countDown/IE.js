//兼容ie
    var timer = null;
    timer = setInterval(updateTime, 1000);

    function fillZero(num, digit) {
        var str = '' + num;
        while (str.length < digit) {
            str = '0' + str;
        }
        return str;
    }

    function updateTime() {
        var oDateEnd = new Date(); //当前时间
        var oDateNow = new Date(); //当前时间

        var iRemain = 0;

        var iDay = 0;
        var iHour = 0;
        var iMin = 0;
        var iSec = 0;
        //在当前时间基础上设置具体年月日时分秒，作为目标时间
        oDateEnd.setFullYear(parseInt(2017));
        oDateEnd.setMonth(parseInt(3) - 1);
        oDateEnd.setDate(parseInt(4));
        oDateEnd.setHours(0);
        oDateEnd.setMinutes(0);
        oDateEnd.setSeconds(0);
        //得到相距的秒数。
        iRemain = (oDateEnd.getTime() - oDateNow.getTime()) / 1000;
        iRemain = iRemain <= 0 ? 0 : iRemain;

        iDay = parseInt(iRemain / 86400);
        iRemain %= 86400;

        iHour = parseInt(iRemain / 3600);
        iRemain %= 3600;

        iMin = parseInt(iRemain / 60);
        iRemain %= 60;

        iSec = parseInt(iRemain);

        $("#day").html(fillZero(iDay, 2));
        $("#hour").html(fillZero(iHour, 2));
        $("#min").html(fillZero(iMin, 2));
        $("#sec").html(fillZero(iSec, 2));
        var str_left = iDay +'天' + iHour +'小时' + iMin + '分钟' + iSec + '秒';
        $time_left.html(str_left);
        if (iDay == 0 && iHour == 0 && iMin == 0 && iSec == 0) {
            clearInterval(timer);
        }
    }