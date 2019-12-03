---
title: Steam 好友检查器
date: 2019-08-17 20:45:02
tags:
---
这是我自己编写的第一个猴子脚本，希望大家喜欢，虽然我这个设计，不敢保证有人会喜欢这样的东西。

Greasy Fork 链接： https://greasyfork.org/zh-CN/scripts/388807-steam-friends-checker  
Github 源码： https://github.com/gordonwalkedby/SteamFriendsChecker  
SteamCN 帖子： https://steamcn.com/t514390-1-1  
（是的，我是个拿 TypeScript 写网页脚本的奇葩）  

# 工作原理：
每次访问 Steam 社区网站，脚本都会后台记录一次你的好友列表，
如果发现有上一次出现的好友这一次没出现，就判断为有好友少掉，进行登记并提醒。

# 效果：
当平时逛着逛着，后台发现有好友删除的时候：  
![](https://s2.ax1x.com/2019/08/17/mubWGR.png)    
![](https://s2.ax1x.com/2019/08/18/mMnsAS.png)  
当有新的好友（绿色）或新的好友请求（蓝色）时，也会提醒：
![](https://s2.ax1x.com/2019/08/21/mNevFA.png)  
点一下那个黄色方块会跳到自己的好友管理页面：  
好友删除记录就在好友管理页面里，当你访问过这个页面，黄色方块就会消失（标记为已读）：  
![](https://s2.ax1x.com/2019/08/21/mNmskd.md.png)  
插件的语言会根据你steam网页的语言进行变化，目前就英文、简体中文、繁体中文。

# 缺点：
 - 你必须开着脚本在浏览器访问 Steam 网站才能对好友进行记录，不然没法记录。
 - 记录是在本地的，无法进行云端同步，也没法检查过去的好友记录，但是你可以导出你的全部油猴脚本，换个浏览器导入，脚本的数据还在。
 - 不论是你主动删别人还是别人主动删你，都算删除。

