var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "108projectgroup4",
    database: "project"
});

con.connect(function(err) {
    if (err) throw err;

    /* get_letter(106, function(result) {
        console.log(result)
    }) */
    /* get_attach_contract_draft(93, function(res) {
        console.log(res)
    }) */

    get_attach(115, function(result) {
        console.log(result);
    })
    //send_letter(send_letter_input)
   /*  pay(106, false, function(result) {
        console.log(result)
    }) */
    //console.log(get_letter_list(120560124, 'Quotation'));
    
});

function get_letter_list(studentID, type) {
    var selectSql = "SELECT * FROM mail WHERE Send_to = ? and Type = ?";
    var output_list = [];
    var output_json = {
        'id': '',
        'sender': '',
        'sender_type': '',
        'letter_type': '',
        'title': '',
        'expired': '',
        'time': '',
    }
    con.query(selectSql, [studentID, type], function(err, result) {
        if(err) throw err;
        if(result[0]) {
            for(let i=0; i<result.length; i++) {
                let send_from_id = result[i].Send_from;
                get_player_type(send_from_id, function(send_from_type) {
                    output_json.id = result[i].mail_ID;
                    output_json.sender = result[i].Send_from;
                    output_json.sender_type = send_from_type;
                    output_json.letter_type = result[i].Type;
                    output_json.title = result[i].Title;
                    output_json.expired = result[i].id;
                    output_json.time = result[i].Date;
                    output_list.push(output_json);
                    console.log(output_list);

                    // return when arriveing the last index
                    if(i == result.length - 1) {
                        return output_list;
                    }
                })  
            }
        } else {
            return "cannot find this letter list";
        }
    })
}

function get_player_type(studentID, callback) {
    var select_student = "SELECT Type FROM student WHERE ID = ?";
    con.query(select_student, [studentID], function(err, result) {
        if(err) throw err;
        var type = '';
        if(result[0].Type == 'S') {
            type = '供應';
        } else if(result[0].Type == 'M') {
            type = '製造';
        }
        return callback(type);
    })
}

// get letter by letter ID
function get_letter(letterID, callback) {
    var selectSql = "SELECT * FROM mail WHERE mail_ID = ?";
    con.query(selectSql, [letterID],function(err, result) {
        if(err) throw err;
        if(result[0]) {
            generate_letter_json(result, function(res) {
                return callback(res);
            })
        } else {
            return callback("cannot find this letter");
        }
    })
}

// get attach by mailID
function get_attach(mailID, callback) {
    get_attach_ID(mailID, function(result) {
        // type: operation => no additional attachment
        // 目前return null
        if(result[0] == "Operation") 
        {
            return callback("");
        } 
        // type: quotation
        else if(result[0] == "Quotation" ) 
        {
            get_attach_quotation(mailID, result[1], function(res) {
                return callback(res);
            })
        }
        else if(result[0] == "Contract_draft")  
        {
            get_attach_contract_draft(mailID, result[1], function(res) {
                return callback(res);
            })
        }
        else if(result[0] == "Contract_edit")  
        {
            get_attach_contract_edit(mailID, result[1], function(res) {
                return callback(res);
            })
        }
        else 
        {
            return callback("this is unknown type");
        }
    })
}

// 報價單
function get_attach_quotation(mail_id, attachmentID, callback) {
    var selectSql = "SELECT * FROM quotation WHERE quotation_id = ?";
    var output_list = []
    var output_json = {
        "id": '',
        "name": '',
        "type": '',
        "price": 0
    }
    con.query(selectSql, [attachmentID], function(err, result) {
        if(err) throw err;
        if(result[0]) {
            for(let i=0; i<result.length; i++) {
                output_json.id = result[i].quotation_id;
                output_json.name = result[i].product_name;
                output_json.type = result[i].product_rank;
                output_json.price = result[i].product_unit_price;
                output_list.push(output_json)

                if(i == result.length - 1) {
                    return callback(output_list);
                }
            }
        } else {
            return callback("cannot find this attachment");
        }
    })
}

