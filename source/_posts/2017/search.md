---
title: 搜索本站内容
date: 2017-02-23 21:37:50
tags: 网站技术
---
<script>function SetSearchURL() {
    var a = document.getElementById('link1')
    var word = document.getElementById('searchContent').value
    a.href = "https://cn.bing.com/search?q=" + word + "+site%3Awalkedby.com"
    a = document.getElementById('link2')
    a.href ="https://www.google.com/search?q=" + word + "+site%3Awalkedby.com"
}</script>

<br>
<h2>
输入关键词：<input id='searchContent' type='text' style='font-size:15px;' maxlength=40 onchange='SetSearchURL();'>
<br><br>
<a id='link1' target='_blank'>国内搜索（必应）</a>
<br>
<a id='link2' target='_blank'>国外搜索（谷歌）</a>
</h2>
目前在百度还是很难搜索到我的网站的页面的，但是搜狗可以，不过我不喜欢搜狗。  

<script>SetSearchURL()</script>
