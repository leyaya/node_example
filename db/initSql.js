const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'blog'
});

// 打开数据库请求
connection.connect();

const data=require('./article.json');
data.forEach(function (item) {
    // 循环数据并插入到数据
    // 重要：不能在sql语句中拼接字符串，因为安全问题，sql注入
    // ??代表列的值，？代码value的值
    // sql语句在不同的数据库中有时候会有一些小的语法变化，在sqlserver中用@代表占位符，mysql中？占位符
    connection.query('insert into article(slug, title, excerpt, content, type, status, comment_status, comment_count, view_count, created, modified, user_id, parent_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?)', [item.slug, item.title, item.excerpt, item.content, item.type, item.status, item.comment_status, item.comment_count, item.view_count, item.created, item.modified, item.user_id, item.parent_id],function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    });

})

// 关闭数据库请求
connection.end();

