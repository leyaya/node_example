// 手机业务
const express =require('express')
const path=require('path')
const router=module.exports=express.Router()
const Article=require('../models/article.js')

router.prefix="/home"

/*
 * 渲染手机页面
 * GET /home/render
 * */
// router.get('/render',function (req,res,next) {
//
//     Article.find((err,data)=>{
//         if(err){
//             res.render('error',{err:err})
//         }
//         else{
//             // res.locals=root=this在模板引擎里面是相同
//             res.locals.articleList=data
//             res.render('home')
//         }
//     })
//
// })


/*
 * 渲染博客列表分页路由
 * GET /home/render/1
 * GET /home/render
 * */
router.get('/render/:currentPage?',function (req,res,next) {
    // 这是网模板页面传递参数，当前页
    res.locals.currentPage=req.params.currentPage?parseInt(req.params.currentPage):1

    // 默认每页要显示的条数
    const pageSize=parseInt(req.app.locals.options.pageSize)

    // 查询总条数
    Article.findCount((err,totalCount)=>{
        if(totalCount<=0){
            res.send("数据库没有数据")
        }
        // 数据总页数
        res.locals.totalPage=Math.ceil(totalCount/pageSize)

        // 查询分页数据
        Article.findLimit(res.locals.currentPage,pageSize,(err,data)=>{
            if(err){
                res.render('error',{err:err})
            }
            else{
                // res.locals=root=this在模板引擎里面是相同
                res.locals.articleList=data
                res.render('home')
            }
        })

    })
})




/*
* 卖手机业务
* GET /home/sell
* */
router.get('/sell',function (req,res,next) {
    res.send('卖手机')
})

/*
 * 修手机业务
 * GET /home/repair
 * */
router.get('/repair',function (req,res,next) {
    res.send('修手机')
})

/*
 * 贴膜业务
 * GET /home/tie
 * */
router.get('/tie',function (req,res,next) {
    res.send('贴膜')
})