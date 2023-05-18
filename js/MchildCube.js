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

  let childCubeData = "";

  for (let i = 0; i < childCube.length; i++) {
    volume1.push(
      `<div class="card mb-3" style="cursor:pointer" onClick="packData('${childCube[i]["CC_EPCNO"]}')"> <div class="card-body"> <img src="img/childCube.png" width="190" height="170"> <h5 class="card-title"> 
      ${childCube[i]["CC_NO"]} 
      </h5><p class="card-text"> 
      ${childCube[i]["CC_NAME"]} 
      </p></div></div>;`
    );
  }

  let str1 = volume1.toString().replaceAll(",", "");

  document.getElementById("volume1").innerHTML = str1;

  document.getElementById("loading").style.display = "none";
}

function searhChildCubeValue() {
  let inputvalue = document.getElementById("searchVal").value;

  uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  const datasearch = getUniqueListBy(uniqueArray, "CC_EPCNO");

  const filterdata = datasearch.filter(({ CC_NAME }) =>
    [CC_NAME].some((val) => val.includes(inputvalue.toUpperCase()))
  );
  console.log(filterdata);

  let volume1 = [];

  for (let i = 0; i < filterdata.length; i++) {
    volume1.push(
      `<div class="card mb-3" style="cursor:pointer" onClick="packData('${filterdata[i]["CC_EPCNO"]}')"> <div class="card-body"> <img src="img/childCube.png" width="190" height="170"> <h5 class="card-title"> 
      ${filterdata[i]["CC_NO"]} 
      </h5><p class="card-text"> 
      ${filterdata[i]["CC_NAME"]} 
      </p></div></div>;`
    );
  }

  let str1 = volume1.toString().replaceAll(",", "");

  document.getElementById("volume1").innerHTML = str1;
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
