const idb = window.indexedDB;

(function () {

    const ldb = idb.open('CRM', 1);
    // console.log('hllll')

    const datass = []

		ldb.onsuccess = function () {
			const db = ldb.result;
			const txn = db.transaction('tbl_rfid', 'readonly');
			const store = txn.objectStore('tbl_rfid');
			const index = store.index('MC_NO');
			let query = index.getAll();

            query.onsuccess = (event) => {

                if (!event.target.result) {
                    // unmatchedInventory.push(id)
                    console.log(`this ${id} not match`)
    
                } else {
                    event.target.result.filter(e=> {
                        if(datass.includes(e.MC_NO)){
                            return;
                        }else{
                            datass.push(e.MC_NO)

                        }
                    })
                    // console.log(event.target.result)
                    //  event.target.result
                }
            };

        }
        setTimeout(()=>{

            console.log(datass)

        },1000)

})();