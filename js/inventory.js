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
	 
	document.getElementById('loading').style.display = 'flex';
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
			let query = index.getAll(x);
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

			console.log(matchedInventory[0].length)
		
		matchedInventory.forEach((value) => {
			inventoryMatch.push(`
			 

		  <ul class="list-group mb-4">
		  <li class="list-group-item d-flex justify-content-between align-items-center bg-info text-white">
			M.Cube  
			
		  </li>
		  <li class="list-group-item d-flex justify-content-between align-items-center">
		  <small> ${value[0]['MC_NAME']} </small>
		   
		  </li>
		  <li class="list-group-item d-flex justify-content-between align-items-center bg-info text-white">
			Pack <span class="badge badge-danger badge-pill float-right">QTY : ${matchedInventory[0].length}</span>
			 
		  </li>
		  <li class="list-group-item d-flex justify-content-between align-items-center">
		  <small data-toggle="modal" data-target="#exampleModal">${value[0]['PACK_NAME']}    </small>
			 
		  </li>
		</ul>
			 
		`)
		})

		unmatchedInventory.forEach((value) => {
			inventoryNotMatch.push(`
			
  				<li class="list-group-item list-group-item-warning">
				<h6>${value} </h6></li>

			 
		`)
	})
	console.log(inventoryNotMatch)
  
		let str = inventoryMatch.toString().replaceAll(',', '');
		let str1 = inventoryNotMatch.toString().replaceAll(',', '');
		document.getElementById('matchTable').style.display = 'flex';

		document.getElementById('summery').style.display = 'flex';
		document.getElementById('matchTable').style.display = 'flex';
		document.getElementById('matchdata').innerHTML = matchedInventory.length
		document.getElementById('notmatchdnata').innerHTML = unmatchedInventory.length

		// document.getElementById('invNotMatch').innerHTML = str1


		document.getElementById('invMatch').innerHTML = str;
		document.getElementById('loading').style.display = 'none';
	}, 1000);



}