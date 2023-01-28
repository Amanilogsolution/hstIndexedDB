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
                event.target.result.filter(e => {
                    if (datass.includes(e.MC_NO)) {
                        return;
                    } else {
                        datass.push(e.MC_NO)

                    }
                })
                // console.log(event.target.result)
                //  event.target.result
            }
        };

    }
    let motherCube = [];
    setTimeout(() => {

        datass.forEach((value) => {
            motherCube.push(`
                <div class="app" style="color:green">
                    <div class="desc">            
                    <button id="${value}" onclick="ChildCube(${value})" class="btn-search">${value}</button>        
                       
                    </div> 
                    </div>
                `)
        })
        let str = motherCube.toString().replaceAll(',', '');

        document.getElementById('motherContainer').innerHTML = str;
   

    }, 1000)

})();

function removeDuplicates(data) {
    jsonObject = data.map(JSON.stringify);
    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    
 var motherCube =[];

    uniqueArray.forEach((value) => {
        motherCube.push(`
		<div class="app">
            <div class="desc">                    
                <h3 class="name">${value.PACK_NO}</h3>
            </div>
            <div class="type">                   
                <h3 class="name">${value.SKU_NAME}</h3>
            </div>
            <div class="type">                   
            <h3 class="name">${value.SKU_CODE}</h3>
        </div>
            </div>
		`)
    }) 
    // console.log(motherCube);
    let str = motherCube.toString().replaceAll(',', '');


    document.getElementById('childCubeData').innerHTML = str
    
   
}



function ChildCube(value) {
    // let id = document.getElementById('childCube').value
    console.log(value)
    let input = ''+value
    const ldb = idb.open('CRM', 1);

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
    };
    
    document.getElementById('invList').style.display='block'


}


