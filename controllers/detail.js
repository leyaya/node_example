// 电脑业务
const express =require('express')
const router=module.exports=express.Router()
const Article=require('../models/article.js')

router.prefix="/detail"

/*
 * 渲染电脑页面
 * GET /detail/render/123
 * */
router.get('/render/:slug',function (req,res,next) {
    Article.findBySlug(req.params.slug,(err,data)=>{
        if(err){
            res.send('查询数据出错了');
        }
        if(!data){
            res.send('没有查询到数据');
        }

        res.locals.detailData=data;
        res.render('detail')

    })
})


/*
 * 卖电脑业务
 * GET /detail/sell
 * */
router.get('/sell',function (req,res,next) {
    res.send('卖电脑')
})

/*
 * 修电脑业务
 * GET /detail/repair
 * */
router.get('/repair',function (req,res,next) {
    res.send('修电脑')
})

/*
 * 贴膜业务
 * GET /detail/tie
 * */
router.get('/tie',function (req,res,next) {
    res.send('贴膜')
})