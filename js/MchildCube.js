const idb = window.indexedDB;
var TotalData;

(function () {
  document.getElementById("loading").style.display = "flex";
  const input = localStorage.getItem("MCID");
  const ldb = idb.open("CRM", 2);
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
})();

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

function removeDuplicates(data) {
  jsonObject = data.map(JSON.stringify);
  uniqueSet = new Set(jsonObject);
  uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  TotalData = Array.from(uniqueSet).map(JSON.parse);

  const childCube = getUniqueListBy(uniqueArray, "CC_EPCNO");
  let volume1 = [];
  let volume2 = [];
  let volume3 = [];
  for (let i = 0; i <= 11; i++) {
    volume1.push(` 

    <div class="card mb-2" style="height: 20rem;" onClick="packData('${childCube[i]["CC_EPCNO"]}')" >
    
    <div style="padding:20px 30px 30px 30px">  
    <img src="img/childCube.png" width="190" height="170">
    <h5 class="card-title text-center">${childCube[i]["CC_NO"]}</h5>   
      <p class="card-text">${childCube[i]["CC_NAME"]}</p>    
    </div>
  </div>

   
        `);
  }

  for (let i = 12; i <= 23; i++) {
    volume2.push(`
    <div class="card mb-2" style="height: 20rem;" onClick="packData('${childCube[i]["CC_EPCNO"]}')" >
    
    <div style="padding:20px 30px 30px 30px">  
    <img src="img/childCube.png" width="190" height="170">
    <h5 class="card-title text-center">${childCube[i]["CC_NO"]}</h5>   
      <p class="card-text">${childCube[i]["CC_NAME"]}</p>    
    </div>
  </div>
         `);
  }
  for (let i = 24; i <= 35; i++) {
    // console.log(value.CC_NO,value.CC_NAME)
    volume3.push(`
    <div class="card mb-2" style="height: 20rem;" onClick="packData('${childCube[i]["CC_EPCNO"]}')" >
    
    <div style="padding:20px 30px 30px 30px">  
    <img src="img/childCube.png" width="190" height="170">
    <h5 class="card-title text-center">${childCube[i]["CC_NO"]}</h5>   
      <p class="card-text">${childCube[i]["CC_NAME"]}</p>    
    </div>
  </div>
          `);
  }
  let str1 = volume1.toString().replaceAll(",", "");
  let str2 = volume2.toString().replaceAll(",", "");
  let str3 = volume3.toString().replaceAll(",", "");
  document.getElementById("volume1").innerHTML = str1;
  document.getElementById("volume2").innerHTML = str2;
  document.getElementById("volume3").innerHTML = str3;
  document.getElementById("loading").style.display = "none";
}

function packData(value) {
  setTimeout(() => {
    const data = TotalData.filter((data) => data.CC_EPCNO === value);
    localStorage["packSkuDatas"] = JSON.stringify(data);
    const Packdatass = getUniqueListBy(data, "PACK_NO");
    localStorage["packDatas"] = JSON.stringify(Packdatass);
    window.location.href = "pack.html";
  }, 1000);
}
