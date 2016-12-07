// 总公司
const express = require('express');
const path=require('path');
// 路径匹配插件
const glob=require('glob');
// 网页压缩插件
const compression = require('compression')

// 创建app实例
const app = express();


// 加载第三方中间件,不能放在模板引擎下面
app.use(compression())


// 设置express的模板引擎
app.set('views','./views');
app.set('view engine', 'xtpl');

// 设置静态资源的位置assets，public，www,static
app.use(express.static(path.join(__dirname, 'public')))


// 加载自定义中间件读取全局配置信息，而且只读取一次
const initOption=require('./middlewares/initOption.js')
app.use(initOption())


// 自动载入业务功能模块路由
glob.sync('./controllers/*.js').forEach(item => {
    const temp = require(item)
    app.use(temp.prefix, temp)
})

// version3
// 使用业务功能模块路由
// 我们可以用glob和gulp中的一样
// glob是异步的，不过我们这里是初始化，所以推荐大家用sync同步方法
// const controllers = glob.sync('./controllers/*.js')
// controllers.forEach(item => {
//     // item => './controllers/mobile.js'
//     const temp = require(item)
//     const prefix = path.basename(item, '.js') // => mobile
//     app.use('/' + prefix, temp)
// })

// version2
// const controllers = ['mobile','computer']
// controllers.forEach(item => {
//     const temp = require('./controller/' + item+'.js')
//     app.use('/' + item, temp)
// })

// version1
// // 手机业务
// const mobileController = require('./controller/mobile.js');
// app.use('/mobile', mobileController);
// // 电脑业务
// const computerController = require('./controller/computer.js');
// app.use('/computer', computerController);
// // 游戏
// const computerController = require('./controller/computer.js');
// app.use('/computer', computerController);
// // 服装业务
// const computerController = require('./controller/computer.js');
// app.use('/computer', computerController);
// // 餐饮业务
// const computerController = require('./controller/computer.js');
// app.use('/computer', computerController);

// 302重定向和404处理
app.use((req,res,next)=>{
    // 302重定向
    if(req.path=='/'){
        res.redirect('/home/render');
    }
    // 404 not found
    res.render('notFound')


})

// 启动server
const server = app.listen(3001, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
