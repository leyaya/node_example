const db = require('../db/mysqlConnection.js')

class Article {
    constructor(id, slug, title, excerpt, content, type, status, comment_status, comment_count, view_count, created, modified, user_id, parent_id,image) {
        this.id = id
        this.slug = slug
        this.title = title
        this.excerpt = excerpt
        this.content = content
        this.type = type
        this.status = status
        this.comment_status = comment_status
        this.comment_count = comment_count
        this.view_count = view_count
        this.created = created
        this.modified = modified
        this.user_id = user_id
        this.parent_id = parent_id
        this.image = image
    }

    // 实例方法
    say() {
    }

    // 静态方法
    // 理解结构赋值
    // var item={
    //     id:1,
    //     slug:"werer",
    //     excerpt:"343"
    // }
    //
    // var {id,slgu,excerpt}=item
    static create({id, slug, title, excerpt, content, type, status, comment_status, comment_count, view_count, created, modified, user_id, parent_id,image}) {
        return new Article(id, slug, title, excerpt, content, type, status, comment_status, comment_count, view_count, created, modified, user_id, parent_id,image)
    }

    // 保存博客方法
    // 和这个实体密切相关的一些操作要写成实例方法
    save(callback) {
        // version7 分页查询数据
        console.log(this)
        db.query('insert into article set ?',this,function (err, rows, fields) {
            if (err){
                callback(err, null)
            }
            callback(null, rows)
        })
    }

    // 获取数据库博客总条数
    static findCount(callback) {
        // version7 分页查询数据
        db.query('select count(*) as totalCount from article',function (err, rows, fields) {
            if (err){
                callback(err, null)
            }
            callback(null, rows[0].totalCount)
        })
    }

    // 通过slug获取博客详细数据
    static findBySlug(slug,callback) {
        // version7 分页查询数据
        db.query('select * from article where slug=?',[slug],function (err, rows, fields) {
            if (err){
                callback(err, null)
            }
            callback(null, rows[0])
        })
    }


    // 查询博客分页数据
    static findLimit(currentPage,pageSize,callback) {

        // version7 分页查询数据
        db.query('select slug,title,excerpt,created from article order by id  desc limit ?,?', [(currentPage-1)*pageSize,pageSize],function (err, rows, fields) {
            if (err){
                callback(err, null)
            }
            callback(null, rows.map(Article.create))
        })



        // version6 获取真实数据
        // sql语句中不要写*而是需要什么字段就查询什么字段
        // db.query('select slug,title,excerpt,created from article', function (err, rows, fields) {
        //     if (err){
        //         callback(err, null)
        //     }
        //     callback(null, rows.map(Article.create))
        // })


        // const articleList=require('./article.json')
        // 伪代码articleList=[Article,Article,Article,Article,Article]

        // version5 100
        // callback(null,articleList.map(Article.create))


        // version4 98
        // articleList.map(function (item) {
        //     Article.create(item)
        // })
        //
        // const newArticleList=articleList.map(Article.create)
        // callback(null,newArticleList)


        // version3 95
        // const newArticleList=articleList.map((item)=>Article.create(item))
        // callback(null,newArticleList)


        // version2 90
        // const newArticleList=articleList.map((item)=>new Article(item.id, item.slug, item.title, item.excerpt, item.content, item.type, item.status, item.comment_status, item.comment_count, item.view_count, item.created, item.modified, item.user_id, item.parent_id))
        // callback(null,newArticleList)

        // version1 80
        // const newArticleList=[]
        // articleList.forEach(function (item) {
        //     newArticleList.push(new Article(item.id, item.slug, item.title, item.excerpt, item.content, item.type, item.status, item.comment_status, item.comment_count, item.view_count, item.created, item.modified, item.user_id, item.parent_id))
        // })
        // callback(null,newArticleList)
    }
}

module.exports = Article


// // 用ES6的class模拟模型
// class Article {
//     constructor (id, slug, title) {
//         this.id = id
//         this.slug = slug
//         this.title = title
//     }
//     // 实例方法
//     say(){
//
//     }
//
//     // 静态方法
//     static eat(){
//
//     }
// }
//
// // 用构造函数去模拟模型
// function article(id,slug,title) {
//     this.id = id
//     this.slug = slug
//     this.title = title
// }
// // 实例方法
// article.prototype.say=function () {
//
// }
// // 静态方法
// article.eat=function () {
//
// }