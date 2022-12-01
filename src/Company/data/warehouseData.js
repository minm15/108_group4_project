
//在倉庫佔據的空間比例
export const warehouseSpace = [
    //空間位置       成品           材料
    { "empty": 15, "good": 80, "ingredient": 5 },

];
export const good = [
    {
        rank: "A",
        name: "小型車",
        amount: 40
    }
];
export const ingredient = [
    {
        rank: "A",
        name: "輪胎",
        amount: 10
    },
    {
        rank: "C",
        name: "內裝材料",
        amount: 15
    }
];
export default { warehouseSpace, good, ingredient };