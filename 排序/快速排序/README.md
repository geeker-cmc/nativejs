### 快速排序
>利用递归，先找到中间的数字，将中间数字从原数组中抽出，定义两个数组中间变量，遍历原数组，比较原数组和中间数字，比中间数字小的放在一个变量数组里面，大的放在另一个数组里面，同样的方法对这连个中间变量数组也执行。

```
 function quertSort(arr){
     if(arr.length<=1) return arr;//递归出口，不然会死循环
    let harf = Math.floor(arr.length/2),//向下取中间数的下标
        left = [],//放比中间数小的容器
        right = [],//放比中间数大的容器
        temp = arr.splice(harf,1)[0];//取出的中间数
        arr.forEach(function(item,index){
            if(item<temp){
                left.push(item)
            }else{
                right.push(item)
            }
            })//遍历数组与中间量比较
      return arguments.callee(left).concat([temp],arguments.callee(right));//返回左右两个递归函数和中间变量的合并
 }
```

#### callee和caller的区别
>callee是arguments对象的属性，指向当前arguments当前运行的函数，caller是函数对象的属性，指向运行此函数栈中的外部函数。

```
        //caller
        funciton a (){
            console.log(a.caller)
        }
        function b (){
            a()
        }
        b();//会输出 function b (){  a() } b函数的声明

        //callee
        function c(){
            console.log(arguemnts.callee);
        }
        c();//会输出function c(){console.log(arguemnts.callee)}
```
