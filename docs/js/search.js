function SetSearchURL() {
    var a = document.getElementById('link1')
    var word = document.getElementById('searchContent').value
    a.href = "https://cn.bing.com/search?q=" + word + "+site%3Awalkedby.com"
    a = document.getElementById('link2')
    a.href ="https://www.google.com/search?q=" + word + "+site%3Awalkedby.com"
}
SetSearchURL()
