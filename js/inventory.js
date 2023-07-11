const idb = window.indexedDB;

(function foucusinv() {
  document.getElementById("childCube").focus();
})();

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function searchchild() {
  var searchValue = document.getElementById("childCube").value;
  if (searchValue == "") {
    alert("Search Text is empty");
    return false;
  }

  let id = document.getElementById("childCube").value;
  let uniqueArr = [];
  let chunks = [];
  let matchedInventory = [];
  let unmatchedInventory = [];
  for (var i = 0, charsLength = id.length; i < charsLength; i += 24) {
    chunks.push(id.substring(i, i + 24));
  }
  uniqueArr = removeDuplicates(chunks);

  uniqueArr.forEach((x) => {
    const ldb = idb.open("CRM", 2);
    ldb.onsuccess = function () {
      const db = ldb.result;
      const txn = db.transaction("tbl_rfid", "readonly");
      const store = txn.objectStore("tbl_rfid");
      const index = store.index("PACK_EPC");
      let query = index.get(x);
      query.onsuccess = (event) => {
        if (!event.target.result) {
          unmatchedInventory.push(x);
        } else {
          matchedInventory.push(event.target.result);
        }
      };
    };
  });
  var displayInvetory = "";
  document.getElementById("loading").style.display = "flex";
  setTimeout(() => {
    var result = matchedInventory.reduce((x, y) => {
      (x[y.CC_NO] = x[y.CC_NO] || []).push(y);
      return x;
    }, {});

    let result2 = Object.keys(result);

    for (i = 0; i < result2.length; i++) {
      var result1 = result[`${result2[i]}`].reduce((x, y) => {
        (x[y.PACK_NAME] = x[y.PACK_NAME] || []).push(y);
        return x;
      }, {});

      let result4 = Object.keys(result1);

      for (let j = 0; j < result4.length; j++) {
        var result5 = result1[`${result4[j]}`].reduce((x, y) => {
          (x[y.PACK_EXPIRY] = x[y.PACK_EXPIRY] || []).push(y);
          return x;
        }, {});

        let result6 = Object.keys(result5);

        for (let s = 0; s < result6.length; s++) {
          var result7 = result5[`${result6[s]}`].reduce((x, y) => {
            (x[y.PACK_EPC] = x[y.PACK_EPC] || []).push(y);
            return x;
          }, {});

          let result8 = Object.keys(result7);

          let textColor = "";
          var date = new Date();
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          if (month < 10) month = "0" + month;
          if (day < 10) day = "0" + day;
          var today = year + "-" + month + "-" + day;

          const date1 = new Date(result6[s]);
          const date2 = new Date(today);
          const diffTime = date1 - date2;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays < 0) {
            textColor = "danger";
          } else {
            textColor = "success";
          }

          displayInvetory += `<tr data-toggle="modal" data-target="#exampleModal" onClick="ab('${
            result5[`${result6[s]}`][0]["PACK_EPC"]
          }')">
     <td>${result5[`${result6[s]}`][0]["CC_NO"]}</td>
     <td>${result5[`${result6[s]}`][0]["PACK_NAME"]}</td>
     <td><span class="badge badge-warning">${result8.length}</span></td>
     <td class='text-${textColor}'>${result6[s]}</td>
     </tr>`;
        }
      }
    }
    document.getElementById("summery").style.display = "flex";
    document.getElementById("matchTable").style.display = "flex";
    document.getElementById("loading").style.display = "none";
    document.getElementById("matchdata").innerHTML = matchedInventory.length;
    document.getElementById("invMatch").innerHTML = displayInvetory;
  }, 1000);
}

function ab(value) {
  var packData = [];

  const ldb = idb.open("CRM", 2);
  ldb.onsuccess = function () {
    const db = ldb.result;
    const txn = db.transaction("tbl_rfid", "readonly");
    const store = txn.objectStore("tbl_rfid");
    const index = store.index("PACK_EPC");
    let query = index.getAll(value);
    query.onsuccess = (event) => {
      if (!event.target.result) {
        console.log(`this ${value} not match`);
      } else {
        packData.push(event.target.result);
      }
    };
  };

  setTimeout(() => {
    let SkuData = [];
    packData[0].forEach((value, index) => {
      SkuData.push(`  
		  <tr>
		  <th scope="row"><small>${++index}</small></th>
		  <td><small>${value["SKU_NAME"]}</small></td>
		  <td><small>${value["SKU_QTY"]}</small></td> 
      <td><small>${value["BATCH_EXPIRY"]}</small></td> 
		</tr>			 
		`);
    });
    let data = ` ${packData[0][0].CC_NAME}`;
    let str = SkuData.toString().replaceAll(",", "");
    document.getElementById("skudatavalue").innerHTML = str;
    document.getElementById("modaltitle").innerHTML = data;
    document.getElementById("mcName").innerHTML = packData[0][0]["CC_NO"]
    document.getElementById("cchildcubename").innerHTML = packData[0][0]["PACK_NAME"]
  }, 1000);
}

// Download code

