(function () {
    
    let pdata = JSON.parse(localStorage["packDatas"]);
    let pSkudata = JSON.parse(localStorage["packSkuDatas"]);

     for(i=0;i<pdata.length;i++){
     var count = 0
     var balance = 0
     pSkudata.filter((data)=> { 
        //  data.PACK_NAME===pdata[i]['PACK_NAME']?count=count+1:null
         if(data.PACK_NAME===pdata[i]['PACK_NAME']){
            count=count+1
            data.Status==""?balance=balance+1:null
         }else{
            null
         }
         pdata[i]['SKU_QTY'] = count
         pdata[i]['Balance_QTY'] = balance

     })
    }
    console.log(pdata)


    var packCubeData =[];
    pdata.forEach((value,index) => {
        packCubeData.push(` 
            <tr onclick="dataDetils(${value.PACK_NO})" class="text-center" style="font-size:14px">
            <td>${index+1}</td>
            <td>${value.PACK_NAME}</td>
            <td>${value.SKU_QTY}</td>
            <td>${value.Balance_QTY}</td>
            <td><img src="img/childCube.png" width="60" height="60" alt="logo"></td>
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
  
    window.location.href='skudata.html'


}




