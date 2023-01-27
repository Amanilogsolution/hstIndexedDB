const idb = window.indexedDB;

var filtervalue ;

function searchChildCube () {
    let id = document.getElementById('childCube').value 

    var ChildCulbedata = []

    const ldb = idb.open('CRM', 1);

    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');

        const store = txn.objectStore('tbl_rfid');
        console.log(store)
        const index = store.index('CC_NO');
        let query = index.getAll(id);

        query.onsuccess = (event) => {

            if (!event.target.result) {
                // unmatchedInventory.push(id)
                console.log(`this ${id} not match`)

            } else {

                console.log(event.target.result)
                localStorage['datas'] = JSON.stringify(event.target.result)
                // filtervalue.push(event.target.value)
                // searchdata(event.target.result)
                // ChildCulbedat = event.target.result
            }
        };
    }

  

}

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

  // console.log(filtervalue)
    function searchdata  () {
        const id = document.getElementById('child').value;
        let uniqueArr = []
        let chunks = []


    for (var i = 0, charsLength = id.length; i < charsLength; i += 24) {
        chunks.push(id.substring(i, i + 24));
    }
    uniqueArr = removeDuplicates(chunks);

        const data = JSON.parse(localStorage['datas'])
        // data.filter(e=>console.log(e))
        // console.log(data)
        // console.log(uniqueArr)

        let match = data.filter(e=> uniqueArr.includes(e.PACK_EPC))
        let Mismatch = data.filter(e=> !uniqueArr.includes(e.PACK_EPC))

        console.log(match,Mismatch)
 
    }

