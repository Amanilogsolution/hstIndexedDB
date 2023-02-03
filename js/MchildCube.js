 const idb = window.indexedDB;

(function () {
    const input = localStorage.getItem('MCID')
    console.log(input)

    const ldb = idb.open('CRM', 2);

    const datass = []

    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('inventory', 'readonly');
        const store = txn.objectStore('inventory');
        const index = store.index('MC_NO');
        let query = index.getAll(input);
       
        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`this ${value} not match`)
            } else {
                console.log(event.target.result)
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