//其他公司頁面中的所有公司資料
const companyList = [
    {
      // id: "1",
      name: "Poha股份有限公司",
      company_type: "供應",
      company_id: "001",
      productList: [
        "車殼",
        "輪胎",
        "獨家",
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },
        
        {
          "content": [
              {
                  "product_name": "車殼",
                  "product_price": "15萬起",
                  "product_level": [
                      "A",
                      "B"
                  ],
                  "product_tag": "所有",
                  "product_desc": "這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快"
              },
              {
                  "product_name": "輪胎",
                  "product_price": "五千",
                  "product_level": [
                      "B",
                      "A",
                      "C",
                      "D",
                      "E"
                  ],
                  "product_tag": "",
                  "product_desc": ""
              },
              {
                  "product_name": "板金",
                  "product_price": "156",
                  "product_level": [
                      "C"
                  ],
                  "product_tag": "我不知道",
                  "product_desc": ""
              },
              {
                "product_name": "車殼",
                "product_price": "15萬起",
                "product_level": [
                    "A",
                    "B"
                ],
                "product_tag": "所有",
                "product_desc": "這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快"
            },
            {
                "product_name": "輪胎",
                "product_price": "五千",
                "product_level": [
                    "B",
                    "A",
                    "C",
                    "D",
                    "E"
                ],
                "product_tag": "",
                "product_desc": ""
            },
            {
                "product_name": "板金",
                "product_price": "156",
                "product_level": [
                    "C"
                ],
                "product_tag": "我不知道",
                "product_desc": ""
            },
            {
              "product_name": "車殼",
              "product_price": "15萬起",
              "product_level": [
                  "A",
                  "B"
              ],
              "product_tag": "所有",
              "product_desc": "這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快"
          },
          {
              "product_name": "輪胎",
              "product_price": "五千",
              "product_level": [
                  "B",
                  "A",
                  "C",
                  "D",
                  "E"
              ],
              "product_tag": "",
              "product_desc": ""
          },
          {
              "product_name": "板金",
              "product_price": "156",
              "product_level": [
                  "C"
              ],
              "product_tag": "我不知道",
              "product_desc": ""
          }
          ],
          "title": "九個商品的目錄",
          "catalog_id": "7144e93e-ee6e-45fb-a292-8234722ea45f"
        },
        {
          "content": [
              {
                  "product_name": "車殼",
                  "product_price": "15萬起",
                  "product_level": [
                      "A",
                      "B"
                  ],
                  "product_tag": "所有",
                  "product_desc": "這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快"
              },
              {
                  "product_name": "輪胎",
                  "product_price": "五千",
                  "product_level": [
                      "B",
                      "A",
                      "C",
                      "D",
                      "E"
                  ],
                  "product_tag": "",
                  "product_desc": ""
              },
              {
                  "product_name": "板金",
                  "product_price": "156",
                  "product_level": [
                      "C"
                  ],
                  "product_tag": "我不知道",
                  "product_desc": ""
              },
              {
                  "product_name": "引擎",
                  "product_price": "555",
                  "product_level": [],
                  "product_tag": "",
                  "product_desc": ""
              }
          ],
          "title": "四個商品的目錄",
          "catalog_id": "483c9e2f-61e2-4ed9-bdcb-7be7db38427c"
        },
        {
          "content": [
              {
                  "product_name": "車殼",
                  "product_price": "15萬起",
                  "product_level": [
                      "A",
                      "B"
                  ],
                  "product_tag": "所有",
                  "product_desc": "這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快"
              },
              {
                  "product_name": "輪胎",
                  "product_price": "五千",
                  "product_level": [
                      "B",
                      "A",
                      "C",
                      "D",
                      "E"
                  ],
                  "product_tag": "",
                  "product_desc": ""
              },
              {
                  "product_name": "板金",
                  "product_price": "156",
                  "product_level": [
                      "C"
                  ],
                  "product_tag": "我不知道",
                  "product_desc": ""
              },
              {
                  "product_name": "引擎",
                  "product_price": "555",
                  "product_level": [],
                  "product_tag": "",
                  "product_desc": ""
              },
              {
                  "product_name": " ",
                  "product_price": "",
                  "product_level": [],
                  "product_tag": "",
                  "product_desc": ""
              },
              {
                  "product_name": "引擎",
                  "product_price": "5",
                  "product_level": [
                      "E"
                  ],
                  "product_tag": "",
                  "product_desc": ""
              }
          ],
          "title": "六個商品的目錄下中N",
          "catalog_id": "fbca91c3-6bcc-49b1-9815-db510921aefc"
        }
        
          ],
    },
    {
      // id: "2",
      name: "Upma股份有限公司",
      company_type: "供應",
      company_id: "002",
      productList: [
        "車殼",
        "輪胎",
        "引擎",
        
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
  catalogList:[],
    },
    {
      // id: "3",
      name: "Cheela股份有限公司",
      company_type: "供應",
      company_id: "003",
      productList: [
        "車殼",
        "輪胎",
        "引擎",
        "保險桿",
        
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },
        
        {
          "content": [
              {
                  "product_name": "車殼",
                  "product_price": "15萬起",
                  "product_level": [
                      "A",
                      "B"
                  ],
                  "product_tag": "所有",
                  "product_desc": "這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快"
              },
              {
                  "product_name": "輪胎",
                  "product_price": "五千",
                  "product_level": [
                      "B",
                      "A",
                      "C",
                      "D",
                      "E"
                  ],
                  "product_tag": "",
                  "product_desc": ""
              },
              {
                  "product_name": "板金",
                  "product_price": "156",
                  "product_level": [
                      "C"
                  ],
                  "product_tag": "我不知道",
                  "product_desc": ""
              },
              {
                "product_name": "車殼",
                "product_price": "15萬起",
                "product_level": [
                    "A",
                    "B"
                ],
                "product_tag": "所有",
                "product_desc": "這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快"
            },
            {
                "product_name": "輪胎",
                "product_price": "五千",
                "product_level": [
                    "B",
                    "A",
                    "C",
                    "D",
                    "E"
                ],
                "product_tag": "",
                "product_desc": ""
            },
            {
                "product_name": "板金",
                "product_price": "156",
                "product_level": [
                    "C"
                ],
                "product_tag": "我不知道",
                "product_desc": ""
            },
            {
              "product_name": "車殼",
              "product_price": "15萬起",
              "product_level": [
                  "A",
                  "B"
              ],
              "product_tag": "所有",
              "product_desc": "這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快 這是一種不錯的輪胎 速度快"
          },
          {
              "product_name": "輪胎",
              "product_price": "五千",
              "product_level": [
                  "B",
                  "A",
                  "C",
                  "D",
                  "E"
              ],
              "product_tag": "",
              "product_desc": ""
          },
          {
              "product_name": "板金",
              "product_price": "156",
              "product_level": [
                  "C"
              ],
              "product_tag": "我不知道",
              "product_desc": ""
          }
          ],
          "title": "九個商品的目錄",
          "catalog_id": "7144e93e-ee6e-45fb-a292-8234722ea45f"
        },],
    },
    {
      // id: "4",
      name: "Channa Kulcha股份有限公司",
      company_type: "製造",
      company_id: "004",
      productList: [
        "車殼",
        "輪胎",
        "引擎",
        "保險桿",
        "板金"
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },
      ],
    },
    {
      // id: "5",
      name: "Egg Curry股份有限公司",
      company_type: "製造",
      company_id: "005",
      productList: [
       
        "引擎",
        "保險桿",
        "板金"
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },],
    },
    {
      // id: "6",
      name: "Paneer Aachari股份有限公司",
      company_type: "製造",
      company_id: "006",
      productList: [
        "車殼",

        "保險桿",
        "板金"
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },],
    },
    {
      // id: "7",
      name: "Fish Fry股份有限公司",
      company_type: "材料",
      company_id: "007",
      productList: [
        "車殼",
      
        "板金"
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },],
    },
    {
      // id: "8",
      name: "Dum Alloo股份有限公司",
      company_type: "材料",
      company_id: "008",
      productList: [
       
        "保險桿",
        "板金"
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },],
        
    },
    {
      // id: "9",
      name: "Malai Kofta股份有限公司",
      company_type: "材料",
      company_id: "009",
      productList: [
        "車殼",
        "輪胎",
      
        "板金"
      ],  
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },],
    },
    {
      // id: "10",
      name: "賣車的股份有限公司",
      company_type: "車商",
      company_id: "010",
      productList: [
        "車殼",
        "輪胎",
        "引擎",
        "保險桿",
        "板金"
      ], 
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },],
    },
    {
      // id: "11",
      name: "王小明股份有限公司",
      company_type: "供應",
      company_id: "011",
      productList: [
        "車殼",

        "板金"
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },],
        
    },
    {
      // id: "12",
      name: "陳小華股份有限公司",
      company_type: "製造",
      company_id: "012",
      productList: [
        "車殼",
        "輪胎",
        "引擎",
        "保險桿",
        "板金"
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },],
        
    },
    {
      // id: "13",
      name: "楊大明股份有限公司",
      company_type: "材料",
      company_id: "013",
      productList: [
        "車殼",
       
      ],
    },
    {
      // id: "14",
      name: "葉大神股份有限公司",
      company_type: "車商",
      company_id: "014",
      productList: [
        "車殼",
        "輪胎",
        "引擎",
        "保險桿",
        "板金"
      ],
      finanData:[
        {
        name: 'income',
        amount:5000
        },
        {
          name: 'expense',
          amount:2000
        },
        {
          name: 'revenue',
          amount:3000
        },
        ],
        cooperateList:[
          {
          name: '王曉明的公司',
          company_type: '製造'
          },
          {
          name: '小紅的公司',
          company_type: '製造'
              },
        ],
        catalogList: [
          {
            "content": [
                {
                    "product_name": "車殼",
                    "product_price": "15萬起",
                    "product_level": [
                        "A",
                        "B"
                    ],
                    "product_tag": "所有",
                    "product_desc": ""
                },
                {
                    "product_name": "輪胎",
                    "product_price": "五千",
                    "product_level": [
                        "B",
                        "A",
                        "C",
                        "D",
                        "E"
                    ],
                    "product_tag": "",
                    "product_desc": ""
                }
            ],
            "title": "兩個商品的目錄",
            "catalog_id": "d6ce5680-e9e4-40eb-b238-39cba8e1514d"
        },],
    },
  ];
  
  export default companyList;
  
  