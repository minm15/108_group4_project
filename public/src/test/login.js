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
    //loginCheck(108306013, 345)
    signUp(getUserInfo(108306083), "Ben", "S")
});

// 輸入帳號生成密碼
function getUserInfo(account) {
    var password = randomPassword();
    var userInfo = []
    userInfo.push(account);
    userInfo.push(password);  
    return userInfo; 
}

// generate password
function randomPassword() {
    var seed = new Array('a','b','c','d','e','f','g','h','i','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z',
    '0','1','2','3','4','5','6','7','8','9'
    );
    seedlength = seed.length;//陣列長度
    var createPassword = '';
    for (i=0;i<8;i++) {
        j = Math.floor(Math.random()*seedlength);
        createPassword += seed[j];
    }
    return createPassword;
}

function loginCheck(account, password) {
    var checkAccountSql = "SELECT count(*) AS existCount FROM student WHERE Account = " + account;
    con.query(checkAccountSql, function (err, result) {
        if(err) throw err;
        if(result[0].existCount == 0) {
            console.log("this account is not existed")// 帳號未註冊
        } else {
            var checkPasswordSql = "SELECT count(*) AS checkCount FROM student WHERE Account = " + account + " AND Password = " + '"' + password + '"';
            con.query(checkPasswordSql, function (err, result) {
                if(err) throw err;
                if(result[0].checkCount == 0) { 
                    console.log("incorrect password")// 密碼錯誤
                } else {
                    console.log("login successed!")// 登入成功
                }
            });
        }
    });
}

function signUp(userInfo, name, type) {
    var userAccount = userInfo[0];
    var userPassword = userInfo[1];

    // 檢查是否有重複帳號
    var sql = "SELECT count(*) AS accountCount FROM student WHERE Account = " + userAccount;
    con.query(sql, function (err, result) {
        if(err) throw err;
        // this account is not in the database
        if(result[0].accountCount == 0) {
            var insertSql = "INSERT INTO student (ID, Name, Account, Password, Block_Chain_Point, Type) VALUES (" + userAccount + ","
                                                                                                                + '"' + name + '"' + ","
                                                                                                                + userAccount + ","
                                                                                                                + '"' + userPassword + '"' + ","
                                                                                                                + 0 + ","
                                                                                                                + '"' + type + '"'
                                                                                                                + ")";
            con.query(insertSql, function (err, result) {
                if(err) throw err;
                console.log(userAccount + " sign up successed!")
            });     
        } else {
            console.log("this account has existed.")
        }
    });
}