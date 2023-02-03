(function () {
    
    let TotalData = JSON.parse(localStorage["packSkuDatas"]);
    console.log(TotalData)
    const data =  TotalData.filter(data => data.PACK_NO == value)
    console.log(data)


})();