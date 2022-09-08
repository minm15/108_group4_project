var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "108projectgroup4",
    database: "project",
});

con.connect(function(err) {
    /* deliver_list(119056432, function(result) {
        console.log(result)
    }) */
    //deliver_detail(89)
    //receive_deliver(119056432, 89)
    //deliver_expense(119056432, 120560124)
    deliver_order(deliver_order_input)
})

/* [
    {
    deliver_id: 寄送編號(string),
    type: 寄／收(string),
    name: 目標公司(string),
    package: [
            {
            name: 商品名稱(string),
            amount: 數量(int)
            }
        ],
    progress: 送貨進度(float，百分比),
    delay: 是否延遲(boolean),
    time: 預計抵達時間(string)
    }
] */

// 感覺delay跟progress怪怪的，目前的算法像是假設東西一定會在arrive_deadline到
function deliver_list(stu_id, callback) {
    var select_mail = "SELECT mail_ID, Send_to, Send_from FROM mail WHERE Send_to = ? OR Send_from = ?";
    var select_deliver = "SELECT * FROM purchase WHERE"
    var select_mail_after = "SELECT Send_to, Send_from FROM mail WHERE"
    var select_student = "SELECT Name FROM student WHERE ID = ?"
    let output_list = [];
    let package_list = [];
    let progress_percent = 0;

    // get current time
    let date = new Date().toLocaleString();
    date = date.split(' ')
    let current_date = date[0]

    // find the mail related with input student_ID
    con.query(select_mail, [stu_id, stu_id], function(err, mail_result) {
        if(err) throw err;

        // dynamically create select_deliver sql according to the number of mail
        let mail_id_list = []
        for(let i=0; i<mail_result.length; i++) {
            if (i == 0) {
                select_deliver += " mail_ID = ?"
            } else {
                select_deliver += " OR mail_ID = ?"
            }
            mail_id_list.push(mail_result[i].mail_ID)
        }

        con.query(select_deliver, mail_id_list, function(err, deliver_res) {
            if(err) throw err;

            let mid_list = [] // for second mail sql search data
            for(let i=0; i<deliver_res.length; i++) {
                if (i == 0) {
                    select_mail_after += " mail_ID = ?"
                } else {
                    select_mail_after += " OR mail_ID = ?"
                }
                mid_list.push(deliver_res[i].mail_id)
            }

            // find the mail data again 
            // to ensure these mail is order type
            con.query(select_mail_after, mid_list, function(err, mail_res) {
                if(err) throw err;

                // find student's name
                con.query(select_student, [stu_id], function(err, stu_result) {
                    if(err) throw err;

                    for(let i=0; i<deliver_res.length; i++) {

                        // handle type
                        let type = "";
                        if(mail_res[i].Send_to == stu_id) {
                            type = "receiver";
                        } else if(mail_res[i].Send_from == stu_id) {
                            type = "sender";
                        }

                        // handle package
                        package_list = []
                        package_list.push({"name": deliver_res[i].product_name, "amount": deliver_res[i].product_amount});

                        // handle progress
                        let send_date = deliver_res[i].send_date;
                        let arrive_date = deliver_res[i].arrive_deadline;
                        begin_current_difference = handle_date_calculation(send_date, current_date);
                        begin_arrive_difference = handle_date_calculation(send_date, arrive_date);
                        progress_percent = begin_current_difference / begin_arrive_difference;
                        progress_percent = (Math.round(progress_percent * 100) / 100) * 100

                        if(progress_percent > 100) {
                            progress_percent = 100;
                        }

                        // handle time
                        let arrive = new Date(arrive_date).toLocaleString();
                        arrive_d = arrive.split(' ');
                        arrive_deadline = arrive_d[0]; 
                        
                        // handle output
                        output_list.push({"deliver_id": deliver_res[i].order_id, "type": type, "name": stu_result[0].Name, 
                        "package": package_list, "progress": progress_percent, "time": arrive_deadline});
                    }
                    return callback(output_list);
                })
            })           
        })
    }) 
}

// return the difference with tow input date
function handle_date_calculation(date1, date2) {
    var day1 = new Date(date1); 
    var day2 = new Date(date2);

    var difference= day2-day1;
    days = difference/(1000 * 3600 * 24)

    return days;
}

/* [
    {
    package: [
            {
            name: 商品名稱(string),
            amount: 數量(int),
            price: 單價(int)
            }
        ],
    delay_reason: {
            event_id: 事件編號(string),
            event_name: 事件名稱(string),
            time: 事件結束時間(string)
        }
    }
] */
// 差delay，如何找到正確的delay原因
function deliver_detail(deliver_id) {
    var select_deliver = "SELECT * FROM purchase WHERE order_id = ?";
    let output_list = []
    let package_list = []
    let delay_reason_json = {
        event_id: "",
        event_name: "",
        time: ""
    }

    let date = new Date().toLocaleString();
    date = date.split(' ')
    let current_date = date[0]

    con.query(select_deliver, [deliver_id], function(err, deliver_res) {
        if(err) throw err;

        package_list.push({"name": deliver_res[0].product_name, "amount": deliver_res[0].product_amount, "price": deliver_res[0].product_price});
        output_list.push({"package": package_list});

        let arrive_date = deliver_res[0].arrive_deadline;

        arrive_current_difference = handle_date_calculation(arrive_date, current_date);

        if(arrive_current_difference < 0) {

        }

        console.log(output_list[0].package)
    })
}

