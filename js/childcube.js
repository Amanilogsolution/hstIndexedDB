const idb = window.indexedDB;

var filtervalue;

function searchChildCube() {
    let id = document.getElementById('childCube').value


    const ldb = idb.open('CRM', 2);

    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');

        const store = txn.objectStore('tbl_rfid');
        const index = store.index('CC_NO');
        let query = index.getAll(id);

        query.onsuccess = (event) => {

            if (!event.target.result) {
                // unmatchedInventory.push(id)
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

    const data = JSON.parse(localStorage['datas'])

    let inventoryMatch = [];
    let inventoryMisMatch = [];
    let match = data.filter(e => uniqueArr.includes(e.PACK_EPC))
    let Mismatch = data.filter(e => !uniqueArr.includes(e.PACK_EPC))

    let arr1 = []

    for(i=0;i<data.length;i++){
        arr1.push(data[i].PACK_EPC)
    }

setTimeout(()=>{
    let OtherInventory = uniqueArr.filter((e => !arr1.includes(e)))
    document.getElementById('invNotMatch').innerHTML = OtherInventory
    document.getElementById('notmatchdnata').innerHTML = OtherInventory.length
},1000)

  

document.getElementById('matchTable').style.display = 'flex';

    match.forEach((value) => {
        inventoryMatch.push(`
		<div class="app" style="color:green">
            <div class="desc">                    
                <h3 class="name">${value.MC_NO}</h3>
            </div>
            <div class="type">                   
                <h3 class="name">${value.CC_NO}</h3>
            </div>
			<div class="type">                   
				<h3 class="name">${value.CC_POSITION}</h3>
			</div>
			<div class="type">                   
				<h3 class="name">${value.PACK_NO}</h3>
			</div>
			<div class="type">                   
			  <h3 class="name" style="overflow:hidden; text-overflow:ellipsis;">${value.SKU_NAME}</h3>
			</div>
			<div class="type">                   
			    <h3 class="name">${value.SKU_QTY}</h3>
		    </div> 
            </div>
		`)
    })

    Mismatch.forEach((value) => {
        inventoryMisMatch.push(`
		<div class="app" style="color:red">
            <div class="desc">                    
                <h3 class="name">${value.MC_NO}</h3>
            </div>
            <div class="type">                   
                <h3 class="name">${value.CC_NO}</h3>
            </div>
			<div class="type">                   
				<h3 class="name">${value.CC_POSITION}</h3>
			</div>
			<div class="type">                   
				<h3 class="name">${value.PACK_NO}</h3>
			</div>
			<div class="type">                   
			  <h3 class="name" style="overflow:hidden; text-overflow:ellipsis;">${value.SKU_NAME}</h3>
			</div>
			<div class="type">                   
			    <h3 class="name">${value.SKU_QTY}</h3>
		    </div> 
            </div>
		`)
    })

    document.getElementById('invMatch').innerHTML = inventoryMatch

    document.getElementById('matchdata').innerHTML = match.length

    document.getElementById('invMisMatch').innerHTML = inventoryMisMatch

    document.getElementById('loading').style.display = 'none';

}

