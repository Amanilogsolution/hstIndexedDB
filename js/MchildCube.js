const idb = window.indexedDB;
var TotalData 


(function () {
    const input = Number(localStorage.getItem('MCID'))
    const ldb = idb.open('CRM', 2);
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
    let volume1 = [];   
    let volume2 = [];   
    let volume3 = [];   
     for(let i=0;i<=11;i++)
     {
     // console.log(value.CC_NO,value.CC_NAME)
     volume1.push(`
  <a href="pack.html" class="text-decoration-none subchild-child-cube text-success">
  <div class="card   mb-resp px-0 py-1">
 <h6 > <span class="text-danger">${childCube[i]['CC_NO']}</span>, ${childCube[i]['CC_NAME']}</h6>
  </div>
</a>

        `)
      }


      for(let i=11;i<=23;i++)
      {
      // console.log(value.CC_NO,value.CC_NAME)
      volume2.push(`
   <a href="pack.html" class="text-decoration-none subchild-child-cube text-primary">
   <div class="card  mb-resp px-0 py-1">
  <h6 > <span class="text-danger">${childCube[i]['CC_NO']}</span>, ${childCube[i]['CC_NAME']}</h6>
   </div>
 </a>
 
         `)
       }
       for(let i=23;i<=35;i++)
       {
       // console.log(value.CC_NO,value.CC_NAME)
       volume3.push(`
    <a href="pack.html" class="text-decoration-none subchild-child-cube text-warning">
    <div class="card   mb-resp px-0 py-1">
   <h6 > <span class="text-danger">${childCube[i]['CC_NO']}</span>, ${childCube[i]['CC_NAME']}</h6>
    </div>
  </a>
  
          `)
        }
      let str1 = volume1.toString().replaceAll(',', '');
      let str2 = volume2.toString().replaceAll(',', '');
      let str3 = volume3.toString().replaceAll(',', '');
      document.getElementById('volume1').innerHTML = str1;
      document.getElementById('volume2').innerHTML = str2;
      document.getElementById('volume3').innerHTML = str3;
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



