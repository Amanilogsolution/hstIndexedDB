const idb = window.indexedDB;

function ToogleButton(type) {
    document.getElementById('QRSearch').style.display = 'block'
    if (type == 'SKU') {
        document.getElementById('Skusearch').style.display = 'block'
        document.getElementById('Kitsearch').style.display = 'none'
        document.getElementById('childCube').value = ''

    } else {
        document.getElementById('Skusearch').style.display = 'none'
        document.getElementById('Kitsearch').style.display = 'block'
        document.getElementById('childCube').value = ''

    }
}

function QRScan(type) {
    if (type == 'SKU') {
        ScanSKU()

    } else {
        ScanKit()

    }
}

function ScanKit() {
    let id = document.getElementById('childCube').value;
    console.log(id)

    const ldb = idb.open('CRM', 1);

    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');
        const store = txn.objectStore('tbl_rfid');
        const index = store.index('PACK_EPC');
        let query = index.get(id);
        let data = []

        query.onsuccess = (event) => {

            if (!event.target.result) {
                console.log(`this ${id} not match`)

            } else {
                data.push(event.target.result)
            }
        };

    }
    console.log(data)


}
function ScanSKU() {
    let id = document.getElementById('childCube').value;

    const ldb = idb.open('CRM', 1);

    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');
        const store = txn.objectStore('tbl_rfid');
        const index = store.index('SKU_CODE');
        let query = index.get(id);
        let data = []


        query.onsuccess = (event) => {

            if (!event.target.result) {
                console.log(`this ${id} not match`)

            } else {
                data.push(event.target.result)
            }
        };

    }
    console.log(data)


}