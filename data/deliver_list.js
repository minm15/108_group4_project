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
        send_date: '2460-07-22',
        arrange_time: 20,
        actual_time: 30
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
        send_date: '2460-07-01',
        arrange_time: 20,
        actual_time: 17
    }
];

function get_deliver_list() {
    return deliverList;
}

export default get_deliver_list;