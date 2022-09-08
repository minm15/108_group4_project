var mysql = require('mysql');
const { RR } = require('mysql/lib/PoolSelector');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "108projectgroup4",
    database: "project",
    multipleStatements: true
});

con.connect(function(err) {
    if (err) throw err;
    //produce_status(120560124)
    //get_contracts(119056432)
    
    //produce_plan(plan_input)
    //check_storage(120560124, "A")
    produce_order(120560124, produce_order_input)
});

/* [
    {
    product: 品項名稱(string),
    purpose: [
        rank: product quality(string),
        amount: product quantity(int)
    ],
    mistake: 預期誤差(string),
    ingredient: [
            {
            name: 材料名稱(string),
            amount: 消耗量(int),
            company: 從哪間公司購買的(string),
            rank: 材料等級(string),
            cost: 進貨成本(int)
            }
        ],
    expense: 其他費用(int),
    total_cost: 共計成本(int),
    time: 預計耗時
    }
] */

// 這個function之後還會改
function produce_status(stu_id) {
    let select_factory = "SELECT ID FROM factory WHERE belong_to_user_ID = ?";
    let select_produce = "SELECT * FROM produce_product WHERE factory_ID = ?";
    let select_from_product_detail = "SELECT * FROM product_detail WHERE product_Name = ?";
    let select_from_material = "SELECT * FROM material WHERE belong_to_user_ID = ?";
    let status_output = [];

    con.query(select_factory, [stu_id], function(err, factory_res) {
        if(err) throw err;
        let factory_id;
        let status_json_output = {
            product:"",
            purpose:[],
            mistake:"",
            ingredient:[],
            expense: 0,
            total_cost:0,
            time:""
        }
        let ingredient_output = [];
        let purpose_output = [];
        if(factory_res[0]) {
            // 目前測試先挑一筆
            factory_id = factory_res[0].ID; // 31

            con.query(select_produce, [factory_id], function(err, product_res) {
                if(err) throw err;
                let length = product_res.length;

                //console.log("product", product_res[0])

                var current_time = new Date().toISOString('zh-TW', {timeZone: 'Asia/Taipei'});;
                //console.log(current_time);

                con.query(select_from_product_detail , [product_res[0].Name], function(err, detail_res) {
                    if(err) throw err;

                    console.log(detail_res)

                    con.query(select_from_material, [stu_id], function(err, material_res) {
                        if(err) throw err;

                        //console.log("mat", material_res)

                        let material_list = detail_res[0].cost_material.split(";");
                        let amount_list = detail_res[0].cost_num.split(";");
                        let len = material_list.length;
                        let price_list = []

                        // put every ingredient into output
                        for(let i = 0; i < len; i++) {

                            status_json_output.ingredient.push({"name":material_list[i], "amount":amount_list[i], "company":"skip", "rank":0, "cost": "cost"});
                        }

                        purpose_output.push({"rank":product_res[0].Quality, "amount":product_res[0].Quantity});

                        // put data into status_json
                        status_json_output.product = product_res[0].Name;
                        status_json_output.purpose = purpose_output[0];
                        status_json_output.mistake = "skip";
                        //status_json_output.ingredient = ingredient_output[1];
                        status_json_output.expense = product_res[0].Cost_money;

                        // push data into result output
                        status_output.push(status_json_output);

                        console.log(status_output[0]);
                        //console.log("material", material_res);
                    })

                })
            })
        }
    })
}

function handle_ingrediant(detail_res, callback) {

    let ingredient_output = [];
    let material_list = detail_res[0].cost_material.split(";");
    let amount_list = detail_res[0].cost_num.split(";");
    let len = material_list.length;
    let price_list = []
    let select_from_ingrediant = "SELECT * FROM ingrediant WHERE ingrediant_name = ?";

    for(let i = 0; i < len; i++) {
        status_json_output.ingredient.push({"name":material_list[i], "amount":amount_list[i], "company":"skip", "rank":0, "cost": "cost"});
    }

    con.query(select_from_ingrediant, [name], function(err, result) {
        if(err) throw err;
        return callback(result[0].ingrediant_price);
    })
}

