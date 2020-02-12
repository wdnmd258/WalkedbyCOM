---
title: B站投稿封面效果预览工具
date: 2020-02-12 09:27:54
tags: [我的软件,视频创作]
---
本工具提供主要几种情况下B站投稿封面的效果预览。  
B站视频封面必须是 jpg 或 png 格式的图片，文件不大于 5MB，封面比例是 16:10 ，建议尺寸是 1146x717，最低尺寸是 960x600，恕不提供裁剪的功能。

<div>
    选择你的封面文件：<input type="file" accept="image/jpeg, image/jpg, image/png" id="uploadimg">
    <br>
    <input type="radio" name="bgtype" value="app" checked="checked">APP首页推荐
    <input type="radio" name="bgtype" value="appsub">APP订阅页面
    <input type="radio" name="bgtype" value="websub">网页动态
    <input type="radio" name="bgtype" value="websub2">网页动态2
    <input type="radio" name="bgtype" value="webspace">网页个人空间
    <br><br>
    <canvas id="drawing" width="600" height="576"></canvas>
    <script src="/js/bilibilicoverpreview.js"></script>
</div>

[源代码（Google Drive）](https://drive.google.com/file/d/1hb_8P_EOgaJ5GUalFbU-Wx6mdysQ4aPH/view)  
