
//在倉庫佔據的空間比例
export const  warehouseSpace= [
    //空間位置       成品           材料
    {  "empty": 35, "good": 35, "ingredient": 30 },

];
export const good=[
    {
        rank: "A",
        name: "商品A",
        amount: 10
   },
   {
    rank: "B",
    name: "商品B",
    amount: 10
}
];
export const ingredient=[
    {
        rank: "A",
        name: "材料A",
        amount: 10
   },
   {
    rank: "B",
    name: "材料B",
    amount: 10
}
];
export  default {warehouseSpace,good,ingredient};