/* [
    {
    contract_id: 訂單編號(string),
    buyer: 買家(string),
    good_list: [
            {
              name: 商品名稱(string),
              amount: 數量(string),
              status: 正在製造／存貨足夠／不足
            }
        ],
    change: [
            {
              name: 商品名稱(string),
              amount: 數量(string),
              status: 正在製造／存貨足夠／不足
            }
        ],
    deadline: 送達時間(string)
    }
] */
function get_contracts(stu_id) {
    let select_mail = "SELECT mail_ID, Send_to FROM mail WHERE Send_from = ? AND Type = 'Order' ";
    let select_purchase = "SELECT * FROM purchase WHERE mail_id = ?";
    let contract_list = [];

    con.query(select_mail, [stu_id], function(err, mail_res) {
        if(err) throw err;

        if(mail_res[0]) {
            let mail_ID = mail_res[0].mail_ID;

            con.query(select_purchase, [mail_ID], function(err, purchase_res) {
                if(err) throw err;
                let contract_json = {
                    contract_id:"",
                    buyer:"",
                    good_list:[],
                    change:[],
                    deadline:""
                }

                let good = [];
                let change = [];
                let name = purchase_res[0].product_name;

                get_amount_info(stu_id, name, function(current_amount) {

                    let status = ""
                    let amount = purchase_res[0].product_amount;
                    if(current_amount < amount) {
                        status = "不足";
                    } else if(current_amount >= amount) {
                        status = "存貨足夠";
                    }
                    // put data into contract_json
                    contract_json.contract_id = purchase_res[0].order_id;
                    contract_json.buyer = mail_res[0].Send_to;
                    good.push({"name":name, "amount":amount, "status": status});
                    contract_json.good_list = good[0];

                    if(purchase_res[0].flaw == '1') {
                        change = good;
                    } else {
                        change = ['no change'];
                    }
                    contract_json.change = change[0];

                    contract_json.deadline = purchase_res[0].arrive_deadline;
                    contract_list.push(contract_json);

                    console.log(contract_list);
                })
                
                
            })
        } else {
            console.log("no mail")
        }
        
    })
}

function get_amount_info(stu_id, product_name, callback) {
    let select_factory = "SELECT ID FROM factory WHERE belong_to_user_ID = ?";
    let select_product = "SELECT * FROM produce_product WHERE (";
    let sql_input_list = []
    let total_amount = 0;

    con.query(select_factory, [stu_id], function(err, factory_id) {
        if(err) throw err;

        if(factory_id[0]) {
            let length = factory_id.length;
            for(let i=0; i<length; i++) {
                sql_input_list.push(factory_id[i].ID)
                if(i==0) {
                    select_product += " factory_ID = ?"
                } else {
                    select_product += " OR factory_ID = ?"
                }
            }
            select_product += ") AND Name = ?"
            sql_input_list.push(product_name)

            con.query(select_product, sql_input_list, function(err, product_res) {

                let len = product_res.length;
                for(let i=0; i<len; i++) {
                    total_amount += product_res[0].Quantity;
                }

                if(product_res[0]) {
                    return callback(total_amount);
                } else {
                    return callback(total_amount);
                }
            })

        } else {
            return callback(total_amount);
        }
    })
}

/* {
    flaw: [
            {
            rank: 等級(string),
            amount: 數量(string)
            }
        ],
    ingredient: [
            {
            name: 材料名稱(string),
            amount: 數量(string)
            }
        ],
    expense: 其他費用(int),
    time: 預計耗時(int)
} */

let plan_input = {
    stu_id: 50,
    name: "A",
    rank: "B",
    amount: 20
}

function produce_plan(plan_input) {
    let stu_id = plan_input.stu_id;
    let name = plan_input.name;
    let rank = plan_input.rank;
    let amount = plan_input.amount;

    let plan_json = {
        flaw:[],
        ingredient:[],
        expense:0,
        time:"",
    }

    let select_pro_detail = "SELECT * FROM product_detail WHERE product_Name = ?";
    
    con.query(select_pro_detail, [name], function(err, detail_res) {
        if(err) throw err;

        let want_rank = plan_input.rank;

        plan_json.ingredient.push({"name":name, "amount":amount});
        plan_json.flaw.push({"rank": handle_rank(want_rank), "amount":"5%"})
        plan_json.expense = detail_res[0].cost_money;
        plan_json.time = detail_res[0].time_from_start_to_finish;

        // console.log(detail_res);
        console.log(plan_json)
    })
}

