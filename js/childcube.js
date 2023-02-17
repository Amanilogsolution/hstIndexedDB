const idb = window.indexedDB;
(function foucuschilc(){
    document.getElementById('childCube').focus();
    })();
var filtervalue;
function ChildCube() {
    let data = document.getElementById('childCube').value
    let chunks = []
    const childcubeDropdown = []
    for (var i = 0, charsLength = data.length; i < charsLength; i += 24) {
        chunks.push(data.substring(i, i + 24));
    }
    uniqueArr = removeDuplicates(chunks);
    uniqueArr.forEach(x => {
        const ldb = idb.open('CRM', 2);
        ldb.onsuccess = function () {
            const db = ldb.result;
            const txn = db.transaction('tbl_rfid', 'readonly');
            const store = txn.objectStore('tbl_rfid');
            const index = store.index('CC_NO');
            let query = index.get(x);

            query.onsuccess = (event) => {
                if (!event.target.result) {
                    console.log(`this ${x} not match`)

                } else {
                    childcubeDropdown.push(event.target.result)

                }
            };
        }
    })
    setTimeout(() => {
        const dropdown = []

        dropdown.push(
            `<option hidden value="">Please Select Child Cube</option>`
        )
        childcubeDropdown.forEach(x =>
            dropdown.push(
                `<option value="${x.CC_EPCNO}">${x.CC_NAME}</option>`
            )
        )
        document.getElementById('childcubesearch').style.display = 'none'
        document.getElementById('childcubeDropdown').style.display = 'flex'
        document.getElementById('selectedChildCube').innerHTML = dropdown
    }, 1000)
}

function searchChildCube(e) {
    let id = e.target.value
    const ldb = idb.open('CRM', 2);

    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');
        const store = txn.objectStore('tbl_rfid');
        const index = store.index('CC_NO');
        let query = index.getAll(id);
        query.onsuccess = (event) => {

            if (!event.target.result) {
                console.log(`this ${id} not match`)

            } else {

                localStorage['datas'] = JSON.stringify(event.target.result)
            }
        };
         
        document.getElementById('search2').style.display = 'flex';
        document.getElementById("child").focus();


    }
}

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}


