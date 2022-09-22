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
    coop_history_new(119056432, function(res) {
        console.log(res);
    })
    /* get_supply(120560124, function(res) {
        console.log(res)
    }); */
    /* get_address(119056432, function(res) {
        console.log(res)
    }) */
    
});


/* [
    {
        name:,
        company_id:,
        company_type:
    }
] */

function coop_history_new(stu_id, callback) {
    let output_list = []; 

    get_coop_stuid(stu_id, function(coop_id_list) {
        var select_company = "SELECT co_name from company WHERE belong_to_user_id = ?";
        var select_student = "SELECT Type from student WHERE ID = ?";
        for(let i=0; i<coop_id_list.length; i++) {
            con.query(select_company, [coop_id_list[i]], function(err, company_res) {
                if(err) throw err;
                con.query(select_student, [coop_id_list[i]], function(err, student_res) {
                    if(err) throw err;
                    let output_json = {
                        'name':'',
                        'company_id':'',
                        'company_type':''
                    }
                    output_json.name = company_res[0].co_name;
                    output_json.company_id = coop_id_list[i];
                    output_json.company_type = student_res[0].Type;
                    output_list.push(output_json);

                    if(i == coop_id_list.length - 1) {
                        return callback(output_list);
                    }
                })
            })
        }
    })
}

function create_coop_info(stu_id) {
    
}

// return list[]
function get_coop_stuid(stu_id, callback) {
    var select_send_from = "SELECT Send_from from mail WHERE Send_to = ?";
    var select_send_to = "SELECT Send_to from mail WHERE Send_from = ?";
    let coop_list = [];

    con.query(select_send_from, [stu_id], function(err, send_from_res) {
        if(err) throw err;
        con.query(select_send_to, [stu_id], function(err, send_to_res) {
            if(err) throw err;
            for(let i=0; i<send_from_res.length; i++) {
                if(!coop_list.includes(send_from_res[i].Send_from)) {
                    coop_list.push(send_from_res[i].Send_from);
                }
            }

            for(let i=0; i<send_to_res.length; i++) {
                if(!coop_list.includes(send_to_res[i].Send_to)) {
                    coop_list.push(send_to_res[i].Send_to);
                }
            }

            return callback(coop_list);
        })
    })
}



function coop_history(stu_id, callback) {
    get_send_from(stu_id, function(send_from_list) {
        let list_length = send_from_list.length;
        let list = []
        let coop_list = {
            "coop_history_list":[],
        };
        let output_list = []
        let output_json = {
            'name':'',
            'company_id':'',
            'company_type':''
        }
        // 回傳值為空list，表示沒有合作，直接回傳空值
        if(list_length == 0) {
            return callback(coop_list)
        }

        var selectSql =  "SELECT Name, Type FROM student WHERE Account = ? ";
        for(let i=0; i<list_length; i++) {
            con.query(selectSql, send_from_list[i], function(err, result) {
                if(err) throw err;
                let type;
                if(result[0].Type == 'S') {
                    type = "Supplier";
                } else if(result[0].Type == 'M') {
                    type = "Manufacturer";
                }
                list.push({"name":result[0].Name, "company_type":type});
                // 全部都push進去後才return
                if(list.length == list_length) {
                    coop_list.coop_history_list = list;
                    return callback(coop_list)
                }
            })
        }
        // return callback(coop_list)
    })
}

function get_send_from(stu_id, callback) {
    get_mail_box_ID(stu_id, function(mail_box_ID) {
        var selectSql =  "SELECT Send_from, Type FROM mail WHERE mail_box_ID = ? ";
        con.query(selectSql, [mail_box_ID], function(err, result) {
            if(err) throw err;
            let send_from_list = []
            if(result[0]) {
                for(let i=0; i<result.length; i++) {
                    // 檢查重複且type為order才加入
                    if((send_from_list.includes(result[i].Send_from) == false) && result[i].Type == "Order") {
                        send_from_list.push(result[i].Send_from);
                    }
                }
            } else {
                return callback([])
            }
            // 有寄信歷史但只有quotation的情況
            if(send_from_list.length === 0) {
                return callback([]);
            }
            return callback(send_from_list);
        })
    })
}

// 這裡的stu_id是project.student的account
function get_mail_box_ID(stu_id, callback) {
    var selectSql = "SELECT ID FROM mail_box WHERE belong_to_user_ID = ? ";
    con.query(selectSql, [stu_id], function(err, result) {
        if(err) throw err;
        if(result[0]) {
            var mail_box_ID = result[0].ID
            return callback(mail_box_ID);
        } else {
            return callback("not found");
        }
    })
}

/* [
    {
        name: "品項1",
        price: 1000
    },
    {
        name: "品項2",
        price: 500
    }
] */
function get_material(stu_id, callback) {
    var select_student = "SELECT Type FROM student WHERE ID = ?";
    
    con.query(select_student, [stu_id], function(err, type_res) {
        if(err) throw err;
        if(type_res[0].Type == 'material') {
            select_development(stu_id, function(res) {
                return callback(res);
            })
        }
    })
}

function select_development(stu_id, callback) {
    var select_development = "SELECT * FROM development WHERE belong_to_user_ID = ?";
    var output_list = [];         
    con.query(select_development, [stu_id], function(err, dev_res) {
        if(err) throw err;
        for(let i = 0; i < dev_res.length; i++) {
            output_list.push({'name':dev_res[i].Name, 'price':dev_res[i].Cost});
        }
        return callback(output_list);
    })
}

