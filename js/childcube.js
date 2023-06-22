const idb = window.indexedDB;
(function foucuschilc() {
  document.getElementById("childCube").focus();
})();
var filtervalue;
function ChildCube() {
  document.getElementById("loading").style.display = "flex";
  let data = document.getElementById("childCube").value;
  let chunks = [];
  const childcubeDropdown = [];
  for (var i = 0, charsLength = data.length; i < charsLength; i += 24) {
    chunks.push(data.substring(i, i + 24));
  }
  uniqueArr = removeDuplicates(chunks);
  uniqueArr.forEach((x) => {
    const ldb = idb.open("CRM", 2);
    ldb.onsuccess = function () {
      const db = ldb.result;
      const txn = db.transaction("tbl_rfid", "readonly");
      const store = txn.objectStore("tbl_rfid");
      const index = store.index("CC_NO");
      let query = index.get(x);

      query.onsuccess = (event) => {
        if (!event.target.result) {
          console.log(`this ${x} not match`);
        } else {
          childcubeDropdown.push(event.target.result);
        }
      };
    };
  });
  setTimeout(() => {
    const dropdown = [];

    dropdown.push(`<option hidden value="">Please Select Child Cube</option>`);
    childcubeDropdown.forEach((x) =>
      dropdown.push(`<option value="${x.CC_EPCNO}">${x.CC_NAME}</option>`)
    );
    document.getElementById("loading").style.display = "none";
    document.getElementById("childcubesearch").style.display = "none";
    document.getElementById("childcubeDropdown").style.display = "flex";
    document.getElementById("selectedChildCube").innerHTML = dropdown;
  }, 1000);
}