function searchdata() {
    document.getElementById('loading').style.display = 'flex';
    const id = document.getElementById('child').value;
    let uniqueArr = []
    let chunks = []
    for (var i = 0, charsLength = id.length; i < charsLength; i += 24) {
        chunks.push(id.substring(i, i + 24));
    }
    uniqueArr = removeDuplicates(chunks);
    const data = JSON.parse(localStorage['datas'])
    let inventoryMatch = [];
    let inventoryMisMatch = [];
    let match = data.filter(e => uniqueArr.includes(e.PACK_EPC))
    let Mismatch = data.filter(e => !uniqueArr.includes(e.PACK_EPC))
    let mothercube = match.length > 0 ? match[0]['MC_NO'] : '';
    let childcube = match.length > 0 ? match[0]['CC_NO'] : '';
    let arr1 = [];
    for (i = 0; i < data.length; i++) { arr1.push(data[i].PACK_EPC) }

    setTimeout(() => {
        let OtherInventory = uniqueArr.filter((e => !arr1.includes(e)))
        const datass = []
        OtherInventory.forEach(x => {
            const ldb = idb.open('CRM', 2);
            ldb.onsuccess = function () {
                const db = ldb.result;
                const txn = db.transaction('tbl_rfid', 'readonly');
                const store = txn.objectStore('tbl_rfid');
                const index = store.index('PACK_EPC');
                let query = index.get(x);
                query.onsuccess = (event) => {
                    if (!event.target.result) {
                        console.log(`this ${x} not match`)
                    } else {
                        datass.push(event.target.result)
                    }
                };
            }
        })
        setTimeout(() => {

            const invdata = []

            for (i = 0; i < datass.length; i++) {
                invdata.push(`
            <tr class="text-dark" style="font-size:14px" >
            <td data-toggle="modal" data-target="#exampleModal">${datass[i].CC_NAME}</td>
            <td> <span  class="mr-4" data-toggle="modal" data-target="#packImage"> <img src="img/eye.png" style="width:30px;" /></span></td>
            <td>${datass[i].PACK_NAME}</td>
            <td>${datass[i].PACK_EXPIRY}</td>
            </tr> 
            `)
            let Wrongdata = invdata.toString().replaceAll(',', '');

                document.getElementById('wrongkitsummary').style.display = 'flex'
                document.getElementById('wrongKitFound').innerHTML = Wrongdata
            }

        }, 1000)

    }, 1000)
    var result = match.reduce((x, y) => {
        (x[y.PACK_NAME] = x[y.PACK_NAME] || []).push(y)
        return x;
    }, {})

    let result2 = Object.keys(result)
    let mismatchdatalength = []
    let matchdatalength = []
    let matchsum = 0;

    for (i = 0; i < result2.length; i++) {
        var resultdata = result[`${result2[i]}`].reduce((x, y) => {
            (x[y.PACK_EPC] = x[y.PACK_EPC] || []).push(y)
            return x;
        }, {})
        let result3 = Object.keys(resultdata)
        matchdatalength.push(result3.length)
        inventoryMatch.push(`
        <tr class="text-dark" style="font-size:14px" onClick="match('${result[result2[i]][0]['PACK_EPC']}')">
        <td data-toggle="modal" data-target="#exampleModal">${result2[i]}</td>
        <td> <span  class="mr-4" data-toggle="modal" data-target="#packImage"> <img src="img/eye.png" style="width:30px;" /></span></td>
        <td>${result3.length}</td>
         <td>${result[`${result2[i]}`][0]['BATCH_EXPIRY']}</td>
        </tr> 
		`)
        const matchsum = matchdatalength.reduce((sum, num) => sum + num);
        document.getElementById('matchdata').innerHTML = matchsum
    }



    var resultdata = Mismatch.reduce((x, y) => {
        (x[y.PACK_NAME] = x[y.PACK_NAME] || []).push(y)
        return x;
    }, {})
    let mismatchChildCube = Object.keys(resultdata)
    for (i = 0; i < mismatchChildCube.length; i++) {

        var resultdatapack = resultdata[`${mismatchChildCube[i]}`].reduce((x, y) => {
            (x[y.PACK_EPC] = x[y.PACK_EPC] || []).push(y)
            return x;
        }, {})

        let result3 = Object.keys(resultdatapack)
        mismatchdatalength.push(result3.length)


        inventoryMisMatch.push(`
        <tr class="text-dark" style="font-size:14px" onClick="match('${resultdatapack[result3[0]][0]['PACK_EPC']}')">
       
        <td data-toggle="modal" data-target="#exampleModal">${mismatchChildCube[i]}</td>
        <td> <span  class="mr-4" data-toggle="modal" data-target="#packImage"> <img src="img/eye.png" style="width:30px;" /></span></td>
        <td>${result3.length}</td>
        <td>${resultdata[`${mismatchChildCube[i]}`][0]['BATCH_EXPIRY']}</td>
        </tr>
		`)

    }

    let mismatchsum = 0;

    mismatchdatalength.map(x => mismatchsum += x);

    console.log('mismatch',mismatchsum)







     

    let Matchstr = inventoryMatch.toString().replaceAll(',', '');
    let MisMatchstr = inventoryMisMatch.toString().replaceAll(',', '');
    document.getElementById('mCube').innerHTML = mothercube;
    document.getElementById('cCube').innerHTML = childcube;
    document.getElementById('invMatch').innerHTML = Matchstr
    document.getElementById('invMisMatch').innerHTML = MisMatchstr
    document.getElementById('notmatchdnata').innerHTML = mismatchsum
    document.getElementById('loading').style.display = 'none';
    document.getElementById('summery').style.display = 'flex';
    document.getElementById('matchsummary').style.display = 'flex';
    document.getElementById('mismatchsummary').style.display = 'flex';
}
function match(value) {
    var packData = [];

    const ldb = idb.open('CRM', 2);
    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');
        const store = txn.objectStore('tbl_rfid');
        const index = store.index('PACK_EPC');
        let query = index.getAll(value);
        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`this ${value} not match`)
            } else {
                packData.push(event.target.result)
            }
        }
    };
    setTimeout(() => {
        let SkuData = [];


        packData[0].forEach((value, index) => {
            SkuData.push(`  
              <tr>
              <th scope="row"><small>${++index}</small></th>
              <td><small >${value['SKU_NAME']}</small></td>
              <td><small>${value['SKU_QTY']}</small></td> 
            </tr>			 
            `)
        })

        let str = SkuData.toString().replaceAll(',', '');
        document.getElementById('skudatavalue').innerHTML = str;
    }, 1000)
}

