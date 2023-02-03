(function () {
    let pdata = JSON.parse(localStorage["packDatas"]);
     console.log(pdata);

     let TotalData = JSON.parse(localStorage["packSkuDatas"]);
     console.log(TotalData)

     const data =  TotalData.filter(data => data.PACK_NO == 1)
     console.log(data)
})();




