const idb = window.indexedDB;


function removeDuplicates(arr) {
	return arr.filter((item, index) => arr.indexOf(item) === index);
}


function searchchild() {
    console.log('asdsdsd')
	var searchValue = document.getElementById("childCube").value;
	if(searchValue == ''){
		alert('Search Text is empty');
		return false;
	}
	 
	document.getElementById('loading').style.display = 'flex';
	let id = document.getElementById('childCube').value;
	let uniqueArr = []
	let chunks = []
	let matchedInventory = [];
	let unmatchedInventory = []
	for (var i = 0, charsLength = id.length; i < charsLength; i += 24) {
		chunks.push(id.substring(i, i + 24));
	}
	uniqueArr = removeDuplicates(chunks);
	uniqueArr.forEach(x => {
		const ldb = idb.open('CRM', 1);
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

	let inventoryMatch = [];
	let inventoryNotMatch =[];
	

	setTimeout(() => {
		matchedInventory.forEach((value) => {
			inventoryMatch.push(`
			<tr>
		 
			<td>${value.MC_NAME}</td>
			<td>${value.CC_NAME}</td>
			<td>${value.SKU_NAME}</td>
		  </tr>
		`)
		})

		unmatchedInventory.forEach((value) => {
			inventoryNotMatch.push(`
			
  				<li class="list-group-item list-group-item-warning">
				<h6>${value} </h6></li>

			 
		`)
	})
  
		let str = inventoryMatch.toString().replaceAll(',', '');
		let str1 = inventoryNotMatch.toString().replaceAll(',', '');
		document.getElementById('matchTable').style.display = 'flex';
		document.getElementById('matchdata').innerHTML = matchedInventory.length
		document.getElementById('notmatchdnata').innerHTML = unmatchedInventory.length

		document.getElementById('invNotMatch').innerHTML = str1


		document.getElementById('invMatch').innerHTML = str;
		document.getElementById('loading').style.display = 'none';
	}, 1000);



}