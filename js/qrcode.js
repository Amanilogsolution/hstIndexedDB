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


    const ldb = idb.open('CRM', 2);

    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');
        const store = txn.objectStore('tbl_rfid');
        const index = store.index('PACK_EPC');
        let query = index.get(id);
        let data = []
        let KITData = '';
        query.onsuccess = (event) => {

            if (!event.target.result) {
                console.log(`this ${id} not match`)

            } else {
                data.push(event.target.result)
            }
        };
        setTimeout(() => {
            data.forEach((value) => {
                KITData = `
                <tr>
                <td>${value.PACK_NO}</td>
                <td>${value.SKU_NAME}</td>
                <td>${value.SKU_CODE}</td>
                </tr>   
                `
            })
            document.getElementById('scandata').innerHTML = KITData

        }, 1000)

    }


}
function ScanSKU() {
    let id = document.getElementById('childCube').value;
    console.log(id)
    const ldb = idb.open('CRM', 1);
    ldb.onsuccess = function () {
        const db = ldb.result;
        const txn = db.transaction('tbl_rfid', 'readonly');
        const store = txn.objectStore('tbl_rfid');
        const index = store.index('SKU_CODE');
        let query = index.get(id);
        let data = [];
        let SKUData = '';

        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`this ${id} not match`)
            } else {

                data.push(event.target.result)
            }
        };
        setTimeout(() => {
            console.log(data)
            data.forEach((value) => {
                SKUData = `
               

                    <tr>
                    <td>${value.PACK_NO}</td>
                    <td>${value.SKU_NAME}</td>
                    <td>${value.SKU_CODE}</td>
                    </tr>   
                `
            })
            document.getElementById('scandata').innerHTML = SKUData

        }, 1000)

    }

}