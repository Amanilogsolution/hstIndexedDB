const idb = window.indexedDB;

var filtervalue;

function searchChildCube() {
    let id = Number(document.getElementById('childCube').value)


    const ldb = idb.open('CRM', 2);

    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');

        const store = txn.objectStore('tbl_rfid');
        const index = store.index('CC_NO');
        let query = index.getAll(id);

        query.onsuccess = (event) => {

            if (!event.target.result) {
                console.log(`this ${id} not match`)

            } else {
                
                localStorage['datas'] = JSON.stringify(event.target.result)
            }
        };

        document.getElementById('search2').style.display = 'flex';
    }
}

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}


function searchdata() {
    document.getElementById('loading').style.display = 'flex';
    const id = document.getElementById('child').value;
    let uniqueArr = []
    let chunks = []


    for (var i = 0, charsLength = id.length; i < charsLength; i += 24) {
        chunks.push(id.substring(i, i + 24));
    }
    uniqueArr = removeDuplicates(chunks);
    // console.log(uniqueArr)

    const data = JSON.parse(localStorage['datas'])
    

    let inventoryMatch = [];
    let inventoryMisMatch = [];

    let match = data.filter(e => uniqueArr.includes(e.PACK_EPC))
    let Mismatch = data.filter(e => !uniqueArr.includes(e.PACK_EPC))
    //console.log(match.length)
    let mothercube = match.length>0 ? match[0]['MC_NO'] : '';
    let childcube = match.length>0 ? match[0]['CC_NO'] : '';
    let arr1 = [];

    for(i=0;i<data.length;i++){ arr1.push(data[i].PACK_EPC)}

    setTimeout(()=>{
        let OtherInventory = uniqueArr.filter((e => !arr1.includes(e)))
        // console.log('dkjhkdnhvkdh',OtherInventory)
    },1000)


    var result = match.reduce((x,y)=>{
        (x[y.PACK_NAME] = x[y.PACK_NAME] || []).push(y)
        return x;
     },{})

     let result2 = Object.keys(result)  
     for(i=0;i<result2.length;i++){
        var resultdata = result[`${result2[i]}`].reduce((x,y)=>{
            (x[y.PACK_EPC] = x[y.PACK_EPC] || []).push(y)
            return x;
         },{})

        let result3 = Object.keys(resultdata)  
         console.log(result3);
        inventoryMatch.push(`
        <tr class="text-dark" style="font-size:14px" onClick="match('${result[result2[i]][0]['PACK_EPC']}')">
        <td data-toggle="modal" data-target="#exampleModal">${result2[i]}</td>
        <td>${result3.length}</td>
         <td>${result[`${result2[i]}`][0]['BATCH_EXPIRY']}</td>
        </tr> 
		`)
     }
     var resultdata = Mismatch.reduce((x,y)=>{
        (x[y.PACK_NAME] = x[y.PACK_NAME] || []).push(y)
        return x;
     },{}) 

     let mismatchChildCube = Object.keys(resultdata)  

     console.log("adsfasdf",mismatchChildCube)

     for(i=0;i<mismatchChildCube.length;i++){
        //console.log(mismatchChildCube[i])
        //console.log(resultdata[`${mismatchChildCube[i]}`].length)
        inventoryMisMatch.push(`
        <tr class="text-dark" style="font-size:14px">
        <td>${mismatchChildCube[i]}</td>
        <td>${resultdata[`${mismatchChildCube[i]}`].length}</td>
        <td>${resultdata[`${mismatchChildCube[i]}`][0]['BATCH_EXPIRY'] }</td>
        </tr>
		`)

     }







     

    let Matchstr = inventoryMatch.toString().replaceAll(',', '');
    let MisMatchstr = inventoryMisMatch.toString().replaceAll(',', '');
    document.getElementById('mCube').innerHTML = mothercube;
    document.getElementById('cCube').innerHTML = childcube;
    document.getElementById('invMatch').innerHTML = Matchstr
    document.getElementById('invMisMatch').innerHTML = MisMatchstr
    document.getElementById('matchdata').innerHTML = match.length
    document.getElementById('notmatchdnata').innerHTML = Mismatch.length
    document.getElementById('loading').style.display = 'none';
    document.getElementById('summery').style.display = 'flex';
    document.getElementById('matchsummary').style.display = 'flex';
    document.getElementById('mismatchsummary').style.display = 'flex';    
}
function match(value){
    var packData =[];
	 
    const ldb = idb.open('CRM', 2);
    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly'); 
        const store = txn.objectStore('tbl_rfid');
        const index = store.index('PACK_EPC');
        let query = index.getAll(value);
        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`this ${value} not match`)
            } else {
                packData.push(event.target.result)
            }
        }
    };
    setTimeout(()=>{
        let SkuData = [];


        packData[0].forEach((value , index) => {
            SkuData.push(`  
              <tr>
              <th scope="row"><small>${++index}</small></th>
              <td><small >${value['SKU_NAME']}</small></td>
              <td><small>${value['SKU_QTY']}</small></td> 
            </tr>			 
            `)			 
            })	

            let str = SkuData.toString().replaceAll(',', '');


            document.getElementById('skudatavalue').innerHTML = str;



    },1000)




}

