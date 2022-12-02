// 製造相關
// name: 名稱
// product_per_day: 每日生產量
// other_cost: 其他費用
// score: 用以計算成品等級
const product = [
    {
        name: '輪胎',
        product_per_day: 72,
        other_cost: 40,
        detail: [
            {
                type: '零件A',
                score: 0,
                igd: ['材料A', '材料B'],
                avg_cost: 440
            },
            {
                type: '零件B',
                score: 1,
                igd: ['材料A', '材料C'],
                avg_cost: 540
            }
        ]
    },
    {
        name: '內裝材料',
        product_per_day: 36,
        other_cost: 400,
        detail: [
            {
                type: '零件C',
                score: 0,
                igd: ['材料A', '材料B', '材料D'],
                avg_cost: 1100
            },
            {
                type: '零件D',
                score: 1,
                igd: ['材料A', '材料C', '材料D'],
                avg_cost: 1200
            }
        ]
    },
    {
        name: '引擎',
        product_per_day: 18,
        other_cost: 500,
        detail: [
            {
                type: '零件E',
                score: 0,
                igd: ['材料A', '材料B', '材料C', '材料E'],
                avg_cost: 1600
            },
            {
                type: '零件F',
                score: 1,
                igd: ['材料B', '材料C', '材料D', '材料E'],
                avg_cost: 1700
            }
        ]
    },
    {
        name: '底盤',
        product_per_day: 9,
        other_cost: 1000,
        detail: [
            {
                type: '零件G',
                score: 0,
                igd: ['材料A', '材料B', '材料C', '材料D', '材料F'],
                avg_cost: 2400
            },
            {
                type: '零件H',
                score: 1,
                igd: ['材料A', '材料B', '材料C', '材料E', '材料F'],
                avg_cost: 2700
            },
            {
                type: '零件I',
                score: 2,
                igd: ['材料A', '材料B', '材料D', '材料E', '材料F'],
                avg_cost: 2700
            }
        ]
    },
    {
        name: '休旅車',
        product_per_day: 24,
        other_cost: 6340,
        limit: [
            {
                igd: '輪胎',
                type: '零件B'
            },
            {
                igd: '引擎',
                type: '零件F'
            },
            {
                igd: '底盤',
                type: '零件H'
            }
        ]
    },
    {
        name: '轎車',
        product_per_day: 36,
        other_cost: 3640,
        limit: [
            {
                igd: '輪胎',
                type: '零件B'
            },
            {
                igd: '引擎',
                type: '零件F'
            }
        ]
    },
    {
        name: '小型車',
        product_per_day: 48,
        other_cost: 2140,
        limit: []
    },
    {
        name: '跑車',
        product_per_day: 12,
        other_cost: 12240,
        limit: [
            {
                igd: '輪胎',
                type: '零件B'
            },
            {
                igd: '內裝材料',
                type: '零件D'
            },
            {
                igd: '引擎',
                type: '零件F'
            },
            {
                igd: '底盤',
                type: '零件I'
            }
        ]
    }
]

function get_product_list() {
    return product;
}

function cal_time(name, amount) {
    time = product.find(item => item.name === name);
    return Math.round(amount / time)
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

function count_container(item) {
    total_amount = item.map(
        (perItem) => {
            return perItem.amount;
        }
    ).reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );
}

function shipping_fee(start_containent, start_num, dest_continent, dest_num, container) {
    let fee = (
        start_containent === dest_continent ? 3000 :
            shipping_list.find(
                place => place.start === start_containent
            ).find(
                dest => dest.name === dest_continent).num * 500
    ) + (start_num + dest_num) * 100 + container * 1000;
    return fee;
}