function ToogleButton(type){
    document.getElementById('QRSearch').style.display='block'
    if(type == 'SKU'){
        document.getElementById('Skusearch').style.display='block'
        document.getElementById('Kitsearch').style.display='none'
        document.getElementById('childCube').value = ''

    }else{
        document.getElementById('Skusearch').style.display='none'
        document.getElementById('Kitsearch').style.display='block'
        document.getElementById('childCube').value = ''

    }
    console.log(type)
}

function QRScan(type){
    if(type == 'SKU'){
        ScanKit()
    }else{
        ScanSKU()
    }
}

function ScanKit(){
  let value=  document.getElementById('childCube').value
  console.log(value)
    
}
function ScanSKU(){
    let value=  document.getElementById('childCube').value
    console.log(value)
    
}