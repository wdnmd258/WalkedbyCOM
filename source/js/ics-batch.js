"use strict";
function Generate2CharsNumStr(n) {
    var s = n.toFixed();
    if (n < 10) {
        s = "0" + s;
    }
    return s;
}
function GetInputStr(id) {
    var he = document.getElementById(id);
    if (he == null) {
        return "";
    }
    var input = he;
    return input.value;
}
function GetInputNum(id) {
    var he = document.getElementById(id);
    if (he == null) {
        return 0;
    }
    var input = he;
    return parseInt(input.value);
}
function GetInputBool(id) {
    var he = document.getElementById(id);
    if (he == null) {
        return false;
    }
    var input = he;
    return input.checked;
}
function DownloadText(filename, txt) {
    var a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(txt);
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
}
var ICSFileBuilder = (function () {
    function ICSFileBuilder() {
        this.Events = [];
    }
    ICSFileBuilder.prototype.AddEvent = function (name, date, yearly) {
        this.Events.push({ Name: name, Date: date, Yearly: yearly });
    };
    ICSFileBuilder.prototype.ToString = function () {
        var i;
        var s = "BEGIN:VCALENDAR\nVERSION:2.0\n";
        for (i = 0; i < this.Events.length; i++) {
            var e = this.Events[i];
            s += "BEGIN:VEVENT\nDTSTART;VALUE=DATE:" + e.Date + "\n";
            if (e.Yearly) {
                s += "RRULE:FREQ=YEARLY\n";
            }
            s += "SEQUENCE:1\nSUMMARY:" + e.Name + "\nEND:VEVENT\n";
        }
        s += "END:VCALENDAR";
        return s;
    };
    return ICSFileBuilder;
}());
function GenerateICS(text, event, regexMonth, regexDate, regexName, regexEventName, useLunarCalendar) {
    if (text.trim().length < 1) {
        throw "输入文本不能为空";
    }
    if (event.trim().length < 1) {
        throw "正则表达式不能为空";
    }
    if (regexEventName.trim().length < 1) {
        throw "事件名添加前缀后缀 不能为空，最起码应该是 $0";
    }
    if (regexMonth < 1 || regexMonth > 9) {
        throw "错误的匹配位置：月";
    }
    if (regexDate < 1 || regexDate > 9) {
        throw "错误的匹配位置：日";
    }
    if (regexName < 1 || regexName > 9) {
        throw "错误的匹配位置：事件名";
    }
    var builder = new ICSFileBuilder();
    var reg = new RegExp(event, "gi");
    var results = [];
    while (true) {
        var r = reg.exec(text);
        if (r == null) {
            break;
        }
        results.push(r);
    }
    if (results.length < 1) {
        throw "没有一个可用正则，工作失败";
    }
    var thisYear = (new Date).getFullYear();
    var thisYearStr = thisYear.toString();
    var i;
    for (i = 0; i < results.length; i++) {
        var r = results[i];
        if (r == null) {
            throw "不应该出现的 null ，index: " + i.toString();
        }
        var Month = parseInt(r[regexMonth]);
        var Day = parseInt(r[regexDate]);
        var EventName = r[regexName];
        if (isNaN(Day) || isNaN(Month) || EventName.length < 1) {
            throw "不应该出现的匹配内容，数字或文本失败：" + r.toString();
        }
        EventName = regexEventName.replace(/\$0/gi, EventName);
        var DateStr;
        if (useLunarCalendar) {
            var y;
            for (y = 0; y < 10; y++) {
                var newYear = thisYear + y;
                var cr = solarlunar.lunar2solar(newYear, Month, Day);
                if (typeof (cr.cYear) == "undefined") {
                    var j, ok = false;
                    for (j = 1; j < 5; j++) {
                        var dt = new Date(newYear, Month, 1);
                        dt.setDate(Day - j);
                        cr = solarlunar.lunar2solar(newYear, dt.getMonth(), dt.getDate());
                        if (typeof (cr.cYear) != "undefined") {
                            ok = true;
                            break;
                        }
                    }
                    if (!ok) {
                        throw "这个日期在农历没救了：" + newYear.toString() + " 年 " + Month.toString() + " 月 " + Day.toString() + " 日";
                    }
                }
                DateStr = cr.cYear.toString() + Generate2CharsNumStr(cr.cMonth) + Generate2CharsNumStr(cr.cDay);
                builder.AddEvent(EventName, DateStr, false);
            }
        }
        else {
            DateStr = thisYearStr + Generate2CharsNumStr(Month) + Generate2CharsNumStr(Day);
            builder.AddEvent(EventName, DateStr, true);
        }
    }
    return builder.ToString();
}
function ButClicked() {
    var ics = "";
    try {
        ics = GenerateICS(GetInputStr("inputText"), GetInputStr("regexEvent"), GetInputNum("regexMonth"), GetInputNum("regexDate"), GetInputNum("regexName"), GetInputStr("regexEventName"), GetInputBool("useLunarCalendar"));
    }
    catch (error) {
        alert("出错：" + error);
        return;
    }
    var fname = Math.floor((Math.random() * 7777 + 1111)).toString() + ".ics";
    DownloadText(fname, ics);
}
