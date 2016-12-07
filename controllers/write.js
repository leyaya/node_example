// 手机业务
const express =require('express')
const {join,basename}=require('path')
const router=module.exports=express.Router()
const Article=require('../models/article.js')
// 处理上传的表单数据，包括文件
const formidable = require('formidable')

router.prefix="/write"

/*
 * 渲染写博客页面
 * GET /home/render
 * */
router.get('/render',function (req,res,next) {
    res.render('write')
})

/*
 * 接受写的博客数据
 * POST /home/render
 * */
router.post('/publish',function (req,res,next) {

    // 1、接收数据
    const form = new formidable.IncomingForm();
    // 设置图片存储路径,存到静态服务器中
    form.uploadDir = join(__dirname,'../public/upload');
    // 保持默认文件名
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {

        // 2、参数合法化校验
         if(fields.title && fields.content && fields.comment_status){

             // 3、持久化操作（将数据存到硬盘）
             const article= Article.create({
                 slug:Math.ceil((Math.random()*800+178)).toString(),
                 title:fields.title,
                 excerpt:fields.content.slice(0,50),
                 content:fields.content,
                 type:'post',
                 status:'published',
                 comment_status:fields.comment_status,
                 comment_count:0,
                 view_count:0,
                 created:new Date(),
                 modified:new Date(),
                 user_id:0,
                 parent_id:0,
                 image:'/upload/'+basename(files.image.path)
             })
             article.save((err,rows)=>{
                 // 4、响应客户端
                 res.redirect('/home/render')
             })
         }else{
             res.send('参数不符合规范')
         }
    });
})

