### 发布订阅实现模块化

~~~
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>todoList</title>
    <style>
        *{
            padding:0;
            margin:0;
        }
        html,body{
            width:100%;
            height:100%;
            font-size:12px;
        }
        header{
            background-color:#ccc;
            text-align: center;
            height:4rem;
            line-height:4rem;
        }
        footer{
            height:4rem;
            background-color:#ccc;
            margin-top:1rem;
            text-align: center;
            font-size: 2rem;
        }
        article>div{
            margin:5px 0;
            background-color:#ccc;
            font-size:2rem;
        }
        #clearAll{
            display: none;
        }
    </style>
</head>
<body>
    <header>
        <input type="text" id="searchValue" placeholder="搜索">
        <input type="checkbox" id="checkAll">全选
    </header>
    <section>
        <article>
            
        </article>
    </section>
    <footer>
        <label id="num">0条数据</label>
        <button id="clearAll">删除</button>
    </footer>
</body>
<script src="ps.js"></script>
<script>
    var headerScope={
            init:function(seletor){
                this.ele=document.querySelector(seletor);
                var self=this;
                //输入框的onkeyup事件后，mainScope,footerScope发生的变化。将值存放到localStorage。
                this.ele.querySelector("#searchValue").onkeyup=function(e){
                    if(e.keyCode==13&&this.value){
                        var data={
                            id:"id_"+Date.now(),
                            content:this.value
                        }
                        // mainScope.createItem(data);
                        ps.trigger("createItem",data);
                        this.value="";
                        localStorage.setItem(data.id,JSON.stringify(data));
                        // footerScope.changeNum(localStorage.length);
                        ps.trigger("changeNum",localStorage.length);
                    }
                }
                //全选按钮发生变化时对应的变化
                this.ele.querySelector("#checkAll").onchange=function(){
                    mainScope.checkAll(this.checked);
                    footerScope.showBtn(this.checked);
                }
                ps.on("changeCheck",function(){
                    self.changeCheck();
                })

            },
            changeCheck:function(){
                this.ele.querySelector("#checkAll").checked=false
            }
    }
    var mainScope={
        init:function(selector){
            this.ele=document.querySelector(selector);
            var self=this;
            this.ele.onclick=function(e){
                
                if(e.target.className=="removeItem"){
                    // self.removeItem(e.target.parentNode);
                    ps.trigger("removeItem",e.target.parentNode);
                    localStorage.removeItem(e.target.parentNode.id);
                }

            }
            ps.on("createItem",function(data){
                self.createItem(data);
            })
            ps.on("removeItem",function(data){
                self.removeItem(data);
            })
        },
        clearAll:function(){
            this.ele.innerHTML="";
        },
        checkAll:function(check){
            Array.prototype.forEach.call(this.ele.querySelectorAll("div input"),function(item){
                item.checked=check;
            })
        },
        removeItem:function(ele){
            ele.remove();
            localStorage.removeItem(ele.id);
            footerScope.changeNum(localStorage.length);
        },
        createItem:function(data){
            var div=document.createElement("div"),
                btn=document.createElement("input"),
                p=document.createElement("p"),
                a=document.createElement("a");
            div.id=data.id;
            btn.type="checkbox";
            div.style.backgroundColor="pink";
            p.style.display="inline-block";
            a.innerHTML="X";
            a.className="removeItem";
            a.style.float="right";
            p.innerHTML=data.content;
            div.appendChild(btn);
            div.appendChild(p);
            div.appendChild(a);
            this.ele.appendChild(div);
        },
        createAll:function(arr){
            var self=this;
            arr.forEach(function(item){
                self.createItem(item);
            })
        }
    }
    var footerScope={
        init:function(selector){
            var self=this;
            this.ele=document.querySelector("footer");
            this.ele.querySelector("#clearAll").onclick=function(){
                mainScope.clearAll();
                localStorage.clear();
                // headerScope.changeCheck();
                ps.trigger("changeCheck")
                // self.changeNum(localStorage.length);
                ps.trigger("changeNum",localStorage.length);
                // self.showBtn(false);
                ps.trigger("showBtn",false);
            }
          ps.on("changeNum",function(data){
            self.changeNum(data);
          })
          ps.on("showBtn",function(data){
            self.showBtn(data);
          })
        },
        showBtn:function(check){
            this.ele.querySelector("#clearAll").style.display=check?"inline-block":"none";
        },
        changeNum:function(len){
            this.ele.querySelector("#num").innerHTML=len+"条数据";
        }
    }
    window.onload=function(){
        headerScope.init("header");
        mainScope.init("article");
        footerScope.init("footer");
        var arr=[];
        for(var i=0,len=localStorage.length;i<len;i++){
            var key=localStorage.key(i);
            var obj=JSON.parse(localStorage.getItem(key));
            arr.push(obj);
        }
        mainScope.createAll(arr);
        footerScope.changeNum(localStorage.length);
    }
</script>
</html>
~~~

##### todolist分成三个部分
* 头部部分，用户输入部分，和是否全选；
* 中间部分，展示用户输出内容的部分，数据前面的删除勾选框，还有一个删除按钮；
* 底下部分，底下部分是展示一共多少条数据，还有一个全删按钮。

>各控件注册各自的事件，和发布别人要响应的事件。这样就达到松耦合的目的。

##### 头部部分
*订阅的事件*

1. changeCheck 底下部分的全删按钮点击后要改变自身全选按钮状态

*发布的事件*

1. createItem  当输入内容点击enter键后，中间部分要生成一条新的数据。
2. changeNum   当输入内容点击enter键后，底下部分要改变数据条数

##### 中间部分
*订阅的事件*

1. removeItem 底部全删和自身删除的事件都要订阅
2. createItem 当用户在头部输出信息后enter后，要响应

*发布的事件*

1. removeItem 点击自身的删除按钮后发布删除事件

#### 底下部分
*订阅的事件*

1. changeNum 响应删除和全删
2. showbtn 响应自身的全删

*发布的事件*

1. changeCheck 当自身的全闪按钮点击后，中间要删除所有数据，头部要改变全选状态；
2. changeNum  全删按钮点击后，要改变自身数据条数的数据；
3. showbtn 全删按钮点击后，全删按钮隐藏。

 ###### ps.js的分析

 ```
 (function(root){
    //应用自运行函数形成闭包，防止变量被污染
    var events={};//所有的事件都放在events来管理
    //将ps暴露给window
    var ps=root.ps={
        on:function(etype,fn){
            events[etype]||(events[etype]=[]);//判断是否有改事件，没有生成一个空数组
            //将事件类型和，要响应的操作（回调函数）,放到该事件中
            events[etype].push({
                etype:etype,
                callback:fn
            })
        },
        trigger:function(etype,data){
            events[etype]||(events[etype]=[]);
            //触发所有的这个类型的事件，遍历数组触发
            events[etype].forEach(function(item){
                events[etype]&&item.callback(data);
            })
        },
        off:function(etype){
            events[etype]=[]
        }
    }
})(this)
 ```

