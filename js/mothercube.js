const idb = window.indexedDB;

(function () {

    const ldb = idb.open('CRM', 1);
    console.log('hllll')

		ldb.onsuccess = function () {
			const db = ldb.result;
			const txn = db.transaction('tbl_rfid', 'readonly');
			const store = txn.objectStore('tbl_rfid');
			const index = store.index('CC_NO');
			let query = index.getAll();

            query.onsuccess = (event) => {

                if (!event.target.result) {
                    // unmatchedInventory.push(id)
                    console.log(`this ${id} not match`)
    
                } else {
    
                    console.log(event.target.result)
                }
            };

            console.log(query)
        }
})();