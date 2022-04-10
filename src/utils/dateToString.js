export default {
    dateToString(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString();
        var day = (date.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var dateTime = year + "-" + month + "-" + day;
        return dateTime;
    },
    ChangeTimeToString(DateIn) {

        var Year = 0;

        var Month = 0;

        var Day = 0;

        var Hour = 0;

        var Minute = 0;

        var CurrentDate = "";



        // 初始化时间

        Year = DateIn.getFullYear();

        Month = DateIn.getMonth() + 1;

        Day = DateIn.getDate();

        Hour = DateIn.getHours();

        Minute = DateIn.getMinutes();
        console.log(Year);

        CurrentDate = Year + "-";

        if (Month >= 10) {

            CurrentDate = CurrentDate + Month + "-";

        }

        else {

            CurrentDate = CurrentDate + "0" + Month + "-";

        }

        if (Day >= 10) {

            CurrentDate = CurrentDate + Day;

        }

        else {

            CurrentDate = CurrentDate + "0" + Day;

        }



        if (Hour >= 10) {

            CurrentDate = CurrentDate + " " + Hour;

        }

        else {

            CurrentDate = CurrentDate + " 0" + Hour;

        }

        if (Minute >= 10) {

            CurrentDate = CurrentDate + ":" + Minute;

        }

        else {

            CurrentDate = CurrentDate + ":0" + Minute;

        }

        return CurrentDate;

    },
    weekDay(time){
        let datelist = ['周日','周一','周二','周三','周四','周五','周六',];
        return datelist[new Date(time).getDay()];
    }
}