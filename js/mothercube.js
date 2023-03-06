const idb = window.indexedDB;

(function () {

    const ldb = idb.open('CRM', 2);
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
                console.log(`this ${id} not match`)

            } else {
                event.target.result.filter(e => {
                    if (datass.includes(e.MC_NO)) {
                        return;
                    } else {
                        datass.push(e.MC_NO)

                    }
                })
     
            }
        };

    }
    let motherCube = [];
    setTimeout(() => {
        console.log(datass)
        datass.forEach((value,index) => {
            console.log(value)
            if(index>1){
                return false
            }else{
            motherCube.push(`

            
            <div class="col-md-3 py-1">
                    <a href="motherChildCude.html" class="text-decoration-none">
                        <div class="card text-center mb-resp" id="${value}" onclick="mcid('${value}')">
                            <div class="card-body px-0 py-1 shadow3-gray">
                                <div class="motherBox-card mt-0">
                                    <img src="../img/motherBox.png" alt="" class="motherbox-image">
                                </div>
                                <h3 class="card-title">Mother Cube ${index+1}</h3>
                            </div>
                        </div>
                    </a>
                </div>

        `)
            }
        })
        let str = motherCube.toString().replaceAll(',', '');

        document.getElementById('motherContainer').innerHTML = str;
   

    }, 1000)

})();

function removeDuplicates(data) {
    jsonObject = data.map(JSON.stringify);
    console.log(jsonObject)
    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    

    
   
}
function mcid(MCNO){
    console.log(MCNO)
    localStorage.setItem('MCID',MCNO);
}


function ChildCube(value) {
    
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


