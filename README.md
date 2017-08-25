# 平常练习做的总结

### 排序

1. [冒泡排序](https://github.com/geeker-cmc/nativejs/tree/1/%E6%8E%92%E5%BA%8F/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F/README.md)
2. [希尔排序]()
3. [快速排序](https://github.com/geeker-cmc/nativejs/tree/1/%E6%8E%92%E5%BA%8F/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F/README.md)
4. [插入排序]()
5. [选择排序]()

***

### [发布订阅模式todo案例](https://github.com/geeker-cmc/nativejs/tree/1/js%E7%9A%84%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F%E5%AE%9E%E7%8E%B0todo/README.md)
>发布订阅模式，降低模块间的耦合。


### Object的所有方法

> 学习原生构造器里面的方法，有一个方法可以查看构造器的静态方法和原型上的方法

```
   Object.getOwnPropertyNames(Object.prototype);

   //输出["__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "constructor", "toString", "toLocaleString", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "__proto__"]  这是Object原型上面的方法或属性

   Object.getOwnPropertyNames(Object)

   //输出 ["length", "name", "arguments", "caller", "prototype", "assign", "create", "getOwnPropertyDescriptor", "getOwnPropertyNames", "getOwnPropertySymbols", "is", "preventExtensions", "seal", "defineProperties", "defineProperty", "freeze", "getPrototypeOf", "isExtensible", "isFrozen", "isSealed", "keys", "setPrototypeOf"] 这是Object上面的方法或属性
```

下面我们来看这些方法的用法

首先是原型上面的方法







