/* 1.AOP介绍
简介
AOP （面向切面编程），缩写为Aspect Oriented Programming，意为：面向切面编程，通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。AOP是OOP的延续，是软件开发中的一个热点，也是JAVA 中Spring框架的一个重要内容，是函数式编程的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

主要功能
日志记录
性能统计
安全控制
事务处理
异常处理等等。
主要意图
将日志记录，性能统计，安全控制，事务处理，异常处理等代码从业务逻辑代码中划分出来，通过对这些行为的分离，我们希望可以将它们独立到非指导业务逻辑的方法中，进而改变这些行为的时候不影响业务逻辑的代码。

注：请慎重的在JS的中使用AOP！因为部分JS的方法是异步的。
必要时使用ES7中的async/await/Promise，以保证代码的顺序执行。
*/

// 1. before（前置通知）

Function.prototype._before = function(func){
    var __self = this;
    return function(){
        func.apply(__self, arguments);
        return __self.apply(__self, arguments);
    }
}

// 代码
function a(){
    console.log('I\'m a');
}

a = a._before(function(){
    console.log('before');
});

a();
// 结果：
// before
// I'm a


// 2. after（后置通知）
Function.prototype._after = function(func){
    var __self = this;
    return function(){
        var ret = __self.apply(__self, arguments);
        func.apply(__self, arguments);
        return ret;
    }
}

// 代码
function b(){
    console.log('I\'m b');
}

b = b._after(function(){
    console.log('after');
});

b();
// 结果：
// I'm b
// after


// 3. around（环绕通知）

function JoinPoint(obj, args){
    var isapply = false;                       // 判断是否执行过目标函数
    var result = null;                         // 保存目标函数的执行结果

    this.source = obj;                         // 目标函数对象
    this.args = args;                          // 目标函数对象传入的参数

    /**
     * 目标函数的代理执行函数
     * 如果被调用过，不能重复调用
     * @return {object} 目标函数的返回结果
     */
    this.invoke = function(thiz){              
        if(isapply){ return; }
        isapply = true;
        result = this.source.apply(thiz || this.source, this.args);
        return result;
    };

    // 获取目标函数执行结果
    this.getResult = function(){
        return result;
    }
}

/**
 * 方法环绕通知
 * 原方法的执行需在环绕通知方法中执行
 * @param func {Function} 环绕通知的函数
 *     程序会往func中传入一个JoinPoint(切入点)对象, 在适当的时机
 *     执行JoinPoint对象的invoke函数，调用目标函数
 * 
 * @return {Function} 切入环绕通知后的函数，
 */
Function.prototype._around = function(func){
    var __self = this;
    return function(){
        var args = [new JoinPoint(__self, arguments)];
        return func.apply(this, args);
    }
}

// 代码

var isAdmin = true;

function c(){
    console.log('show user list');
}

c = c._around(function(joinpoint){
    if(isAdmin){    // 满足条件时，执行目标函数
        console.log('is admin');
        joinpoint.invoke(this);
    }
});

c();
// 结果
// if isAdmin == true
//     is admin
//     show user list
// if isAdmin == false
//     
