(function () {
    
    let pdata = JSON.parse(localStorage["packDatas"]);
     console.log(pdata);


 

    var packCubeData =[];
    pdata.forEach((value,index) => {
        packCubeData.push(` 
            <tr onclick="dataDetils(${value.PACK_NO})">
            <td>${index+1}</td>
            <td>${value.PACK_NAME}</td>
            <td>${value.SKU_QTY}</td>
            <td>${value.PACK_EXPIRY}</td>
            </tr>
		`)
    }) 
    let str = packCubeData.toString().replaceAll(',', '');
    document.getElementById('packData').innerHTML = str
})();

function dataDetils(value){

    let skudata = localStorage.setItem('SKUDATA',value);
    let TotalData = JSON.parse(localStorage["packSkuDatas"]);
    //console.log(TotalData)
    const data =  TotalData.filter(data => data.PACK_NO == value)
    console.log(data)


}




