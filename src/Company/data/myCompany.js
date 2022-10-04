  //user這間公司所需的所有資料

 import{income,expense,revenue,finanData} from "./finanData";
 import catalogList from "./catalogList"
 import {levelList } from "./serviceList"
 import {warehouseSpace,good,ingredient} from './warehouseData.js';
 import cooperateList from "./cooperateList";
 import myProductList from "./myProductList";
 const myCompany=[
    {
      name: "Wah汽車材料股份有限公司",
      company_id: "001",
      company_type:"供應",
      productList: [
        "車殼",
        "輪胎",
        "獨家",
      ],
      finanData:finanData,
      income:income,
      expense:expense,
      revenue:revenue,
      catalogList:catalogList,
      levelList:levelList,
      warehouseSpace:warehouseSpace,
      good:good,
      ingredient:ingredient,
      cooperateList:cooperateList,
      myProductList:myProductList,
    }
]

export default myCompany;
