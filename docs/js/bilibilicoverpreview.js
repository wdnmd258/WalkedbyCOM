"use strict";
var uploadCover = new Image();
uploadCover.onload = RefreshPreview;
var appbg = new Image();
appbg.src = "/images/bilibili_cover_preview_images/app.png";
var appsubbg = new Image();
appsubbg.src = "/images/bilibili_cover_preview_images/appsub.png";
var websubbg = new Image();
websubbg.src = "/images/bilibili_cover_preview_images/websub.png";
var websub2bg = new Image();
websub2bg.src = "/images/bilibili_cover_preview_images/websub2.png";
var webspacebg = new Image();
webspacebg.src = "/images/bilibili_cover_preview_images/webspace.png";
(function () {
    var h = document.getElementById("uploadimg");
    if (h == null) {
        throw "uploadimg is null";
    }
    var input = h;
    input.onchange = function () {
        if (input.files != null) {
            var uploadimg = input.files[0];
            var reader = new FileReader;
            reader.readAsDataURL(uploadimg);
            reader.onload = function (ev) {
                if (this.result) {
                    uploadCover.src = this.result.toString();
                }
            };
        }
    };
    document.getElementsByName("bgtype").forEach(function (e) {
        var ie = e;
        ie.onclick = RefreshPreview;
    });
})();
function RefreshPreview() {
    if (uploadCover.src.length < 1) {
        return;
    }
    var h = document.getElementById("drawing");
    if (h == null) {
        throw "canvas drawing is null";
    }
    var canvas = h;
    var ctx = canvas.getContext("2d");
    if (ctx == null) {
        throw "canvas 2d context is null";
    }
    canvas.height = canvas.height;
    var bgtype = "app";
    document.getElementsByName("bgtype").forEach(function (e) {
        var ie = e;
        if (ie.checked) {
            bgtype = ie.value;
        }
    });
    switch (bgtype) {
        case "app":
            ctx.drawImage(uploadCover, 10, 90, 183, 115);
            ctx.drawImage(appbg, 0, 0);
            break;
        case "appsub":
            ctx.drawImage(uploadCover, 14, 183, 370, 231);
            ctx.drawImage(appsubbg, 0, 0);
            break;
        case "websub":
            ctx.drawImage(uploadCover, 247, 201, 64, 40);
            ctx.drawImage(websubbg, 0, 0);
            break;
        case "websub2":
            ctx.drawImage(uploadCover, 98, 115, 207, 130);
            ctx.drawImage(websub2bg, 0, 0);
            break;
        case "webspace":
            ctx.drawImage(uploadCover, 229, 123, 190, 120);
            ctx.drawImage(webspacebg, 0, 0);
            break;
        default:
            throw "no such bgtype:" + bgtype;
            break;
    }
}
