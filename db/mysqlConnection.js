
// 数据库链接池
// 1、性能提升了，因为请求的时候不用重复的创建新的链接
// 2、不用手动的打开和关闭链接

var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'root',
    database:'blog'
});

// pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//
//     console.log('The solution is: ', rows[0].solution);
// });

// version1
// module.exports = {
//     query:function (sql，callback) {
//         pool.query(sql，callback)
//     },
//     pool:pool
// }


// version2
// module.exports = {
//     // 把公共的部分也就是一直打开连接的部分给抽取出来
//     query:function () {
//         // query可能传递的参数个数不确定
//         pool.query.apply(pool,arguments)
//     },
//     pool:pool
// }

// version3
module.exports = {
    query() {
        pool.query.apply(pool,arguments)
    },
    pool
}