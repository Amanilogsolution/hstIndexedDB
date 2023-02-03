const idb = window.indexedDB;
var TotalData 


(function () {
    const input = Number(localStorage.getItem('MCID'))
    const ldb = idb.open('CRM', 2);
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
                removeDuplicates(event.target.result)
          
            }
        }
    }
})();

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

function removeDuplicates(data) {
    jsonObject = data.map(JSON.stringify);
    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    TotalData =  Array.from(uniqueSet).map(JSON.parse);

    const childCube = getUniqueListBy(uniqueArray,'CC_NO')
    console.log(childCube)

}

setTimeout(()=>{
    console.log(TotalData)

},1000)