function searchChildCube(e) {
  document.getElementById("loading").style.display = "flex";
  let id = e.target.value;
  const ldb = idb.open("CRM", 2);

  ldb.onsuccess = function () {
    const db = ldb.result;
    const txn = db.transaction("tbl_rfid", "readonly");
    const store = txn.objectStore("tbl_rfid");
    const index = store.index("CC_NO");
    let query = index.getAll(id);
    query.onsuccess = (event) => {
      if (!event.target.result) {
        console.log(`this ${id} not match`);
      } else {
        localStorage["datas"] = JSON.stringify(event.target.result);
      }
    };
    document.getElementById("loading").style.display = "none";
    document.getElementById("search2").style.display = "flex";
    document.getElementById("child").focus();
  };
}

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function searchdata() {
  document.getElementById("loading").style.display = "flex";

  const id = document.getElementById("child").value;
  let uniqueArr = [];
  let chunks = [];
  for (var i = 0, charsLength = id.length; i < charsLength; i += 24) {
    chunks.push(id.substring(i, i + 24));
  }
  uniqueArr = removeDuplicates(chunks);
  const data = JSON.parse(localStorage["datas"]);
  let inventoryMatch = [];
  let inventoryMisMatch = [];
  let match = data.filter((e) => uniqueArr.includes(e.PACK_EPC));
  let Mismatch = data.filter((e) => !uniqueArr.includes(e.PACK_EPC));

  // MAtch Data Update Data Start//
  match.forEach((e) => UpdateMatchData(e.PACK_EPC));

  Mismatch.forEach((e) => UpdateMisMatchData(e.PACK_EPC));
  // MAtch Data Update Data End//

  let mothercube = match.length > 0 ? match[0]["MC_NAME"] : "";
  let childcube = match.length > 0 ? match[0]["CC_NAME"] : "";
  let arr1 = [];
  for (i = 0; i < data.length; i++) {
    arr1.push(data[i].PACK_EPC);
  }

  setTimeout(() => {
    let OtherInventory = uniqueArr.filter((e) => !arr1.includes(e));
    const datass = [];
    OtherInventory.forEach((x) => {
      const ldb = idb.open("CRM", 2);
      ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction("tbl_rfid", "readonly");
        const store = txn.objectStore("tbl_rfid");
        const index = store.index("PACK_EPC");
        let query = index.get(x);
        query.onsuccess = (event) => {
          if (!event.target.result) {
            console.log(`this ${x} not match`);
          } else {
            datass.push(event.target.result);
          }
        };
      };
    });
    setTimeout(() => {
      const invdata = [];

      for (i = 0; i < datass.length; i++) {
        invdata.push(`
            <tr class="text-dark" style="font-size:12px" >
            <td data-toggle="modal" data-target="#exampleModal" style="width:20px">${datass[i].CC_NAME}</td>
            <td style="width:10px"> <span  class="mr-4" data-toggle="modal" data-target="#packImage"> <img src="img/eye.png" style="width:20px;" /></span></td>
            <td style="width:10px">${datass[i].PACK_NAME}</td>
            <td style="width:20px">${datass[i].PACK_EXPIRY}</td>
            </tr> 
            `);
        let Wrongdata = invdata.toString().replaceAll(",", "");
        document.getElementById("loading").style.display = "none";
        document.getElementById("wrongKitFound").innerHTML = Wrongdata;
      }
    }, 1000);
  }, 1000);




  var result = match.reduce((x, y) => {
    (x[y.PACK_NAME] = x[y.PACK_NAME] || []).push(y);
    return x;
  }, {});

  let result2 = Object.keys(result);
  let mismatchdatalength = [];
  let matchdatalength = [];

  for (i = 0; i < result2.length; i++) {
    var resultdata = result[`${result2[i]}`].reduce((x, y) => {
      (x[y.PACK_EXPIRY] = x[y.PACK_EXPIRY] || []).push(y);
      return x;
    }, {});


    let result3 = Object.keys(resultdata);
    // matchdatalength.push(result3.length);

    for(let s=0 ; s<result3.length ; s++){

      var resultdatass = resultdata[`${result3[s]}`].reduce((x, y) => {
        (x[y.PACK_EPC] = x[y.PACK_EPC] || []).push(y);
        return x;
      }, {});

      let textColor = ''

      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      var today = year + "-" + month + "-" + day;


      const date1 = new Date(result3[s]);
       const date2 = new Date(today);
         const diffTime = date1-date2
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if(diffDays<0){
          textColor='danger'
      }else{
         textColor='success'
       }

      let result4 = Object.keys(resultdatass);
      console.log(result4.length)

      matchdatalength.push(result4.length)
      inventoryMatch.push(`
      <tr class="text-dark" style="font-size:14px" onClick="match('${
        resultdata[`${result3[s]}`][0]['PACK_EPC']
      }')">
      <td data-toggle="modal" data-target="#exampleModal">${result2[i]}</td>
      <td> <span  class="mr-4" data-toggle="modal" data-target="#packImage" onClick="imagemodal('${resultdata[`${result3[s]}`][0]['PACK_EPC']}')" > <img src="img/eye.png" style="width:30px;" /></span></td>
      <td>${result4.length}</td>
       <td class='text-${textColor}'>${result3[s]}</td>
      </tr> 
  `);
    }
   
    const matchsum = matchdatalength.reduce((sum, num) => sum + num);
    document.getElementById("matchdata").innerHTML = matchsum;
  }


  var resultdata = Mismatch.reduce((x, y) => {
    (x[y.PACK_NAME] = x[y.PACK_NAME] || []).push(y);
    return x;
  }, {});

  let mismatchChildCube = Object.keys(resultdata);

  for (i = 0; i < mismatchChildCube.length; i++) {

    var resultdatapack = resultdata[`${mismatchChildCube[i]}`].reduce(
      (x, y) => {
        (x[y.PACK_EXPIRY] = x[y.PACK_EXPIRY] || []).push(y);
        return x;
      },
      {}
    );

    let result3 = Object.keys(resultdatapack);


    // mismatchdatalength.push(result3.length);  Comment by Aman
    for(let s=0 ; s<result3.length ; s++){

      var resultdatass = resultdatapack[`${result3[s]}`].reduce((x, y) => {
        (x[y.PACK_EPC] = x[y.PACK_EPC] || []).push(y);
        return x;
      }, {});

      let textColor = ''

      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      var today = year + "-" + month + "-" + day;


      const date1 = new Date(result3[s]);
       const date2 = new Date(today);
         const diffTime = date1-date2
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if(diffDays<0){
          textColor='danger'
      }else{
         textColor='success'
    }
      
      let result4 = Object.keys(resultdatass);

      mismatchdatalength.push(result4.length)

      inventoryMisMatch.push(`
      <tr class="text-dark" style="font-size:14px" onClick="match('${
        resultdatapack[`${result3[s]}`][0]['PACK_EPC']
      }')">
      <td data-toggle="modal" data-target="#exampleModal">${
        mismatchChildCube[i]
      }</td>
      <td> <span  class="mr-4" data-toggle="modal" data-target="#packImage" onClick="imagemodal('${resultdatapack[`${result3[s]}`][0]['PACK_CODE']}')" > <img src="img/eye.png" style="width:30px;" /></span></td>
      <td>${result4.length}</td>
      <td class='text-${textColor}'>${result3[s]}</td>
      </tr>
  `);

    }
  }

  let mismatchsum = 0;
  mismatchdatalength.map((x) => (mismatchsum += x));

  let Matchstr = inventoryMatch.toString().replaceAll(",", "");
  let MisMatchstr = inventoryMisMatch.toString().replaceAll(",", "");
  document.getElementById("mCube").innerHTML = mothercube;
  document.getElementById("cCube").innerHTML = childcube;
  document.getElementById("invMatch").innerHTML = Matchstr;
  document.getElementById("invMisMatch").innerHTML = MisMatchstr;
  document.getElementById("notmatchdnata").innerHTML = mismatchsum;
  document.getElementById("loading").style.display = "none";
  document.getElementById("summery").style.display = "flex";
  document.getElementById("matchsummary").style.display = "flex";
  document.getElementById("mismatchsummary").style.display = "flex";
}
function match(value) {
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
              <td><small >${value["SKU_NAME"]}</small></td>
              <td><small>${value["SKU_QTY"]}</small></td> 
              <td><span class="badge badge-success">${new Date(
                value["BATCH_EXPIRY"]
              ).toLocaleDateString("en-GB")}
              </span></td>
            </tr>			 
            `);
    });

    let str = SkuData.toString().replaceAll(",", "");
    document.getElementById("skudatavalue").innerHTML = str;
  }, 1000);
}

const UpdateMatchData = (id) => {
  const ldb = idb.open("CRM", 2);
  ldb.onsuccess = function () {
    const db = ldb.result;
    const txn = db.transaction(["tbl_rfid"], "readwrite");
    const store = txn.objectStore("tbl_rfid");
    const index = store.index("PACK_EPC");
    let query1 = index.getKey(id);
    query1.onsuccess = (event) => {
      key = query1.result;
      UpdateCubeMatchData(query1.result, id);
    };
  };
};

const UpdateMisMatchData = (id) => {
  const ldb = idb.open("CRM", 2);
  ldb.onsuccess = function () {
    const db = ldb.result;
    const txn = db.transaction(["tbl_rfid"], "readwrite");
    const store = txn.objectStore("tbl_rfid");
    const index = store.index("PACK_EPC");
    let query1 = index.getKey(id);
    query1.onsuccess = (event) => {
      key = query1.result;
      UpdateCubeMisMatchData(query1.result, id);
    };
  };
};

const UpdateCubeMatchData = (key, value) => {
  const ldb = idb.open("CRM", 2);
  ldb.onsuccess = function () {
    const db = ldb.result;
    const txn = db.transaction("tbl_rfid", "readwrite");
    const store = txn.objectStore("tbl_rfid");
    const index = store.index("PACK_EPC");
    let query = index.get(value);
    query.onsuccess = (event) => {
      const data = event.target.result;
      data.Status = "";
      const updateRequest = store.put(data, key);
      updateRequest.onsuccess = (event) => {
        console.log(updateRequest.result);
        console.log(data);
      };
    };
  };
};

const UpdateCubeMisMatchData = (key, value) => {
  const ldb = idb.open("CRM", 2);
  ldb.onsuccess = function () {
    const db = ldb.result;
    const txn = db.transaction("tbl_rfid", "readwrite");
    const store = txn.objectStore("tbl_rfid");
    const index = store.index("PACK_EPC");
    let query = index.get(value);
    query.onsuccess = (event) => {
      const data = event.target.result;
      data.Status = "N";
      const updateRequest = store.put(data, key);
      updateRequest.onsuccess = (event) => {
     
      };
    };
  };
};

const imagemodal = (kitno) =>{
  const str = `<img class="img-fluid" src="img/${kitno}.png" onerror="this.onerr=null;this.src='img/noImage.jpg'" style="width: 300px" />`  
 
    document.getElementById('Imagedata').innerHTML = str

}
