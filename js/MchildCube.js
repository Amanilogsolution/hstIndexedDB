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
                console.log(event.target.result)
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
    console.log( childCube[0]['CC_NO'],childCube[0]['CC_NAME']);
    let childCubeArray = [];   
     
       
        childCubeArray.push(`
        <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body-mccube">
              <div class="row">
                <div class="col bg-success m-1"  onclick="packData(${childCube[0]['CC_NO']})" >
                ${childCube[0]['CC_NO']},${childCube[0]['CC_NAME']}
                </div> 
                <div class="col bg-success m-1" onclick="packData(${childCube[1]['CC_NO']})">
                ${childCube[1]['CC_NO']},${childCube[1]['CC_NAME']}
                </div>
                <div class="col bg-success m-1" onclick="packData(${childCube[2]['CC_NO']})">
                ${childCube[2]['CC_NO']},${childCube[2]['CC_NAME']}
                </div>
                
              </div>
              <div class="row">
                <div class="col bg-success m-1" onclick="packData(${childCube[3]['CC_NO']})">
                ${childCube[3]['CC_NO']},${childCube[3]['CC_NAME']}
                </div>
                <div class="col bg-success m-1" onclick="packData(${childCube[4]['CC_NO']})">
                ${childCube[4]['CC_NO']},${childCube[4]['CC_NAME']}
                </div>
                <div class="col bg-success m-1" onclick="packData(${childCube[5]['CC_NO']})">
                ${childCube[5]['CC_NO']},${childCube[5]['CC_NAME']}
                </div>
                
              </div>
              <div class="row">
                <div class="col bg-success m-1" onclick="packData(${childCube[6]['CC_NO']})">
                ${childCube[6]['CC_NO']},${childCube[6]['CC_NAME']}
                </div>
                <div class="col bg-success m-1" onclick="packData(${childCube[7]['CC_NO']})">
                ${childCube[7]['CC_NO']},${childCube[7]['CC_NAME']}
                </div>
                <div class="col bg-success m-1" onclick="packData(${childCube[8]['CC_NO']})">
                ${childCube[8]['CC_NO']},${childCube[8]['CC_NAME']}
                </div>
              
              </div> 
              <div class="row">
                <div class="col bg-success m-1" onclick="packData(${childCube[9]['CC_NO']})">
                ${childCube[9]['CC_NO']},${childCube[9]['CC_NAME']}
                </div>
                <div class="col bg-success m-1" onclick="packData(${childCube[10]['CC_NO']})">
                ${childCube[10]['CC_NO']},${childCube[10]['CC_NAME']}
                </div>
                <div class="col bg-success m-1" onclick="packData(${childCube[11]['CC_NO']})">
                ${childCube[11]['CC_NO']},${childCube[11]['CC_NAME']}
                </div>
              </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body-mccube">
            <div class="row">
              <div class="col bg-warning m-1" onclick="packData(${childCube[12]['CC_NO']})">
              ${childCube[12]['CC_NO']},${childCube[12]['CC_NAME']}
              </div>
              <div class="col bg-warning m-1" onclick="packData(${childCube[13]['CC_NO']})">
              ${childCube[13]['CC_NO']},${childCube[13]['CC_NAME']}
              </div>
              <div class="col bg-warning m-1" onclick="packData(${childCube[14]['CC_NO']})">
              ${childCube[14]['CC_NO']},${childCube[14]['CC_NAME']}
              </div>
              
            </div>
            <div class="row">
              <div class="col bg-warning m-1" onclick="packData(${childCube[15]['CC_NO']})">
              ${childCube[15]['CC_NO']},${childCube[15]['CC_NAME']}
              </div>
              <div class="col bg-warning m-1" onclick="packData(${childCube[16]['CC_NO']})">
              ${childCube[16]['CC_NO']},${childCube[16]['CC_NAME']}
              </div>
              <div class="col bg-warning m-1" onclick="packData(${childCube[17]['CC_NO']})">
              ${childCube[17]['CC_NO']},${childCube[17]['CC_NAME']}
              </div>
              
            </div>
            <div class="row">
              <div class="col bg-warning m-1" onclick="packData(${childCube[18]['CC_NO']})">
              ${childCube[18]['CC_NO']},${childCube[18]['CC_NAME']}
              </div>
              <div class="col bg-warning m-1" onclick="packData(${childCube[19]['CC_NO']})">
              ${childCube[19]['CC_NO']},${childCube[19]['CC_NAME']}
              </div>
              <div class="col bg-warning m-1" onclick="packData(${childCube[20]['CC_NO']})">
              ${childCube[20]['CC_NO']},${childCube[20]['CC_NAME']}
              </div>
            
            </div> 
            <div class="row">
              <div class="col bg-warning m-1" onclick="packData(${childCube[21]['CC_NO']})">
              ${childCube[21]['CC_NO']},${childCube[21]['CC_NAME']}
              </div>
              <div class="col bg-warning m-1" onclick="packData(${childCube[22]['CC_NO']})">
              ${childCube[22]['CC_NO']},${childCube[22]['CC_NAME']}
              </div>
              <div class="col bg-warning m-1" onclick="packData(${childCube[23]['CC_NO']})">
              ${childCube[23]['CC_NO']},${childCube[23]['CC_NAME']}
              </div>
            </div>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-3">
    <div class="card">
      <div class="card-body-mccube">
          <div class="row">
            <div class="col bg-warning m-1" onclick="packData(${childCube[24]['CC_NO']})">
            ${childCube[24]['CC_NO']},${childCube[24]['CC_NAME']}
            </div>
            <div class="col bg-warning m-1" onclick="packData(${childCube[25]['CC_NO']})">
            ${childCube[25]['CC_NO']},${childCube[25]['CC_NAME']}
            </div>
            <div class="col bg-warning m-1" onclick="packData(${childCube[26]['CC_NO']})">
            ${childCube[26]['CC_NO']},${childCube[26]['CC_NAME']}
            </div>
            
          </div>
          <div class="row">
            <div class="col bg-warning m-1" onclick="packData(${childCube[27]['CC_NO']})">
            ${childCube[27]['CC_NO']},${childCube[27]['CC_NAME']}
            </div>
            <div class="col bg-warning m-1" onclick="packData(${childCube[28]['CC_NO']})">
            ${childCube[28]['CC_NO']},${childCube[28]['CC_NAME']}
            </div>
            <div class="col bg-warning m-1" onclick="packData(${childCube[29]['CC_NO']})">
            ${childCube[29]['CC_NO']},${childCube[29]['CC_NAME']}
            </div>
            
          </div>
          <div class="row">
            <div class="col bg-warning m-1" onclick="packData(${childCube[30]['CC_NO']})">
            ${childCube[30]['CC_NO']},${childCube[30]['CC_NAME']}
            </div>
            <div class="col bg-warning m-1" onclick="packData(${childCube[31]['CC_NO']})">
            ${childCube[31]['CC_NO']},${childCube[31]['CC_NAME']}
            </div>
            <div class="col bg-warning m-1" onclick="packData(${childCube[32]['CC_NO']})">
            ${childCube[32]['CC_NO']},${childCube[32]['CC_NAME']}
            </div>
          
          </div> 
          <div class="row">
            <div class="col bg-warning m-1" onclick="packData(${childCube[33]['CC_NO']})">
            ${childCube[33]['CC_NO']},${childCube[33]['CC_NAME']}
            </div>
            <div class="col bg-warning m-1" onclick="packData(${childCube[34]['CC_NO']})">
            ${childCube[34]['CC_NO']},${childCube[34]['CC_NAME']}
            </div>
            
            <div class="col bg-warning m-1" onclick="packData(${childCube[35]['CC_NO']})">
            ${childCube[35]['CC_NO']},${childCube[35]['CC_NAME']}
            </div>
          </div>
      </div>
    </div>
  </div>
        `)
     
    
      document.getElementById('aaa').innerHTML = childCubeArray;
}



function packData(value){
    setTimeout(()=>{

       const data =  TotalData.filter(data => data.CC_NO == value)
       localStorage["packSkuDatas"] = JSON.stringify(data)
       const Packdatass = getUniqueListBy(data,'PACK_NO')
       localStorage["packDatas"] = JSON.stringify(Packdatass)

       window.location.href="pack.html"
    
    },1000)
}