function handle_rank(rank) {
    let output = "";
    let score_list = [];
    if(rank == "S") {
        score_list = [92, 5, 2, 1];
    } else if (rank == "A") {
        score_list = [5, 88, 5, 2];
    } else if (rank == "B") {
        score_list = [2, 5, 88, 5];
    } else if (rank == "C") {
        score_list = [1, 2, 5, 92];
    }
    output = "S : " + score_list[0] + "%, A : " + score_list[1] + "%, B : " + score_list[2] + "%, C : " + score_list[3] + "%";
    return output;
}

/* [
    {
    producer: 製造商(string),
    amount: 數量(int),
    rank: 等級(string)
    }
] */
function check_storage(stu_id, ingredient) {
    let select_product = "SELECT * FROM produce_product WHERE factory_ID = ( SELECT ID FROM factory WHERE belong_to_user_ID = ? )";
    let select_material = "SELECT * FROM material WHERE belong_to_user_ID = ?"
    let storage_list = [];

    // 用前4個字元判斷
    if(ingredient.substring(0,4) == "part") {
        con.query(select_material, [stu_id], function(err, material_res) {
            if(err) throw err;
            let length = material_res.length

            for(let i=0; i<length; i++) {
                if(material_res[i].material_Name == ingredient) {
                    let storage_json = {
                        producer: stu_id,
                        amount: 0,
                        rank: ""
                    }
                    storage_json.amount = material_res[i].material_Amount;
                    storage_json.rank = material_res[i].material_Rank;
                    storage_list.push(storage_json);
                } else {
                    continue;
                }
            }

            console.log(storage_list);
        })
    } else {
        con.query(select_product, [stu_id], function(err, product_res) {
            if(err) throw err;
            let length = product_res.length

            for(let i=0; i<length; i++) {
                if(product_res[i].Name == ingredient) {
                    let storage_json = {
                        producer: stu_id,
                        amount: 0,
                        rank: ""
                    }
                    storage_json.amount = product_res[i].Quantity;
                    storage_json.rank = product_res[i].Quality;
                    storage_list.push(storage_json);
                } else {
                    continue;
                }
            }

            console.log(storage_list);
        })
    }
    
}

let produce_order_input = {
    name: "part_B",
    rank: "C",
    amount: 20,
    ingredient: [
        {
            name: "A;B",
            amount: 22,
            producer: 28 
        }
    ]
}

function produce_order(stu_id, input) {
    let select_product_detail = "SELECT product_ID, cost_money, time_from_start_to_finish FROM product_detail WHERE product_Name = ?";
    let select_factory = "SELECT ID FROM factory WHERE belong_to_user_ID = ?";
    let insert_product = "INSERT INTO produce_product (product_ID, factory_ID, Name, Cost_material, Cost_money, Quality, Quantity, Start_Date, Finish_Date) VALUES (?,?,?,?,?,?,?,?,?)"
    let product_name = input.name;
    let date = new Date().toLocaleString();
    //date = date.toUTCString();
    date = date.split(' ')
    //console.log(date[0])

    con.query(select_product_detail, [product_name], function(err, res) {
        if(err) throw err;

        con.query(select_factory, [stu_id], function(err, result) {
            if(err) throw err;
            
            let product_id = res[0].product_ID;
            let factory_id = result[0].ID;
            let name = input.name;
            let material = input.ingredient[0].name;
            let money = res[0].cost_money;
            let quality = input.rank;
            let quantity = input.ingredient[0].amount;
            let start_date = date[0];
            let time_interval = res[0].time_from_start_to_finish;
            let finish_date = handleDay(start_date, parseInt(time_interval));

            con.query(insert_product, [product_id, factory_id, name, material, money, quality, quantity, start_date, finish_date], function(err) {
                if(err) throw err;
                console.log("input successfully!")
            })

        })
    })
}

function handleDay(date, days){
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    res = res.toLocaleString();
    res = res.split(' ');
    return res[0];
}