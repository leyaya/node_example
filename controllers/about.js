// 电脑业务
const express =require('express')
const router=module.exports=express.Router()

router.prefix="/about"

/*
 * 渲染电脑页面
 * GET /about/render
 * */
router.get('/render',function (req,res,next) {
    res.render('about')
})


/*
 * 卖电脑业务
 * GET /about/sell
 * */
router.get('/sell',function (req,res,next) {
    res.send('卖电脑')
})

/*
 * 修电脑业务
 * GET /about/repair
 * */
router.get('/repair',function (req,res,next) {
    res.send('修电脑')
})

/*
 * 贴膜业务
 * GET /about/tie
 * */
router.get('/tie',function (req,res,next) {
    res.send('贴膜')
})



function Foo(){
    this.a=function(){
        console.log('foo的实例方法a')
    }

    Foo.c=function () {
        console.log('foo的静态方法')
    }
}

Foo.b=function () {
    console.log('foo的静态方法')
}

const foo1=new Foo()

