import moment from 'moment';
// 紀錄：我是從harbor_list開始接的

function get_current_date() {
    let date = moment().format("X");
    var current_time = moment.unix(date).format();
    //document.getElementById('current_time').innerHTML += "<label id='time'> " + current_time + "</label>";
    // document.getElementById('time').innerHTML += '<br>現在時間: ' + convert_date_format(current_time);
    // console.log(current_time + ' -> ' + convert_date_format(current_time));
    return current_time;
}

// 10 sec = 1 day
function calculate_time() {
    // start time
    var start_day = "2022-10-21";
    var old_date = moment([2022, 9, 21]).unix()

    // current time
    let new_date = moment().format("X");

    var difftime = new_date - old_date;  // calculate difference between start and current

    // 2022-09-03T20:57:06+08:00
    var true_start_time = moment.unix(old_date).format();
    var true_current_time = moment.unix(new_date).format();
    // console.log(moment([2022,10,21]));

    // calculate game time
    var turn_to_day = Math.floor(difftime / 10) // turn second to day
    var game_current_day = moment([2022, 0, 1]).add(turn_to_day, 'days').format();

    // console.log("start: ", true_start_time, '\n', "now: ", true_current_time, '\n', "diff: ", difftime);
    // console.log("game_day: ", game_current_day)

    // convert date format
    // console.log('現實開始時間: ' + convert_date_format(true_start_time) + '/n遊戲內部開始時間: ' + start_day + '/n現實當下時間: ' + convert_date_format(true_current_time) + '/n現實時間過了' + difftime + '秒' + ' 轉換成內部時間' + turn_to_day + '天' + '/n遊戲內部當前時間: ' + convert_date_format(game_current_day));
    // document.getElementById('result').innerHTML += '<br>現實開始時間: ' + convert_date_format(true_start_time) + '<br>遊戲內部開始時間: ' + start_day + '<br>現實當下時間: ' + convert_date_format(true_current_time) + '<br><br>現實時間過了' + difftime + '秒' + ' 轉換成內部時間' + turn_to_day + '天' + '<br>遊戲內部當前時間: ' + convert_date_format(game_current_day)

    return {
        start: convert_date_format(true_start_time),
        game_start: start_day,
        now: convert_date_format(true_current_time),
        diff: difftime,
        game_day: convert_date_format(game_current_day)
    }
}

function cal_input_date(target_time, add_time) {
    return convert_date_format(moment(Date.parse(target_time)).add(add_time, 'days').format());
}

function diff_time(timeA, timeB) {
    const a = moment(Date.parse(timeA));
    const b = moment(Date.parse(timeB));
    // console.log(typeof(a.diff(b,'days')));
    // console.log(a>b);
    return a.diff(b, 'days', true);
}

// convert ISO8601 date format
function convert_date_format(date) {
    let new_date = date.split('T');
    // let new_time = new_date[1].split('+')
    // let result = new_date[0] + " " + new_time[0]
    let result = new_date[0]
    return result
}

export { get_current_date, calculate_time, cal_input_date, diff_time };