// 差更新金錢流動
function receive_deliver(stu_id, deliver_id) {
    var update_order = "UPDATE purchase SET status = 'paid' WHERE order_id = ?";
    var select_order = "SELECT * FROM purchase WHERE order_id = ?"
    var insert_material = "INSERT INTO material (belong_to_user_ID, material_ID, material_Name, material_Rank, material_Amount) VALUES (?,?,?,?,?)"
    var check_material = "SELECT COUNT(Record_ID) AS id_count FROM material WHERE material_ID = ? AND material_Name = ? AND material_Rank = ?";
    var update_material = "UPDATE material SET material_Amount = (material_Amount + ?) WHERE material_ID = ? AND material_Name = ? AND material_Rank = ? "

    // update order type unpaid to paid
    con.query(update_order, [deliver_id], function(err) {
        if(err) throw err;
        console.log("update successfully")

        con.query(select_order, [deliver_id], function(err, order_res) {
            if(err) throw err;

            // handle product or ingredient
            let order_name = order_res[0].product_name;
            let rank = order_res[0].product_rank;
            let amount = order_res[0].product_amount;

            handle_material_ID(order_name, function(material_ID) {

                con.query(check_material, [material_ID, order_name, rank], function(err, count_res) {
                    if(err) throw err;

                    // not in the material table => insert
                    // in the material table => update amount
                    if(count_res[0].id_count == 0) {
                        con.query(insert_material, [stu_id, material_ID, order_name, rank, amount], function(err) {
                            if(err) throw err;
                            console.log("insert material successfully");
                        })
                    } else {
                        con.query(update_material, [amount, material_ID, order_name, rank], function(err) {
                            if(err) throw err;
                            console.log("update material successfully")
                        })
                    }
                })
                
            })
        })

    })
}

// check the purchase.product is in product or part
function handle_material_ID(order_name, callback) {
    var select_product_detail = "SELECT product_ID FROM product_detail WHERE product_Name = ?";
    var select_part = "SELECT ID FROM part WHERE Name = ?";
    let product_list = ["A", "B", "C", "D", "E"];
    let part_list = ["part_A", "part_B", "part_C", "part_D", "part_E" , "part_F" , "part_G" , "part_J" , "part_I"];
    let type = "";

    if(product_list.includes(order_name)) {
        type = "product";
    } else if(part_list.includes(order_name)) {
        type = "ingredient";
    }

    if(type == "product") {
        con.query(select_product_detail, [order_name], function(err, result) {
            if(err) throw err;
            return callback(result[0].product_ID);
        })
    } else if(type == "ingredient") {
        con.query(select_part, [order_name], function(err, result) {
            if(err) throw err;
            //console.log(result)
            return callback(result[0].ID);
        })
    }
}

/* [
    {
    time: 配送時長(string),
    price: 價格(string)
    }
] */
// 待補充其他州的情況
function deliver_expense(send_from, send_to) {
    let select_address = "SELECT address, country FROM finance WHERE belong_to_user_ID = ? OR belong_to_user_ID = ?"
    let output_list = []
    let output_json = {
        'time': '',
        'price': ''
    }
    
    // select address, country in finance table
    con.query(select_address, [send_from, send_to], function(err, address_res) {
        if(err) throw err;

        // assign country
        let from_country = address_res[0].country;
        let to_country = address_res[1].country;

        // assign address
        let from_address = address_res[0].address;
        let to_address = address_res[1].address;

        // get the last two number of the address
        from_address = parseInt(from_address) % 100;
        to_address = parseInt(to_address) % 100;

        // calculate total delivery time
        let distance = country_distance(from_country, to_country);
        let sum_address = from_address + to_address;
        // convert to minute temporately
        let deliver_time = distance *5*24*60 + sum_address*10
        
        // calculate total delivery cost
        let deliver_cost = distance * 1000 + sum_address * 100;

        output_json.time = deliver_time;
        output_json.price = deliver_cost;
        output_list.push(output_json);

        console.log(output_list);
    })
}

// calculate the distance between two country
function country_distance(from_country, to_country) {

    // put the country_tag which records the country belongs which continent into the list
    let country_tag_list = [country_tag(from_country), country_tag(to_country)];

    // determine the distance between two continent in the country_tag_list and return 
    if(country_tag_list.includes('asia') && country_tag_list.includes('nor_america')) {
        return 2;
    } else if(country_tag_list.includes('asia') && country_tag_list.includes('europe')) {
        return 5;
    } else if(country_tag_list.includes('europe') && country_tag_list.includes('nor_america')) {
        return 2;
    }
}

