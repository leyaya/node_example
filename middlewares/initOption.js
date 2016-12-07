const Option =require('../models/option.js')
module.exports = () => {
    // 程序一开始时执行 （只是执行一次）
    let options = {} // 程序一开始获取所有配置信息
    Option.find((err, rows) => {
        // 先执行
        rows.map(i => { options[i.key] = i.value })
        // options={
        //     pageSize:'10',
        //     sitename:'我的博客'
        // }
    })

    return (req, res, next) => {
        // 每一次请求执行
        // app.locals 全局共享（与请求无关）
        res.app.locals.options = options
        // res.locals.options = options
        next() // 下面的中间件接着执行
    }
}