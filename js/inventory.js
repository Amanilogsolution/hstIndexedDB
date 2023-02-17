const idb = window.indexedDB; 

function removeDuplicates(arr) {
	return arr.filter((item, index) => arr.indexOf(item) === index);
} 

function searchchild() { 
	var searchValue = document.getElementById("childCube").value;
	console.log(searchValue);
	if(searchValue == ''){
		alert('Search Text is empty');
		return false;
	}
	 
	//document.getElementById('loading').style.display = 'flex';
	let id = document.getElementById('childCube').value;
	console.log(id) 
	let uniqueArr = []
	let chunks = []
	let matchedInventory = [];
	let unmatchedInventory = []
	for (var i = 0, charsLength = id.length; i < charsLength; i += 24) {
		chunks.push(id.substring(i, i + 24));
	}
	uniqueArr = removeDuplicates(chunks);



	uniqueArr.forEach(x => {
		const ldb = idb.open('CRM', 2);
		ldb.onsuccess = function () {
			const db = ldb.result;
			const txn = db.transaction('tbl_rfid', 'readonly');
			const store = txn.objectStore('tbl_rfid');
			const index = store.index('PACK_EPC');
			let query = index.get(x);
			query.onsuccess = (event) => {
				if (!event.target.result) {
					unmatchedInventory.push(x)
				} else {
					matchedInventory.push(event.target.result) 
				}
			};
		}

	})
	var displayInvetory = '';
	document.getElementById('loading').style.display='flex';
	setTimeout(() => { 
		 
		 var result = matchedInventory.reduce((x,y)=>{
			(x[y.MC_NAME] = x[y.MC_NAME] || []).push(y)
			return x;
		 },{})

		let result2 = Object.keys(result)  
		 
        
  

		for(i=0;i<result2.length;i++){
			displayInvetory += '<ul class="list-group"><li class="list-group-item d-flex justify-content-between align-items-center bg-info text-white">'+ result[`${result2[i]}`][0]['MC_NAME']+ '</li>'
			var result1 = result[`${result2[i]}`].reduce((x, y) => {
			(x[y.PACK_NAME] = x[y.PACK_NAME] || []).push(y);
			return x;
		}, {});

		let result3 = Object.keys(result1) 
		for(j=0;j<result3.length;j++){
			displayInvetory +=`
			<li class="list-group-item d-flex justify-content-between align-items-center" onClick="ab('${result1[result3[j]][0]['PACK_EPC']}')" data-toggle="modal" data-target="#exampleModal">
			 ${result1[result3[j]][0]['PACK_NAME']}  
			 <span class="badge badge-success  float-right">  ${result1[result3[j]].length} </span></li></ul>`
	 	   
		} 
			
		}
		document.getElementById('summery').style.display='flex';
		document.getElementById('loading').style.display='none';
		document.getElementById('matchdata').innerHTML = matchedInventory.length;
		document.getElementById('invMatch').innerHTML = displayInvetory;
	}, 1000); 

	

}


function ab(value) {   
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
			let SkuData = []
				packData[0].forEach((value , index) => {
			SkuData.push(`  
		  <tr>
		  <th scope="row"><small>${++index}</small></th>
		  <td><small>${value['SKU_NAME']}</small></td>
		  <td><small>${value['SKU_QTY']}</small></td> 
		</tr>			 
		`)			 
		})
		let str = SkuData.toString().replaceAll(',', '');
		document.getElementById('skudatavalue').innerHTML = str
		},1000)

}