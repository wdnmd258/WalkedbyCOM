function CalcWhenLV6() {

    //把数字限制在范围之内的函数
    function SetRange(value: number, min: number = 0, max: number = 99999): number {
        if (value == NaN) { return min }
        if (value > max) { value = max }
        if (value < min) { value = min }
        return value
    }

    //收集数据
    function GetNumber(id: string): number {
        var input: HTMLInputElement | null = document.querySelector("#" + id)
        if (input == null) { return 0 }
        var v: number = input.valueAsNumber
        if (v == NaN) { return 0 }
        return v
    }
    function GetBoolean(id: string): boolean {
        var input: HTMLInputElement | null = document.querySelector("#" + id)
        if (input == null) { return false }
        return input.checked
    }

    var ex: number, coins: number, workdays: number, doCoins: boolean
    var doShare: boolean, getcoins: number, sends: number, doLive: boolean

    ex = SetRange(GetNumber("ex"), 100)
    coins = SetRange(GetNumber("coins"))
    doShare = GetBoolean("doShare")
    doCoins = GetBoolean("doCoins")
    getcoins = SetRange(GetNumber("videocoins"))
    if (getcoins > 0) {
        getcoins *= SetRange(GetNumber("videos"))
    }
    sends = SetRange(GetNumber("sends"))
    doLive = GetBoolean("doLive")
    workdays = SetRange(GetNumber("days"), 1, 31)

    //输出结果的字符串
    var out: string = "根据以上你所填的，只要你从明天起：\n"
    out += "热爱B站，不做违规被封的事，不乱消费硬币\n"
    out += "并且，每个月有 " + workdays.toString() + " 天登录B站，观看视频，\n"
    if (doCoins) {
        out += "投5个硬币给别人的作品，\n"
    }
    if (doShare) {
        out += "还要记得用手机APP分享视频给别人看，\n"
    }
    if (doLive) {
        out += "去B站直播开箱并把银瓜子拿来换一个硬币，\n"
    }
    if (sends > 0) {
        out += "而且每月坚持花点B币充电或者承包番剧，\n"
    }
    if (getcoins > 0) {
        out += "坚持投稿视频并获得一定数量硬币，\n"
    }
    out += "我推算出的你的号的未来情况：\n\n"

    var time: Date = new Date
    function GetTime(): string {    //把日期变成中文的字符串
        return time.getFullYear().toString() + "年" + (time.getMonth() + 1).toString() + "月" + time.getDate().toString() + "日"
    }
    var outofCoins: boolean = (coins < 1)

    var levels: number[] = [0, 200, 1500, 4500, 10800, 28800] //目前的等级制度
    var maxlevels: number = levels.length   //最高等级
    var passed: number = 1, i: number
    for (i = maxlevels; i > 1; i -= 1) {
        if (ex > levels[i - 1]) {
            passed = i
            break
        }
    }
    if (passed == maxlevels) {
        out = "你已经满级了，没什么好算的了。"
    }
    else {
        out += "今天，你是 " + passed.toString() + "级。\n"
        var donedays: number = 0
        //进行推算
        while (true) {
            time.setDate(time.getDate() + 1)
            if (time.getDate() == 1) {   //每月第一天进行结算上个月的投稿收入、充电收入
                coins += getcoins / 10
                ex += getcoins
                ex += sends
                donedays = 0
                coins = Math.round(coins)
            }
            for (i = 100; i < 1001; i += 100) {
                var y: number = time.getFullYear()
                var y2: number = 2009 + i
                if (y < y2) { break }
                if (y == y2) {
                    if (time.getMonth() == 5) {
                        if (time.getDate() == 26) {
                            out += GetTime() + "，B站建站 " + i.toString() + " 年。\n"
                        }
                    }
                }
            }
            donedays += 1
            if (donedays <= workdays) { //在你还记得起来的日子里才加经验
                coins += 1
                ex += 10 //登录，看视频
                if (doShare) {
                    ex += 5  //分享
                }
                if (doLive) {
                    coins += 1 //在直播换硬币
                }
                if (doCoins) { //投币5个
                    for (i = 1; i <= 5; i += 1) {
                        coins -= 1
                        ex += 10
                        if (coins < 1) {
                            if (!outofCoins) {
                                outofCoins = true
                                out += GetTime() + "，你的硬币花完了。\n"
                            }
                            break
                        }
                    }
                }
                var finish: boolean = false
                for (i = maxlevels; i > passed; i -= 1) {
                    if (ex > levels[i - 1]) {
                        out += GetTime() + "，你到达了 " + i.toString() + " 级，这时你还有 " + coins.toString() + " 个硬币。\n"
                        passed = i
                        if (i == maxlevels) {
                            finish = true
                            break
                        }
                    }
                }
                if (finish) {
                    break
                }
            }
        }
        out += "\n以上结果仅供参考，可能会因为你的行为、B站活动、B站修改规则等情况而变化。"
    }

    // 输出结果
    var outPlace: HTMLElement | null = document.querySelector("#out")
    if (outPlace == null) { return false }
    outPlace.innerText = out
}
