---
title: 在 VB.NET 里进行文件拖入和拖出的方法   
date: 2018-01-06 
tags:  
---

写此文的实际目的：我自己会忘记，给我自己用的。（误）  
不得不说， Drag 真的是世界上最舒服的操作了，没什么比文件拽来拽去更省事的了。  
之前看了一些讲解这个方面的文章，然后觉得都神了，简单的东西都给他们说的这么复杂。（害我当初也学了老久）  
注意：我用的是 Visual Studio 2017。

----------

下面用例子先说明怎么拖入文件：  
假设我需要把一排的文件拖入到一个列表里。  
新增一个 ListBox 来放文件，我给起名叫 LB，然后把 AllowDrop 属性开成 True，这样才能让东西被拖进来。  
![](https://s1.ax1x.com/2018/01/06/pELw5t.png)  

然后在代码里新增需要两个事件，分别对应拖放操作的鼠标移动进来和鼠标松开（东西丢下）。  
鼠标移动进来就是 DragEnter 事件，这里需要设置的是他的拖放效果。
```VB
    Private Sub LB_DragEnter(sender As Object, e As DragEventArgs) Handles LB.DragEnter
        e.Effect = DragDropEffects.Link '使用 link 就能获得拖入的东西的位置（目录）
    End Sub
```
然后要设置他的东西丢下事件，也就是 DragDrop 事件。因为拖入的文件可能不止一个，所以需要把拖入的文件信息全部过一遍。  
```VB
    Private Sub LB_DragDrop(sender As Object, e As DragEventArgs) Handles LB.DragDrop
        For Each i As String In e.Data.GetData(DataFormats.FileDrop)  '你拽入的每个东西
            LB.Items.Add(i)	'把每个东西添加到列表里
        Next
    End Sub
```
如果你想过滤一些文件，只要对文件链接这个字符串进行过滤就行了，  
如果想一拖入就读取文件的信息的话，也和 DragDrop 写在一起就是了。  
实际效果：  
![](https://s1.ax1x.com/2018/01/06/pEXW90.gif)  

----------

下面再来一个例子说明怎么拖出文件：  
假设我需要把一个文本框里的信息直接拖出来变成 a.txt 。  
首先来一个文本框，依然需要 AllowDrop = True 。  
这里我用一个 RichTextBox ，起名叫 RR 好了。  
![](https://s1.ax1x.com/2018/01/06/pEjCEd.png)  
什么？没有 AllowDrop ，我也很好奇为什么 RichTextBox 没有这个属性，这个直接在代码里写成 True 就是了。  
![](https://s1.ax1x.com/2018/01/06/pEji4I.png)  
拖出和拖入不一样，拖入的本质是提取文件的位置为字符串，而拖出的本质是复制存在的文件到目的地，并不是让程序直接在目的地直接创造文件。  
我们怎么拖出呢？我们直接从文本框里拖吧！省事！  
给文本框加一个 MouseDown 事件，让鼠标按住的时候可以拖放。  
```VB
    Private Sub RR_MouseDown(sender As Object, e As MouseEventArgs) Handles RR.MouseDown
        '必须定义一个数组存储要复制的文件列表，这里就一个文件，所以为0
        Dim s(0) As String
        '中文只是我自己的函数罢了;w;别介意，看得懂就行，同样的功能你自己写就好了
        s(0) = 程序目录() + "a.txt"
        '把 RR 的文本写到程序目录下的 a.txt 文件中
        写(s(0), 回车规范(RR.Text))
        '下面就是开始拖放啦，需要一个新的 DataObject 物件，然后写入刚刚的 s 数组，以复制的形式拖放到外面。
        RR.DoDragDrop(New DataObject(DataFormats.FileDrop, s), DragDropEffects.Copy)
        '把生成的多余文件给删除了
        删除文件(s(0))
    End Sub
```
实际效果：  
![](https://s1.ax1x.com/2018/01/06/pExOCn.gif)  
当然，实际上是不鼓励你直接用一个文本框来拖拉的，因为那样的话你文本的选择也是个难题了。  

建议不要把拖入和拖出做在一起，要么加个去重的功能，否则你就等着看鼠标点一下自己拖一份复制给自己吧。   
![](https://s1.ax1x.com/2018/01/06/pV94iQ.gif)    
