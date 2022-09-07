const constractList = [
    {
        id: '0101',
        buyer: 'Takodachi汽車',
        package: [
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
        status: '下訂',
        origin: '',
        sufficient: true
    },
    {
        id: '0102',
        buyer: 'Takodachi汽車',
        package: [
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
        status: '換貨',
        origin: '0101',
        sufficient: false
    },
    {
        id: '0103',
        buyer: 'Takodachi汽車',
        package: [
            {
                id: '131',
                name: '休旅車（油）',
                type: '大眾',
                amount: 40,
                price: 3170
            }
        ],
        status: '換貨',
        origin: '',
        sufficient: true
    }
]

function get_contract_list() {
    return constractList;
}

export default get_contract_list;