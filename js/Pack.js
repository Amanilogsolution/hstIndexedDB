const idb = window.indexedDB;
(function () {
  document.getElementById("loading").style.display = "flex";
  let pdata = JSON.parse(localStorage["packDatas"]);
  let pSkudata = JSON.parse(localStorage["packSkuDatas"]);

  uniqueArr = removeDuplicates(pSkudata);
  console.log(uniqueArr)

  for (i = 0; i < pdata.length; i++) {
    var count = 0;
    var balance = 0;
    uniqueArr.filter((data) => {
      if (data.PACK_NAME === pdata[i]["PACK_NAME"]) {
        count = count + 1;
        data.Status == "N" ? (balance = balance + 1) : null;
      } else {
        null;
      }
      pdata[i]["Count"] = count;
      pdata[i]["BalanceCount"] = balance;
    });
  }
  setTimeout(() => {
    var packCubeData = [];
    pdata.forEach((value, index) => {
      packCubeData.push(` 
                <tr  class="text-center" style="font-size:14px">
                <td>${index + 1}</td>
                <td onclick="dataDetils(${
                  value.PACK_NO
                })" class="text-primary">${value.PACK_NAME}</td>
                <td>${value.Count} / <span class="text-success">${
        value.BalanceCount
      }</span></td>
                
                <td ><img src="img/${
                  value.PACK_CODE
                }.png" onerror="this.onerr=null;this.src='img/noImage.jpg'" width="60" height="60" alt=""></td>
                <td>${value.PACK_EXPIRY}</td>
                </tr>
            `);
    });
    let str = packCubeData.toString().replaceAll(",", "");
    document.getElementById("loading").style.display = "none";
    document.getElementById("packData").innerHTML = str;
  }, 1000);
})();

function dataDetils(value) {
  let skudata = localStorage.setItem("SKUDATA", value);
  let TotalData = JSON.parse(localStorage["packSkuDatas"]);
  const data = TotalData.filter((data) => data.PACK_NO == value);

  window.location.href = "skudata.html";
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