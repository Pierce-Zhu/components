//不兼容ie
    function timeFormat(times) {
        var hour = 0,
            minutes = 0,
            second = 0;

        if(times/3600 >= 1) {
            hour = times/3600;
            hour = +regInteger.exec(hour.toString())[1] 
            times -= hour*3600; 
        }
        hour = regTwo.test(hour.toString()) ? hour.toString() : '0' + hour;

        if(times/60 >= 1) {
            minutes = times/60;
            minutes = +regInteger.exec(minutes.toString())[1] 
            times -= minutes*60; 
        }
        minutes = regTwo.test(minutes.toString()) ? minutes.toString() : '0' + minutes;

        second = times;
        second = regTwo.test(second.toString()) ? second.toString() : '0' + second;
        return {
            hour: hour,
            minutes: minutes,
            second: second,
        }
    }

    var timer = setInterval(function() {
        var {hour, minutes, second} = timeFormat(times--);
        if(times == -2) {
            clearInterval(timer);
        } else {
            $hour.html(hour);
            $min.html(minutes);
            $sec.html(second);
        }
    },1000)