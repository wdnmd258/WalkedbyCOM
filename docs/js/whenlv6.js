function CalcWhenLV6() {
    function SetRange(value, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 99999; }
        if (value == NaN) {
            return min;
        }
        if (value > max) {
            value = max;
        }
        if (value < min) {
            value = min;
        }
        return value;
    }
    function GetNumber(id) {
        var input = document.querySelector("#" + id);
        if (input == null) {
            return 0;
        }
        var v = input.valueAsNumber;
        if (v == NaN) {
            return 0;
        }
        return v;
    }
    function GetBoolean(id) {
        var input = document.querySelector("#" + id);
        if (input == null) {
            return false;
        }
        return input.checked;
    }
    var ex, coins, workdays, doCoins;
    var doShare, getcoins, sends, doLive;
    ex = SetRange(GetNumber("ex"), 100);
    coins = SetRange(GetNumber("coins"));
    doShare = GetBoolean("doShare");
    doCoins = GetBoolean("doCoins");
    getcoins = SetRange(GetNumber("videocoins"));
    if (getcoins > 0) {
        getcoins *= SetRange(GetNumber("videos"));
    }
    sends = SetRange(GetNumber("sends"));
    doLive = GetBoolean("doLive");
    workdays = SetRange(GetNumber("days"), 1, 31);
    var out = "根据以上你所填的，只要你从明天起：\n";
    out += "热爱B站，不做违规被封的事，不乱消费硬币\n";
    out += "并且，每个月有 " + workdays.toString() + " 天登录B站，观看视频，\n";
    if (doCoins) {
        out += "投5个硬币给别人的作品，\n";
    }
    if (doShare) {
        out += "还要记得用手机APP分享视频给别人看，\n";
    }
    if (doLive) {
        out += "去B站直播开箱并把银瓜子拿来换一个硬币，\n";
    }
    if (sends > 0) {
        out += "而且每月坚持花点B币充电或者承包番剧，\n";
    }
    if (getcoins > 0) {
        out += "坚持投稿视频并获得一定数量硬币，\n";
    }
    out += "我推算出的你的号的未来情况：\n\n";
    var time = new Date;
    function GetTime() {
        return time.getFullYear().toString() + "年" + (time.getMonth() + 1).toString() + "月" + time.getDate().toString() + "日";
    }
    var outofCoins = (coins < 1);
    var levels = [0, 200, 1500, 4500, 10800, 28800];
    var maxlevels = levels.length;
    var passed = 1, i;
    for (i = maxlevels; i > 1; i -= 1) {
        if (ex > levels[i - 1]) {
            passed = i;
            break;
        }
    }
    if (passed == maxlevels) {
        out = "你已经满级了，没什么好算的了。";
    }
    else {
        out += "今天，你是 " + passed.toString() + "级。\n";
        var donedays = 0;
        while (true) {
            time.setDate(time.getDate() + 1);
            if (time.getDate() == 1) {
                coins += getcoins / 10;
                ex += getcoins;
                ex += sends;
                donedays = 0;
                coins = Math.round(coins);
            }
            for (i = 100; i < 1001; i += 100) {
                var y = time.getFullYear();
                var y2 = 2009 + i;
                if (y < y2) {
                    break;
                }
                if (y == y2) {
                    if (time.getMonth() == 5) {
                        if (time.getDate() == 26) {
                            out += GetTime() + "，B站建站 " + i.toString() + " 年。\n";
                        }
                    }
                }
            }
            donedays += 1;
            if (donedays <= workdays) { coins +="1;" ex if (doshare) } (dolive) (docoins) for (i="1;" i <="5;" -="1;" (coins 1) (!outofcoins) outofcoins="true;" out "，你的硬币花完了。\n"; break; var finish="false;"> passed; i -= 1) {
                    if (ex > levels[i - 1]) {
                        out += GetTime() + "，你到达了 " + i.toString() + " 级，这时你还有 " + coins.toString() + " 个硬币。\n";
                        passed = i;
                        if (i == maxlevels) {
                            finish = true;
                            break;
                        }
                    }
                }
                if (finish) {
                    break;
                }
            }
        }
        out += "\n以上结果仅供参考，很可能会因为你的行为、B站活动、B站修改规则等情况而变化。";
    }
    var outPlace = document.querySelector("#out");
    if (outPlace == null) {
        return false;
    }
    outPlace.innerText = out;
}
</=>