const mf_list = [
    {
        id: '01',
        product: "輪胎",
        target: {
            type: "A",
            amount: 72
        },
        mistake: "無",
        ingredient: [
            {
                name: "材料B",
                amount: 72,
                type: "無",
                cost: 110
            },
            {
                name: "材料A",
                amount: 72,
                type: "無",
                cost: 100
            }
        ],
        expense: 720,
        total_cost: 15840,
        time: "1天",
        finish_date: "2022-4-30", 
        purpose: "商品目錄"
    },
    {
        id: '02',
        product: "轎車",
        target: {
            type: "休旅車",
            amount: 90,
            rank: "S"
        },
        ingredient: [
            {
                name: "輪胎",
                type: "B",
                amount: 360,
                cost: 97200
            },
            {
                name: "輪胎",
                type: "B",
                amount: 180,
                cost: 48600
            },
            {
                name: "車殼",
                type: "D",
                amount: 90,
                cost: 49500
            },
            {
                name: "引擎",
                type: "F",
                amount: 90,
                cost: 76500
            },
            {
                name: "系統",
                type: "I",
                amount: 12150
            }
        ],
        expense: 285300,
        total_cost: 569250,
        time: "10天",
        finish_date: "2022-3-10",
        purpose: "訂單"
    }
]

function get_producing_list() {
    return mf_list;
}

export default get_producing_list;