// Contract_draft
function get_attach_contract_draft(mail_id, attachmentID, callback) {
    var selectSql = "SELECT * FROM project.purchase WHERE order_id = ?";
    var select_company = "SELECT co_name FROM company WHERE belong_to_user_ID = (SELECT send_from FROM mail WHERE mail_ID = ?)"
    var amount_list = [];
    var output_json = {
        "amountList":[],
        "arrive": '',
        "address": '',
        "addressLoc": '',
        "flaw": '',
        "flawDate": '',
        "pay": ''
    }
    var amount_json = {
        "id": '',
        "name": '',
        "type": '',
        "price": 0,
        "amount": 0
    }
    con.query(selectSql, [attachmentID], function(err, result) {
        if(err) throw err;
        con.query(select_company, [mail_id], function(err, company_res) {
            if(err) throw err;
            if(result[0]) {
                for(let i=0; i<result.length; i++) {
                    amount_json.id = result[i].order_id;
                    amount_json.name = result[i].product_name;
                    amount_json.type = result[i].product_rank;
                    amount_json.price = result[i].product_price;
                    amount_json.amount = result[i].product_amount;
                    amount_list.push(amount_json);
    
                    if(i == result.length-1) {
                        output_json.amountList = amount_list;
                        output_json.arrive = result[0].arrive_deadline;
                        output_json.address = company_res[0].co_name;
                        output_json.addressLoc = result[0].country;
                        output_json.flaw = result[0].flaw;
                        if(result[0].flaw == 'exchange') {
                            output_json.flawDate= result[0].exchange_deadline;
                        }
                        output_json.pay = result[0].pay_deadline;
    
                        return callback(output_json);
                    }
                }
                //return callback(result);
            } else {
                return callback("cannot find this attachment");
            }
        })
    })
}

// contract_edit
function get_attach_contract_edit(mail_id, attachmentID, callback) {
    var selectSql = "SELECT * FROM project.purchase WHERE order_id = ?";
    var select_company = "SELECT co_name FROM company WHERE belong_to_user_ID = (SELECT send_from FROM mail WHERE mail_ID = ?)"
    var amount_list = [];
    var output_json = {
        "amountList":[],
        "arrive": '',
        "address": '',
        "addressLoc": '',
        "flaw": '',
        "flawDate": '',
        "pay": ''
    }
    var amount_json = {
        "id": '',
        "name": '',
        "type": '',
        "price": 0,
        "amount": 0,
        "discount": '',
        "cantProvide": '',
    }
    con.query(selectSql, [attachmentID], function(err, result) {
        if(err) throw err;
        con.query(select_company, [mail_id], function(err, company_res) {
            if(err) throw err;
            if(result[0]) {
                for(let i=0; i<result.length; i++) {
                    amount_json.id = result[i].order_id;
                    amount_json.name = result[i].product_name;
                    amount_json.type = result[i].product_rank;
                    amount_json.price = result[i].product_price;
                    amount_json.amount = result[i].product_amount;
                    amount_json.discount = result[i].product_discount;
                    amount_json.cantProvide = result[i].cantProvide;
    
                    amount_list.push(amount_json);
    
                    if(i == result.length-1) {
                        output_json.amountList = amount_list;
                        output_json.arrive = result[0].arrive_deadline;
                        output_json.address = result[0].address;
                        output_json.addressLoc = company_res[0].co_name;
                        output_json.flaw = result[0].flaw;
                        if(result[0].flaw == 'exchange') {
                            output_json.flawDate= result[0].exchange_deadline;
                        }
                        output_json.pay = result[0].pay_deadline;
    
                        return callback(output_json);
                    }
                }
                //return callback(result);
            } else {
                return callback("cannot find this attachment");
            }
        })    
    })
}

function get_attach_ID(mailID, callback) {
    var selectMailSql = "SELECT Type FROM mail WHERE mail_id = ?";
    con.query(selectMailSql, [mailID], function(err, result) {
        if(err) throw err;
        var type = result[0].Type
        if(result[0].Type == "Quotation") {
            var selectSql =  "SELECT quotation_id FROM quotation WHERE mail_id = ?";
        } else if(result[0].Type == "Contract_draft" || result[0].Type == "Contract_edit") {
            var selectSql =  "SELECT order_id FROM project.purchase WHERE mail_id = ?";
        } else  if(result[0].Type == "Operation"){
            return callback([type, 0]);
        }

        if(result[0]) {
            con.query(selectSql, [mailID], function(err, res) {
                if(err) throw err;
                if(type == "Quotation") 
                {
                    return callback([type, res[0].quotation_id]);
                } 
                else if(type == "Contract_draft" || type == "Contract_edit")
                {
                    return callback([type, res[0].order_id]);

                }
                else 
                {
                    return "error"
                }
            })
        }
    })

}

