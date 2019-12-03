---
title: .NET HttpListener 监听局域网其他设备HTTP请求的说明
date: 2018-11-10 16:30:29
tags:
---

我一直在想怎么在局域网内其他设备（手机、电脑）给自己的电脑传输HTTP请求，并且要用 .NET 的 [HttpListener](https://docs.microsoft.com/zh-cn/dotnet/api/system.net.httplistener?redirectedfrom=MSDN&view=netframework-4.7.2) 监听到。然后今天终于试出来了，而且和 Windows 防火墙有离不开的关系，我说我以前怎么怎么测试都不行呢。 

首先要开一个线程是肯定要的，然后大概是这样

```vb
Dim h As New HttpListener, bs() As Byte, s As String
h.AuthenticationSchemes = AuthenticationSchemes.Anonymous
Dim port As String = CStr(8900)
h.Prefixes.Add("http://localhost:" + port + "/")    '只对本机起作用
h.Prefixes.Add("http://192.168.1.10:" + port + "/") '可以手动获得本机IP然后作为符串填在这里
h.Prefixes.Add("http://*:" + port + "/")    '不管前面是什么，后面port对应就会监到
h.Prefixes.Add("http://+:" + port + "/")    '同上
h.Start()
Do While True
    Dim c As HttpListenerContext = h.GetContext
    Dim RQ As HttpListenerRequest = c.Request
    Dim RS As HttpListenerResponse = c.Response
    s = Now & vbCrLf & 随机.数字()  '随便写点东西发过去
    bs = 文字转字节(s)
    Dp(RQ.Url.ToString, RQ.UserAgent)
    RS.OutputStream.Write(bs, 0, bs.Length)
    RS.Close()
Loop
```

所以我们现在可以用这些链接访问我们的 HttpListener 了。

```
http://192.168.1.10:8989/
http://localhost:8989/
http://127.0.0.1:8989/
后两个链接只有本机可以访问
```

接下来，如果你开着 Windows 防火墙，那么基本上只有你自己这台电脑可以靠访问这个链接。  
怎么办呢？而且需要管理员权限才能实时创建监听。  
我们得管理员运行下面 CMD 指令：

```cmd
netsh http add urlacl url=http://localhost:8900/ user=Everyone
netsh http add urlacl url=http://+:8900/ user=Everyone
netsh http add urlacl url=http://*:8900/ user=Everyone
```

这里添加到系统保留URL之后，就可以免管理员权限监听了。不会返回：拒绝访问。  
然后新增防火墙规则：

```cmd
netsh advfirewall firewall Add rule name="over 8900" dir=in protocol=tcp localport=8900 action=allow
```



完成之后就可以在局域网内的其他设备里访问了：  
![](https://s1.ax1x.com/2018/11/10/iqCtxI.png)  

清理的指令：

```cmd
netsh http delete urlacl url=http://localhost:8900/
netsh http delete urlacl url=http://+:8900/
netsh http delete urlacl url=http://*:8900/
netsh advfirewall firewall delete rule name="over 8900"
```