// assign the continent_tag to input country
function country_tag(country) {
    let asia_list = ['JPN'];
    let europe_list = ['GER'];
    let nor_america_list = ['USA'];

    if(asia_list.includes(country)) {
        return 'asia';
    } else if(europe_list.includes(country)) {
        return 'europe';
    } else if(nor_america_list.includes(country)) {
        return 'nor_america';
    }
}

/* {
    contract_id: 訂單編號(string),
    product: [
            {
            name: 材料名稱(string),
            rank: {
                A: A等級的數量(int),
                B: B等級的數量(int),
                C: C等級的數量(int),
                }
            }
        ],
    time: 約定配送時長(int)
} */
let deliver_order_input = {
    "stu_id": 119056432,
    "product_name": "part_A",
    "product_rank": "A",
    "product_amount": 5,
    "time": "",
    "to_stu_id": 120560124,
    "product_price": 110,
    "product_discount": 0.05,
    "flaw": 0
}

// 差計算航運時間，航運費用
// 算完後要更新insert_purchase的 arrive_deadline, exchange_deadline, pay_deadline, other_expense
function deliver_order(input) {
    var select_material = "SELECT * FROM material WHERE belong_to_user_ID = ? AND material_Name = ? AND material_Rank = ?";
    var insert_mail = "INSERT INTO mail (Title, Date, Content, Send_from, Send_to, Type) VALUES ('Order: good deliver', ?, 'deliver order', ?, ?, 'Order')";
    var update_material = "UPDATE material SET material_Amount = (material_Amount - ?) WHERE  material_Name = ? AND material_Rank = ? "
    var insert_purchase = "INSERT INTO purchase (mail_id, product_name, product_price, product_rank, product_amount, product_discount, other_expense, send_date, arrive_deadline, address, country, flaw, exchange_deadline, pay_deadline, edit_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'unpaid')";
    var select_latest_mail = "SELECT mail_ID FROM mail WHERE Send_from = ? AND Send_to = ?";
    var select_finance_info = "SELECT country, address FROM finance WHERE belong_to_user_ID = ?";
    var select_address = "SELECT address, country FROM finance WHERE belong_to_user_ID = ? OR belong_to_user_ID = ?";

    let stu_id = input.stu_id;
    let product_name = input.product_name;
    let product_rank = input.product_rank;
    let product_amount = input.product_amount;
    let product_discount = input.product_discount;
    let product_price = input.product_price;
    let flaw = input.flaw;

    let have_material = 1;
    let send_to = input.to_stu_id;

    let date = new Date().toLocaleString();
    date = date.split(' ')
    let current_date = date[0]

    con.query(select_material, [stu_id, product_name, product_rank], function(err, material_res) {
        if(err) throw err;

        // no data corresponding with the input stu_id or product_info(name, rank)
        if(material_res[0] == null) {
            have_material = 0;
        }

        // insufficient material amount
        if(parseInt(product_amount) > parseInt(material_res[0].material_Amount)) {
            have_material = 0;
        }

        // check if have material
        if(!have_material) {
            console.log("error")
        } else {
            console.log(material_res);

            // update product amount in material
            // product_amount = product_amount - deliver_amount
            con.query(update_material, [product_amount, product_name, product_rank], function(err) {
                if(err) throw err;
                console.log("update material successfully");
            })
            
            // insert deliver order mail
            con.query(insert_mail, [current_date, stu_id, send_to], function(err) {
                if(err) throw err;
                console.log("insert mail successfully");

                // insert deliver information to purchase
                con.query(select_latest_mail, [stu_id, send_to], function(err, mail_id_res) {
                    if(err) throw err;

                    let res_length = mail_id_res.length;
                    let mail_id = mail_id_res[res_length - 1].mail_ID;

                    // select address and country
                    con.query(select_finance_info, [send_to], function(err, finance_res) {
                        if(err) throw err;

                        let country = finance_res[0].country;
                        let address = finance_res[0].address;

                        con.query(select_address, [stu_id, send_to], function(err, address_res) {
                            if(err) throw err;

                            let from_country = address_res[0].country;
                            let to_country = address_res[1].country;

                            let distance = country_distance(from_country, to_country);
                            let other_expense = 3000 + distance*1000;

                            // insert detail to purchase
                            con.query(insert_purchase, [mail_id, product_name, product_price, product_rank, product_amount, product_discount, other_expense, current_date, handleDay(current_date, 5), address, country, flaw, handleDay(current_date, 20), handleDay(current_date, 35)], function(err) {
                                if(err) throw err;

                                console.log("insert purchase successfully");
                            })

                        })

                    })   
                })
            })
        }
    })
}

// day addition
function handleDay(date, days){
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    res = res.toLocaleString();
    res = res.split(' ');
    return res[0];
}

