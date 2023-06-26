const idb = window.indexedDB;

(function () {
  document.getElementById("loading").style.display = "flex";
  const ldb = idb.open("CRM", 2);
  // console.log('hllll')

  const datass = [];

  ldb.onsuccess = function () {
    const db = ldb.result;
    const txn = db.transaction("tbl_rfid", "readonly");
    const store = txn.objectStore("tbl_rfid");
    const index = store.index("MC_NO");

    let query = index.getAll();

    query.onsuccess = (event) => {
      if (!event.target.result) {
        console.log(`this ${id} not match`);
      } else {
        event.target.result.filter((e) => {
          if (datass.includes(e.MC_NO)) {
            return;
          } else {
            datass.push(e.MC_NO);
          }
        });
      }
    };
  };
  let motherCube = [];
  setTimeout(() => {
    datass.forEach((value, index) => {
      if (index > 1) {
        return false;
      } else {
        motherCube.push(`

            
            <div class="col-sm-3 py-1">
                    <a href="motherChildCude.html" class="text-decoration-none">
                        <div class="card text-center mb-resp" id="${value}" onclick="mcid('${value}')">
                            <div class="card-body px-0 py-1 shadow3-gray">
                                <div class="motherBox-card mt-0">
                                    <img src="../img/motherBox.png" alt="" class="motherbox-image">
                                </div>
                                <h3 class="card-title">Mother Cube ${
                                  index + 1
                                }</h3>
                            </div>
                        </div>
                    </a>
                </div>

        `);
      }
    });
    let str = motherCube.toString().replaceAll(",", "");
    document.getElementById("loading").style.display = "none";
    document.getElementById("motherContainer").innerHTML = str;
  }, 1000);
})();

function removeDuplicates(data) {
  jsonObject = data.map(JSON.stringify);
  console.log(jsonObject);
  uniqueSet = new Set(jsonObject);
  uniqueArray = Array.from(uniqueSet).map(JSON.parse);
}
function mcid(MCNO) {
  console.log(MCNO);
  localStorage.setItem("MCID", MCNO);
}

function ChildCube(value) {
  let input = "" + value;
  const ldb = idb.open("CRM", 1);

  ldb.onsuccess = function () {
    const db = ldb.result;
    const txn = db.transaction("tbl_rfid", "readonly");

    const store = txn.objectStore("tbl_rfid");
    const index = store.index("MC_NO");
    let query = index.getAll(input);

    query.onsuccess = (event) => {
      if (!event.target.result) {
        console.log(`this ${value} not match`);
      } else {
        removeDuplicates(event.target.result);
      }
    };
  };

  document.getElementById("invList").style.display = "block";
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