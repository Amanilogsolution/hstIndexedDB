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
                console.log(event.target.result)
                removeDuplicates(event.target.result)
          
            }
        }
    }
})();
