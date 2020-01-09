---
title: 电话流量套餐筛选排列工具
date: 2020-01-08 20:12:01
tags: [我的软件]
---
这个工具是为了根据电话的使用情况去选出最适合的电话套餐用的。  
这些套餐数据都是自己从各大网站搜集来的，没有直接采用他人整理的数据大全（其实是懒得去问授权）。  
只收录了一些互联网套餐，地区套餐、校园套餐、物联网套餐等都没收录，不好查有哪些，数量也不少。  
这是免费开源程序，如果你喜欢用这个工具，可以[赞助](https://walkedby.com/donateme/)我一下w。      
绝大多数套餐都会对大量使用流量进行限速，所以计算大流量时不一定便宜的就是最好的，任何的购卡行为之前都应该做好充足的查询与检查，确定卡就是自己想要的那种卡。  

<div>
    每个月，你都需要：（没有请写0，一切输入都最大为9999，最小为0）<br>
    打电话：<input id="talkCount" type="number" value="10">分钟，<br>
    发短信：<input id="textCount" type="number" value="1">条，<br>
    使用流量：<input id="dataCount" type="number" value="1.5">GB，<br>
    一个月中，要用流量的日子有：<input id="useDataDays" type="number" value="30">天（最多30天）。<br><br>
    你的手机支持的运营商：
    <input id="check1" type="checkbox" checked="checked">中国电信
    <input id="check2" type="checkbox" checked="checked">中国移动
    <input id="check3" type="checkbox" checked="checked">中国联通
    <br><br>
    <input id="checkVirtual" type="checkbox" checked="checked">可以是虚拟运营商<br>
    <input id="checkFreeDataApps" type="checkbox">只看有免流APP的<br>
    <input id="checkShowNotOnSell" type="checkbox">列出已经无法新办的卡<br>
    <input id="checkExpensive" type="checkbox">先看贵的，不看便宜的<br>
    <br>
    <button onclick="SortUsersPlan();DisplayPlans(5);">选出5个最优套餐</button>
    <button onclick="SortUsersPlan();DisplayPlans(99999);">列出全部套餐</button><br>
    <span id="planscount"></span>
    <br><br>
    <div id="displayplans"></div>
    <script src="/js/chooseyourphoneplan.min.js"></script>
</div>

[本工具的源码](https://github.com/gordonwalkedby/ChooseYourPhonePlan)  
[如果有错误或者有新套餐或者某个套餐不卖了，可以发个issue告诉我](https://github.com/gordonwalkedby/ChooseYourPhonePlan/issues)  
[请我喝可乐](https://walkedby.com/donateme/)  
