// 製造相關
// name: 名稱
// product_per_day: 每日生產量
// other_cost: 其他費用
// score: 用以計算成品等級
const component_product = [
    {
        name: '輪胎',
        product_per_day: 72,
        other_cost: 40,
        detail: [
            {
                type: 'A',
                score: 0,
                igd: ['A', 'B'],
                avg_cost: 440
            },
            {
                type: 'B',
                score: 1,
                igd: ['A', 'C'],
                avg_cost: 540
            }
        ],
        size: 2
    },
    {
        name: '內裝材料',
        product_per_day: 36,
        other_cost: 400,
        detail: [
            {
                type: 'C',
                score: 0,
                igd: ['A', 'B', 'D'],
                avg_cost: 1100
            },
            {
                type: 'D',
                score: 1,
                igd: ['A', 'C', 'D'],
                avg_cost: 1200
            }
        ],
        size: 2
    },
    {
        name: '引擎',
        product_per_day: 18,
        other_cost: 500,
        detail: [
            {
                type: 'E',
                score: 0,
                igd: ['A', 'B', 'C', 'E'],
                avg_cost: 1600
            },
            {
                type: 'F',
                score: 1,
                igd: ['B', 'C', 'D', 'E'],
                avg_cost: 1700
            }
        ],
        size: 3
    },
    {
        name: '底盤',
        product_per_day: 9,
        other_cost: 1000,
        detail: [
            {
                type: 'G',
                score: 0,
                igd: ['A', 'B', 'C', 'D', 'F'],
                avg_cost: 2400
            },
            {
                type: 'H',
                score: 1,
                igd: ['A', 'B', 'C', 'E', 'F'],
                avg_cost: 2700
            },
            {
                type: 'I',
                score: 2,
                igd: ['A', 'B', 'D', 'E', 'F'],
                avg_cost: 2700
            }
        ],
        size: 4
    }
]

const car_product = [
    {
        name: '休旅車',
        product_per_day: 24,
        other_cost: 6340,
        limit: [
            {
                igd: '輪胎',
                type: 'B'
            },
            {
                igd: '引擎',
                type: 'F'
            },
            {
                igd: '底盤',
                type: 'H'
            }
        ],
        size: 30
    },
    {
        name: '轎車',
        product_per_day: 36,
        other_cost: 3640,
        limit: [
            {
                igd: '輪胎',
                type: 'B'
            },
            {
                igd: '引擎',
                type: 'F'
            }
        ],
        size: 20
    },
    {
        name: '小型車',
        product_per_day: 48,
        other_cost: 2140,
        limit: [],
        size: 20
    },
    {
        name: '跑車',
        product_per_day: 12,
        other_cost: 12240,
        limit: [
            {
                igd: '輪胎',
                type: 'B'
            },
            {
                igd: '內裝材料',
                type: 'D'
            },
            {
                igd: '引擎',
                type: 'F'
            },
            {
                igd: '底盤',
                type: 'I'
            }
        ],
        size: 40
    }
]

const product = component_product.map((ele) => {return ele});
car_product.map(
    (item) => {
        product.push(item);
    }
)

function get_car_list() {
    return car_product;
}

function get_component_list() {
    return component_product;
}

function cal_time(name, amount) {
    let time = product.find(item => item.name === name);
    return Math.ceil(amount / time)
}

function cal_grade(igd) {
    let score = 0
    igd.map(
        (item) => {
            let item_score = product.find(pdt => pdt.name === item.name).score;
            score += item_score;
        }
    )
    switch (score) {
        case 0:
            return 'D';
        case 1:
            return 'C';
        case 2, 3:
            return 'B';
        case 4:
            return 'A';
        case 5:
            return 'S';
        default:
            console.log('unknown score');
            return;
    }
}

const shipping_list = [
    {
        start: '亞洲',
        target: [
            {
                name: '北美洲',
                num: 12
            },
            {
                name: '南美洲',
                num: 14
            },
            {
                name: '歐洲',
                num: 11
            },
            {
                name: '非洲',
                num: 10
            },
            {
                name: '大洋洲',
                num: 8
            }
        ]
    },
    {
        start: '北美洲',
        target: [
            {
                name: '亞洲',
                num: 12
            },
            {
                name: '南美洲',
                num: 6
            },
            {
                name: '歐洲',
                num: 10
            },
            {
                name: '非洲',
                num: 11
            },
            {
                name: '大洋洲',
                num: 13
            }
        ]
    },
    {
        start: '歐洲',
        target: [
            {
                name: '北美洲',
                num: 10
            },
            {
                name: '南美洲',
                num: 12
            },
            {
                name: '亞洲',
                num: 11
            },
            {
                name: '非洲',
                num: 6
            },
            {
                name: '大洋洲',
                num: 9
            }
        ]
    },
    {
        start: '南美洲',
        target: [
            {
                name: '北美洲',
                num: 6
            },
            {
                name: '亞洲',
                num: 14
            },
            {
                name: '歐洲',
                num: 12
            },
            {
                name: '非洲',
                num: 9
            },
            {
                name: '大洋洲',
                num: 10
            }
        ]
    },
    {
        start: '大洋洲',
        target: [
            {
                name: '北美洲',
                num: 13
            },
            {
                name: '南美洲',
                num: 10
            },
            {
                name: '歐洲',
                num: 9
            },
            {
                name: '非洲',
                num: 8
            },
            {
                name: '亞洲',
                num: 8
            }
        ]
    },
    {
        start: '非洲',
        target: [
            {
                name: '北美洲',
                num: 11
            },
            {
                name: '南美洲',
                num: 9
            },
            {
                name: '歐洲',
                num: 6
            },
            {
                name: '亞洲',
                num: 10
            },
            {
                name: '大洋洲',
                num: 8
            }
        ]
    }
]

function cal_size(itemList) {
    // console.log(product);
    let result = 0;
    for (let i=0; i < itemList.length; i++){
        result += product.find(
            (item) => item.name === itemList[i].name
        ).size*itemList[i].amount
    }
    return result;
}

function count_container(item) {
    let total_amount = item.map(
        (perItem) => {
            return perItem.amount;
        }
    ).reduce(
        (previousValue, currentValue) => previousValue + currentValue, 0
    );
    return Math.ceil(total_amount / 200)
}

function shipping_fee(start_containent, start_num, dest_continent, dest_num, container) {
    let fee = (
        start_containent === dest_continent ? 3000 :
            shipping_list.find(
                place => place.start === start_containent
            ).target.find(
                dest => dest.name === dest_continent).num * 500
    ) + (start_num + dest_num) * 100 + container * 1000;
    return fee;
}

function shipping_time(start_containent, start_num, dest_continent, dest_num) {
    return (
        start_containent === dest_continent ? 0 :
            shipping_list.find(
                (place) => place.start === start_containent
            ).target.find(
                (dest) => dest.name === dest_continent
            ).num
    ) * 5 + Math.round((start_num + dest_num) * 0.0416)
}

export { cal_size, get_component_list, get_car_list, cal_grade, shipping_fee, shipping_time, count_container, cal_time };