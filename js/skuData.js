(function () {
    
    let TotalData = JSON.parse(localStorage["packSkuDatas"]);
    let value = Number(localStorage.getItem('SKUDATA'))
   
    const data =  TotalData.filter(data => data.PACK_NO == value)
    var skuData =[];
    data.forEach((value,index) => {
        skuData.push(` 
            <tr>
            <td>${index+1}</td>
            <td>${value.SKU_NAME}</td>
            <td>${value.SKU_QTY}</td>
            <td>${value.PACK_EXPIRY}</td>
            </tr>
		`)
    }) 

    let str = skuData.toString().replaceAll(',', '');
    document.getElementById('skuData').innerHTML = str
})();