// 用於測試 function send_letter()的東西
let send_letter_input = {
    title: "Quotation: buy something",
    sender: 123456789,
    receiver: 123098765,
    letter_type: "Quotation",
    content: "I want to buy something",
    attach: [
        {
            name: "A",
            price: "900",
            rank: "S"
        }
    ],
    time: "2022-07-20"
}
// input format
/* {
    title: 信件標題(string),
    sender: 寄件者(string),
    letter_type: 信件種類(string),
    content: 信件內容(string),
    attach: 報價單或訂單內容，格式如查看附件(string),
    time: 寄件時間(string)
} */
function send_letter(input) {
    let title = input.title;
    let date = input.time;
    let content = input.content;
    let send_from = input.sender;
    let send_to = input.receiver;
    let type = input.letter_type;
    let product_name = input.attach[0].name;
    let product_price = input.attach[0].price;
    let product_rank = input.attach[0].rank;

    /* if(content == "Quotation") {
        var insertQuotationSql = "INSERT INTO quotation (mail_id, product_name, product_unit price, product_rank) VALUES ("
    } */

    var insertMailSql = "INSERT INTO mail (Title, Date, Content, Send_from, Send_to, Type) VALUES (?, ?, ?, ?, ?, ?)"  
    var insertQuotation = "INSERT INTO quotation (mail_id, product_name, product_unit_price, product_rank) VALUES (?, ?, ?, ?)"

    con.query(insertMailSql, [title, date, content, send_from, send_to, type],function(err, result) {
        if(err) throw err;

        get_latest_mailID(send_from, send_to, function(result) {
                
            // 目前做到insert quotation
            // 之後要再加上判定是order or quotation
            con.query(insertQuotation, [result.mail_ID, product_name, product_price, product_rank], function(err, result) {
                if(err) throw err;
                // 這裡之後要改成return 告知有成功insert
                console.log(send_from + " send to " + send_to + " and insert into quotation")
            })
        })
    })
}

function get_latest_mailID(send_from, send_to, callback) {
    var selectMailIDSql = "SELECT mail_ID FROM mail WHERE Send_from = ? AND Send_to = ?";
    con.query(selectMailIDSql, [send_from, send_to], function(err, res) {
        //find the latest one
        let latest = res.length - 1; 
        return callback(res[latest]);
    })
}

/* {
    status: goods_unreceived/success,
    discount:
      [
        {
        reason: 折價原因(string),
        amount: 折價金額(int)
        }
      ]
    paid: 支付金額(int),
    cash: 現有金額(int)
} */
function pay(mail_id, check, callback) {
    let pay_output = {
        "status":"",
        "discount":[],
        "paid":"",
        "cash":""
    }
    var selectSql = "SELECT * FROM purchase WHERE mail_id = ?";
    var select_send_from = "SELECT Send_from, Type FROM mail WHERE mail_id = ?";
    var select_cash = "SELECT cash FROM finance WHERE belong_to_user_ID = ?"
    con.query(selectSql, [mail_id], function(err, res) {
        if(err) throw err;

        con.query(select_send_from, [mail_id], function(err, mail_result) {
            if(err) throw err;
            if(mail_result[0].Type == "Order") {
                let stu_id = mail_result[0].Send_from;
                
                con.query(select_cash, [stu_id], function(err, cash_result) {
                    if(err) throw err;
                    let cash = cash_result[0].cash;
                    let paid = 0;

                    if(check) {
                        pay_output.discount.push({"reason":"reason", "amount":res[0].product_discount});
                        paid = res[0].product_price * res[0].product_discount;
                        pay_output.paid = paid;
                    } else { 
                        // 沒有驗貨
                        pay_output.discount.push({"reason":"no check", "amount":0});
                        paid = res[0].product_price
                        pay_output.paid = paid;
                    }
            
                    pay_output.status = res[0].status;
                    pay_output.cash = cash - paid;
            
                    return callback(pay_output)
                })
            } else {
                // 正常來說 前端call這個function會確定是order才可以
                // 但我還是先做判定
                return callback("this is not order")
            }
        })
    })
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
    if(type == "Order"){
        type = "purchase"
    }
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

/* {
    shopping_list: [
        {
          rank: 等級(string),
          name: 商品名稱(string),
          price: 商品定價(string),
          amount: 購買數量(int)
        }
    ],
    detail: {
        arrive_deadline: 抵達時間(string),
        pay_deadline: 支付期限(string)
    }
} */
function buy_ingredient(stu_id) {
    let output_json = {
        "shopping_list":[],
        "detail":""
    }

    
}




// --- Export--- //
/* module.exports = {
    get_letter,
    get_attach,
    
} */