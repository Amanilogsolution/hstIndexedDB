// const idb = window.indexedDB;

(function () {
    const input = localStorage.getItem('MCID')
    console.log(input)

    const ldb = idb.open('CRM', 1);

    const datass = []

    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');
        const store = txn.objectStore('tbl_rfid');
        const index = store.index('MC_NO');
        let query = index.getAll(input);

        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`this ${value} not match`)
            } else {
                removeDuplicates(event.target.result)
            }

        }

    }

  

})();

function removeDuplicates(data) {
    jsonObject = data.map(JSON.stringify);
    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    
 var motherCube =[];

    uniqueArray.forEach((value) => {
        motherCube.push(`
		 
            <tr>
            <td>${value.CC_NO}</td>
            <td>${value.CC_NAME}</td>
         
            </tr>
		`)
    }) 
    console.log(uniqueArray);
    // let str = motherCube.toString().replaceAll(',', '');


    // document.getElementById('childCubeData').innerHTML = str
    
   
}