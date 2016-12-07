const db = require('../db/mysqlConnection.js')

class Option {
    constructor(id, key,value) {
        this.id = id,
        this.key = key,
        this.value = value
    }

    static create({id,key,value}) {
        return new Option(id,key,value)
    }

    static find(callback) {
        // option是数据库的关键字，所以要给他加上esc按钮下面的那个按钮
        db.query('select * from `option`',function (err, rows, fields) {
            if (err){
                callback(err, null)
            }
            callback(null, rows.map(Option.create))
        })
    }
}

module.exports = Option


