var mysql = require('mysql');
const { RR } = require('mysql/lib/PoolSelector');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "108projectgroup4",
    database: "project"
});

con.connect(function(err) {
    if (err) throw err;
    //get_letter_list(11)
    //get_letter(6)
    //get_attach_quotation(59)
    get_attach_order(59)
});

// get letter list by studentID
function get_letter_list(studentID) {
    var selectSql = "SELECT * FROM mail WHERE Send_to = " + studentID;
    con.query(selectSql, function(err, result) {
        if(err) throw err;
        if(result[0]) {
            console.log(generate_letter_list_json(result));
        } else {
            console.log("cannot find this letter list")
        }
    })
}

// get letter by letter ID
function get_letter(letterID) {
    var selectSql = "SELECT * FROM mail WHERE mail_ID = " + letterID;
    con.query(selectSql, function(err, result) {
        if(err) throw err;
        if(result[0]) {
            generate_letter_json(result, function(res) {
                console.log(res)
            })
        } else {
            console.log("cannot find this letter")
        }
    })
}

// 報價單
function get_attach_quotation(attachmentID) {
    var selectSql =  "SELECT * FROM quotation WHERE quotation_ID = " + attachmentID;
    con.query(selectSql, function(err, result) {
        if(err) throw err;
        if(result[0]) {
            console.log(generate_quotation_json(result))
        } else {
            console.log("cannot find this attachment")
        }
    })
}

// order
function get_attach_order(attachmentID) {
    var selectSql =  "SELECT * FROM project.order WHERE order_id = " + attachmentID;
    con.query(selectSql, function(err, result) {
        if(err) throw err;
        if(result[0]) {
            console.log(generate_order_json(result))
        } else {
            console.log("cannot find this attachment")
        }
    })
}

function send_letter() {
    
}

// format 
/* {
    letter_id: 信件編號(string),
    title: 信件標題(string),
    sender: 寄件者(string),
    letter_type: 信件種類(string),
    time: 寄件時間（遊戲時間）（string）
} */
function generate_letter_list_json(sql_result) {
    let result_json = ""
    let time, date;
    let length = sql_result.length;
    for(var i=0; i<length; i++) {
        date = sql_result[i].Date;
        time = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
        result_json += JSON.stringify({"letter_id":sql_result[i].mail_ID, "title":sql_result[i].Title, "sender":sql_result[i].Send_from, "letter_type":sql_result[i].Type, "time":time}, null, 2)
        result_json += '\n'
    }
    return result_json;
}

// format
/* {
    title: 信件標題(string),
    sender: 寄件者(string),
    letter_type: 信件種類(string),
    content: 信件內容(string),
    attachment: 附件編號(string),
    time: 寄件時間(string)
} */
function generate_letter_json(sql_result, callback) {
    let result_json, time, date, attachmentID;
    date = sql_result[0].Date;
    time = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()

    get_attachmentID(sql_result[0].Type, sql_result[0].mail_ID, function(result) {
        attachmentID = result;
        result_json = JSON.stringify({"title":sql_result[0].Title, "sender":sql_result[0].Send_from, "letter_type":sql_result[0].Type, "content":sql_result[0].Content, "attachment":attachmentID,  "time":time}, null, 2)
        return callback(result_json);
    }) 
}

function get_attachmentID(type, mail_ID, callback) {
    var selectSql = "SELECT * FROM " + type + " WHERE mail_id = " + mail_ID;
    con.query(selectSql, function(err, result) {
        if(err) throw err;
        if(result[0]) {
            var res = (type == "Quotation" ? result[0].quotation_id : result[0].order_id)
            return callback(res);
        } else {
            return "no attachment"
        }
    })
}

// 報價單format 
/* [
    {
      name: 商品名稱(string),
      price: 商品定價(string),
      rank: 商品等級(string)
    }
] */
function generate_quotation_json(sql_result) {
    let result_json = JSON.stringify({"name":sql_result[0].product_name, "price":sql_result[0].product_unit_price, "rank":sql_result[0].product_rank}, null, 2);
    return result_json;
}

// order format
/* {
    shopping_list: [
        {
          rank: 等級(string),
          name: 商品名稱(string),
          price: 商品定價(string),
          offer: 無法提供(boolean),
          amount: 購買數量(int),
          discount: 折扣(float)
        }
    ],
    detail: {
        arrive_deadline: 抵達時間(string),
        address: 送達地址(string),
        country: 送達地址所屬國家(string),
        flaw: 瑕疵處理方式(string),
        exchange_deadline: 瑕疵處理期限(string),
        pay_deadline: 支付期限(string)
    },
    edit: 修改次數(int)
} */

function generate_order_json(sql_result) {
    let result_json = {
        "shopping_list":[],
        "detail":"",
        "edit":""
    };
    result_json.shopping_list.push({"rank":sql_result[0].product_rank, "name":sql_result[0].product_name, "price":sql_result[0].product_price,
    "offer":sql_result[0].product_offer, "amount":sql_result[0].product_amount, "discount":sql_result[0].product_discount});
    
    let arrive_date, ex_date, pay_date, arrive_time, ex_time, pay_time;

    arrive_date = sql_result[0].arrive_deadline;
    ex_date = sql_result[0].exchange_deadline;
    pay_date = sql_result[0].pay_deadline;

    arrive_time = arrive_date.getFullYear() + "-" + (arrive_date.getMonth()+1) + "-" + arrive_date.getDate()
    ex_time = ex_date.getFullYear() + "-" + (ex_date.getMonth()+1) + "-" + ex_date.getDate()
    pay_time = pay_date.getFullYear() + "-" + (pay_date.getMonth()+1) + "-" + pay_date.getDate()

    let detail_json = {"arrive_deadline": arrive_time, "address": sql_result[0].address, "country": sql_result[0].country, "flaw": sql_result[0].flaw, "exchange_deadline": ex_time, "pay_deadline": pay_time};

    result_json.detail = detail_json;
    result_json.edit = sql_result[0].edit_count
    return result_json;
}