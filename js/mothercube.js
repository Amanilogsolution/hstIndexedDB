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
        let motherCube = [];
        setTimeout(()=>{

            datass.forEach((value) => {
                motherCube.push(`
                <div class="app" style="color:green">
                    <div class="desc">            
                    <button id="${value}" onclick="ChildCube(${value})">${value}</button>        
                       
                    </div>
                    
                    
                     
                     
                    
                    </div>
                `)
            })
            document.getElementById('motherContainer').innerHTML = motherCube;
            // console.log(motherCube);
            // console.log(datass)

        },1000)

})();