const deliverList = [
    {
        id: '0101',
        receiver: 'Takodachi汽車',
        package : [
            {
                id: '001',
                name: '輪胎',
                type: 'A',
                amount: 40,
                price: 250
            },
            {
                id: '002',
                name: '車殼',
                type: 'C',
                amount: 10,
                price: 600
            }
        ],
        sender: 'WAH汽車零件供應商',
        send_date: '2022-03-17',
        arrange_time: '20天',
        actual_time: '30天',
        arrive_date: '2022-04-07'
    },
    {
        id: '0200',
        receiver: 'WAH汽車零件供應商',
        package : [
            {
                id: '001',
                name: '材料A',
                type: '',
                amount: 40,
                price: 110
            },
            {
                id: '002',
                name: '材料B',
                type: '',
                amount: 10,
                price: 100
            }
        ],
        sender: '大直材料廠',
        send_date: '2022-03-27',
        arrange_time: '20天',
        actual_time: '17天',
        arrive_date: '2022-04-17'
    }
];

function get_deliver_list() {
    return deliverList;
}

export default get_deliver_list;