/* {
    name:,
    price:(int)
} */
function get_supply(stu_id, callback) {
    var select_student = "SELECT Type FROM student WHERE ID = ?";
    
    con.query(select_student, [stu_id], function(err, type_res) {
        if(err) throw err;
        if(type_res[0].Type == 'supply') {
            select_supply(stu_id, function(res) {
                return callback(res);
            })
        }
    })
}

function select_supply(stu_id, callback) {
    var select_development = "SELECT * FROM development WHERE belong_to_user_ID = ?";
    var output_list = [];         
    con.query(select_development, [stu_id], function(err, dev_res) {
        if(err) throw err;
        for(let i = 0; i < dev_res.length; i++) {
            output_list.push({'name':dev_res[i].Name, 'price':dev_res[i].Cost});
        }
        return callback(output_list);
    })
}

function finance(stu_id, callback) {
    var selectSql = "SELECT * FROM finance WHERE belong_to_user_ID = ? ";
    let finance_list = {
        balance_sheet:{
            asset:{},
            debt:{},
            equity:{}
        },
        earning:{},
        ratio:{}
    }

    con.query(selectSql, stu_id, function(err, result) {
        if(err) throw err;
        if(result[0]) {

            let asset = {"cash": result[0].cash, "ar": result[0].accounts_receivable, "equip": result[0].equipment, "other": result[0].other_asset};
            finance_list.balance_sheet.asset = asset;
            let debt = {"ap": result[0].accounts_payable, "other": result[0].other_liabilities};
            finance_list.balance_sheet.debt = debt;
            let equity = {"stock": result[0].stock, "retained_earning": result[0].retained_earnings};
            finance_list.balance_sheet.equity = equity;

            let earning = {"cost": result[0].cost, "expense": result[0].expense, "loss": result[0].loss, "gain_before_tax": result[0].gain_before_tax, "tax": (result[0].gain_before_tax * result[0].tax_rate), "eps": ""};
            finance_list.earning = earning;

            let ratio = {"pe": (10/result[0].retained_earnings/result[0].stock).toFixed(2), "gross_margin": ((result[0].retained_earnings - result[0].cost)/result[0].retained_earnings).toFixed(2), "roe": ((result[0].gain_before_tax * (1 - result[0].tax_rate)) / result[0].stock).toFixed(2), "inventory_turnover": (result[0].cost / result[0].other_asset).toFixed(2)}
            finance_list.ratio = ratio;
        } else {
            // 沒這個id 傳空值
            return callback(finance_list)
        }

        return callback(finance_list)
    })
}

/* {
    name:,
    address:
} */
function get_address(stu_id, callback) {
    var select_company = "SELECT * FROM company WHERE belong_to_user_ID = ?";
    con.query(select_company, [stu_id], function(err, com_res) {
        if(err) throw err;
        var output_json = {
            'name':'',
            'address':'', // 先用縮寫，有國家表再換
        }
        output_json.name = com_res[0].co_name;
        output_json.address = com_res[0].country;
        return callback(output_json);
    })
}

/* {
    good:[
            {
            rank: 等級(string),
            name: 品項名稱(string),
            amount: 數量(int)
            }
        ],
    ingredient:[
            {
            rank: 等級(string),
            name: 品項名稱(string),
            amount: 數量(int)
            }
        ],
    total_amount: 倉儲總量(int)
} */
function storage(stu_id, callback) {
    let selectGood = "SELECT * FROM material WHERE belong_to_user_ID = ? ";
    let selectIngredient = "SELECT * FROM product WHERE factory_ID = ? ";
    let storage_list = {
        good:[],
        ingredient:[],
        total_amount:""
    }
    get_factory_ID(stu_id, function(factory_ID) {
        // 沒有工廠，回傳空值
        if(factory_ID == 0) {
            return callback("no factory");
        }

        con.query(selectGood, stu_id, function(err, good_result) {
            if(err) throw err;
            for(let i=0; i<good_result.length; i++) {
                storage_list.good.push({"rank": good_result[i].material_Rank, "name:": good_result[i].material_Name , "amount": good_result[i].material_Amount});
            }
        })

        con.query(selectIngredient, factory_ID, function(err, ing_result) {
            if(err) throw err;
            for(let i=0; i<ing_result.length; i++) {
                storage_list.ingredient.push({"rank": ing_result[i].Quality, "name:": ing_result[i].Name , "amount": ing_result[i].Quantity})
            }
            return callback(storage_list)
        }) 

    })
    
}

function get_factory_ID(stu_id, callback) {
    let selectSql = "SELECT ID FROM factory WHERE belong_to_user_ID = ? ";
    let factory_ID = 0;
    con.query(selectSql, stu_id, function(err, result) {
        if(err) throw err;
        if(result[0]) {
            factory_ID = result[0].ID;
        }
        return callback(factory_ID)
    })
}

/* [
    {
      name: 公司名稱(string),
      company_id: 公司id(string),
      company_type: 公司總類(string)
    }
] */

function get_companies(callback) {
    let selectSql = "SELECT * FROM student";
    let company_list = []

    con.query(selectSql, function(err, result) {
        if(err) throw err;
        for(let i=0; i<result.length; i++) {
            let type;
            if(result[i].Type == 'S') {
                type = "Supplier";
            } else if(result[i].Type == 'M') {
                type = "Manufacturer";
            }
            company_list.push({"name":result[i].Name, "company_id":result[i].ID, "company_type":type});
        }
        return callback(company_list);
    })
}


// --- Export--- //
module.exports = {
    coop_history,
    finance,
    storage,
    get_companies,
}