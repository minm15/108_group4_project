import {levelList} from './serviceList.js'; 

/*以下list1~list5為不同設施的等級文字資料*/

//倉庫
export const list1=    [
  { //0
    id: 1,
    effect: "160單位",
    cost: '0',
    state: 1-levelList[0],
  },{
    id: 2,
    effect: "180單位",
    cost: '150萬/1個月',
    state: 2-levelList[0],
  },{
    id: 3,
    effect: "200單位",
    cost: '150萬/1個月',
    state: 3-levelList[0],
  }
  ,{
    id: 4,
    effect: "250單位",
    cost: '200萬/1個月',
    state: 4-levelList[0],
  }
  ,{ //4
    id: 5,
    effect: "400單位",
    cost: '300萬/3個月',
    state:  5-levelList[0],
  }
  ,{ 
    id: 6,
    effect: "已達滿等",
    cost: '',
  }
  ];
  //生產
  export  const list2=    [
    { //0
      id: 1,
      effect: "100%	",
      cost: '0',
      state: 1-levelList[1],
    },{
      id: 2,
      effect: "120%	",
      cost: '150萬/1個月',
      state:  2-levelList[1],
    },{
      id: 3,
      effect: "180%		",
      cost: '150萬/1個月',
      state: 3-levelList[1],
    }
    ,{
      id: 4,
      effect: "200%",
      cost: '200萬/1個月',
      state: 4-levelList[1],
    }
    ,{ //4
      id: 5,
      effect: "增加良品",
      cost: '300萬/3個月',
      state: 5-levelList[1],
    }
    ,{ 
      id: 6,
      effect: "已達滿等",
      cost: '',
    }
    ];
    //品質
    export const list3=    [
  {
    id: 1,
    effect: "普通品質",
    cost: '0',
    state: 1-levelList[2],
  },{
    id: 2,
    effect: "減少差品",
    cost: '150萬/1個月',
    state: 2-levelList[2],
  },{
    id: 3,
    effect: "誤差較小",
    cost: '150萬/1個月',
    state: 3-levelList[2],
  }
  ,{
    id: 4,
    effect: "毫無差品",
    cost: '200萬/1個月',
    state: 4-levelList[2],
  }
  ,{
    id: 5,
    effect: "增加良品",
    cost: '300萬/3個月',
    state: 5-levelList[2],
  }
  ,{ 
    id: 6,
    effect: "已達滿等",
    cost: '',
  }
  ];
  //商品
  export const list4=    [
    {
      id: 1,
      effect: "無",
      cost: '0',
      state: 1-levelList[3],
    },{
      id: 2,
      effect: "更多類型",
      cost: '150萬/1個月',
      state: 2-levelList[3],
    },{
      id: 3,
      effect: "解鎖A級",
      cost: '150萬/1個月',
      state: 3-levelList[3],
    }
    ,{
      id: 4,
      effect: "更多品項",
      cost: '200萬/1個月',
      state: 4-levelList[3],
    }
    ,{
      id: 5,
      effect: "耗材減少",
      cost: '300萬/3個月',
      state: 5-levelList[3],
    }
    ,{ 
      id: 6,
      effect: "已達滿等",
      cost: '',
    }
    ];
    //工廠規模
    export const list5=    [
      {
        id: 1,
        effect: "3個欄位",
        cost: '0',
        state: 1-levelList[4],
      },{
        id: 2,
        effect: "產能提升",
        cost: '150萬/1個月',
        state: 2-levelList[4],
      },{
        id: 3,
        effect: "4個欄位",
        cost: '150萬/1個月',
        state:3-levelList[4],
      }
      ,{
        id: 4,
        effect: "產能提升",
        cost: '200萬/1個月',
        state: 4-levelList[4],
      }
      ,{
        id: 5,
        effect: "5個欄位",
        cost: '300萬/3個月',
        state: 5-levelList[4],
      }
      ,{ 
        id: 6,
        effect: "已達滿等",
        cost: '',
      }
      ];

      export  default {list1,list2,list3,list4,list5
      };