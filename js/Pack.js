(function () {
  document.getElementById("loading").style.display = "flex";
  let pdata = JSON.parse(localStorage["packDatas"]);
  let pSkudata = JSON.parse(localStorage["packSkuDatas"]);

  uniqueArr = removeDuplicates(pSkudata);

  for (i = 0; i < pdata.length; i++) {
    var count = 0;
    var balance = 0;
    uniqueArr.filter((data) => {
 
      if (data.PACK_NAME === pdata[i]["PACK_NAME"]) {
        count = count + 1;
        data.Status == "" ? (balance = balance + 1) : null;
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
                <tr onclick="dataDetils(${
                  value.PACK_NO
                })" class="text-center" style="font-size:14px">
                <td>${index + 1}</td>
                <td>${value.PACK_NAME}</td>
                <td>${value.Count}</td>
                <td>${value.BalanceCount}</td>
                <td><img src="img/${
                  value.PACK_CODE
                }.png" onerror="this.onerr=null;this.src='img/childCube.png'" width="60" height="60" alt=""></td>
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
