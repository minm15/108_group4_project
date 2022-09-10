const letter_list = [
    {
        id: '1101',
        sender: '可愛小秘書',
        sender_type: '其他',
        letter_type: 'operation',
        title: '【費用調控】請您審核公司支出規劃',
        expired: '到期',
        time: '2022-6-14'
    },
    {
        id: '1102',
        sender: 'WAH公司',
        sender_type: '供應',
        letter_type: 'quotation',
        title: '【報價單】WAH公司之報價單',
        expired: '',
        time: '2022-6-14',
        quotate: [
            {
                id: '01',
                name: '輪胎',
                price: 300
            },
            {
                id: '02',
                name: '引擎',
                price: 600
            }
        ]
    },
    {
        id: '1103',
        sender: 'Takodachi公司',
        sender_type: '製造',
        letter_type: 'contract_draft',
        title: '【訂單草稿】Takodachi公司之下訂',
        expired: '',
        time: '2022-6-14',
        amountList: [
            {
                id: '01',
                name: '輪胎',
                price: 300,
                amount: 40,
            },
            {
                id: '02',
                name: '引擎',
                price: 600,
                amount: 10
            }
        ],
        arrive: '2022-7-31',
        address: 'Takodachi公司',
        addressLoc: '美國',
        flaw: '讓價',
        flawDate: '',
        pay: '2022-8-1'
    },
    {
        id: '1104',
        sender: 'WAH公司',
        sender_type: '供應',
        letter_type: 'contract_edit',
        title: '【訂單調整】請您確認調整後的訂單',
        expired: '',
        time: '2022-6-14',
        amountList: [
            {
                id: '01',
                name: '輪胎',
                price: 300,
                amount: 40,
                discount: 0.8,
                cantProvide: false
            }
        ],
        arrive: '2022-7-31',
        address: 'Takodachi公司',
        addressLoc: '美國',
        flaw: '換貨',
        flawDate: '2022-8-15',
        pay: '2022-8-1'
    }
]

function get_letter_list(user, letter_type) {
    return letter_list;
}

export default get_letter_list;