(function () {
    
    let pdata = JSON.parse(localStorage["packDatas"]);
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
