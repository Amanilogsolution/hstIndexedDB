const idb = window.indexedDB;

(function () {
  document.getElementById("loading").style.display = "flex";
  let TotalData = JSON.parse(localStorage["packSkuDatas"]);
  let value = Number(localStorage.getItem("SKUDATA"));

  const data = TotalData.filter((data) => data.PACK_NO == value);
  var skuData = [];
  data.forEach((value, index) => {
    skuData.push(` 
            <tr class="text-center" style="font-size:12px">
            <td>${index + 1}</td>
            <td class="text-wrap">${value.SKU_NAME}</td>
            <td>${value.SKU_QTY}</td>
            <td>${value.PACK_EXPIRY}</td>
            </tr>
		`);
  });
  document.getElementById("loading").style.display = "none";
  let str = skuData.toString().replaceAll(",", "");
  document.getElementById("skuData").innerHTML = str;
})();

// Download code
function removeDuplicatespack(data) {    
  let filteredpackdata=[]
  const stockData = getUniqueListBypackcode(data, "CC_EPCNO");
  stockData.map((ele)=>{
      const dataval =  data.filter(({CC_EPCNO}) => 
      [CC_EPCNO].some((val)=> val.includes(ele.CC_EPCNO))
      )
      const stockData = getUniqueListBypackcode(dataval, "PACK_CODE");
      uniqueArr = removeDuplicates(dataval);
      for(i=0;i<stockData.length;i++){
        var count = 0;
        var balance = 0;

        uniqueArr.filter((data)=>{
          if (data.PACK_NAME === stockData[i]["PACK_NAME"]) {
            count = count + 1;
            data.Status == "N" ? (balance = balance + 1) : null;
          } else {
            null;
          }
          stockData[i]["Count"] = count;
          stockData[i]["PACK_QTY"] = balance;

        })

      }

   setTimeout(()=>{


    console.log('Stock',stockData)
    for(i=0;i<stockData.length;i++){
      console.log(stockData[i].PACK_QTY)


      filteredpackdata.push({
        "MC_NO":stockData[i]['MC_NO'],
          "CC_NO":stockData[i]['CC_NO'],
          "PACK_CODE":stockData[i]['PACK_CODE'],
          "PACK_NAME":stockData[i]['PACK_NAME'],
          "PACK_BATCHNO":stockData[i]['PACK_BATCHNO'],
          "PACK_EXPIRY":stockData[i]['PACK_EXPIRY'],
        "PACK_QTY":stockData[i].PACK_QTY    
       })
    }

   },1000)


})


setTimeout(()=>{
  var data, filename, link;
  var csv = 'data:text/json;charset=utf-8,' + JSON.stringify(filteredpackdata);
        filename = 'jsonDataForTab.json';
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();

 },2000) 



}

function getUniqueListBypackcode(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}


function downloadCSV(args) {

const ldb = idb.open("CRM", 2);
ldb.onsuccess = function () {
const db = ldb.result;
const txn = db.transaction("tbl_rfid", "readonly");
const store = txn.objectStore("tbl_rfid");
const index = store.index("PACK_EPC");
let query = index.getAll();
query.onsuccess = (event) => {
  if (!event.target.result) {
    console.log(`this ${value} not match`);
  } else {
    console.log(event.target.result);
    removeDuplicatespack(event.target.result);

  }
};
};


}



function removeDuplicates(arr) {
  (seen = Object.create(null)),
    (result = arr.filter((o) => {
      var key = ["PACK_NAME", "PACK_EPC"].map((k) => o[k]).join("|");
      if (!seen[key]) {
        seen[key] = true;
        return true;
      }
    }));
  return result;
}
