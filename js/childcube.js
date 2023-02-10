const idb = window.indexedDB;

var filtervalue;

function searchChildCube() {
    let id = Number(document.getElementById('childCube').value)


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
    }
}

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}


function searchdata() {
    document.getElementById('loading').style.display = 'flex';
    const id = document.getElementById('child').value;
    console.log(id);
    let uniqueArr = []
    let chunks = []


    for (var i = 0, charsLength = id.length; i < charsLength; i += 24) {
        chunks.push(id.substring(i, i + 24));
    }
    uniqueArr = removeDuplicates(chunks);

    const data = JSON.parse(localStorage['datas'])

    let inventoryMatch = '';
    let inventoryMisMatch = [];
    let match = data.filter(e => uniqueArr.includes(e.PACK_EPC))
    let Mismatch = data.filter(e => !uniqueArr.includes(e.PACK_EPC))
    
    let mothercube = match[0]['MC_NO'];
    let childcube = match[0]['CC_NO'];
    let arr1 = []

    for(i=0;i<data.length;i++){
        arr1.push(data[i].PACK_EPC)
    }

setTimeout(()=>{
    let OtherInventory = uniqueArr.filter((e => !arr1.includes(e)))
   // document.getElementById('invNotMatch').innerHTML = OtherInventory
},1000)

  


    // match.forEach((value) => {
    //     inventoryMatch.push(`
    //     <tr class="text-dark" style="font-size:14px">
    //     <td>${value.PACK_NAME}</td>
    //     <td>${match.length}</td>
    //     <td>${value.BATCH_EXPIRY}</td>
    //     </tr> 
	// 	`)
    // })

    // match.forEach((value) => {
        inventoryMatch = (`
        <tr class="text-dark" style="font-size:14px">
        <td>${match[0].PACK_NAME}</td>
        <td>${match.length}</td>
        <td>${match[0].BATCH_EXPIRY}</td>
        </tr> 
		`)
    // })

    Mismatch.forEach((value) => {
        inventoryMisMatch.push(`
        <tr class="text-dark" style="font-size:14px">
        <td>${value.PACK_NAME}</td>
        <td>${value.SKU_QTY}</td>
        <td>${value.BATCH_EXPIRY}</td>
        </tr>
		`)
    })

    console.log(inventoryMisMatch)

    let Matchstr = inventoryMatch.toString().replaceAll(',', '');
    let MisMatchstr = inventoryMisMatch.toString().replaceAll(',', '');

    
    document.getElementById('mCube').innerHTML = mothercube;
    document.getElementById('cCube').innerHTML = childcube;


    document.getElementById('invMatch').innerHTML = Matchstr
    document.getElementById('invMisMatch').innerHTML = MisMatchstr


    document.getElementById('matchdata').innerHTML = match.length

    document.getElementById('notmatchdnata').innerHTML = Mismatch.length

    document.getElementById('loading').style.display = 'none';

    document.getElementById('summery').style.display = 'flex';
    document.getElementById('matchsummary').style.display = 'flex';
    document.getElementById('mismatchsummary').style.display = 'flex';
   // document.getElementById('ccubesum').style.display = 'flex';
    


    

}

