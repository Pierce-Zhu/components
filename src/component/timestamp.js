/*计算时间差*/
function timeStamp(begin, end) {
    var date1 = new Date(begin);
    var date2 = new Date(end);
    var timeStamp = ((date2.getTime() - date1.getTime())/(1000 * 3600 * 24)).toFixed(2);
    // console.log('时间差fdsafdfasfd', timeStamp);
    var floor = 0, hour = 0;
    floor = Math.floor(timeStamp);
    hour = (timeStamp+'').split(".")[1].charAt(0);
    console.log('floor', floor, hour);
    timeStamp = Number(floor) + Number(hour > 5 ? 1 : hour > 0 ? 0.5 : 0);
    return timeStamp;
}
