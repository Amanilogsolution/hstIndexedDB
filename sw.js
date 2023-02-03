const CACHE_NAME = "version-1";
const self = this;
// const cachedata = ['index.html','identtificationInner.html','motherCube.html'
// ,'randomInventory.html','inventory.html','qrScan.html','childcube.html','motherChildCude.html','pack.html','skudata.html','css/style.css','js/app.js'
// ,'js/childcube.js','js/mothercube.js','js/qrcode.js','js/inventory.js','js/bootstrap.min.js','js/jquery-3.3.1.min.js','css/boostrap.css','img/mlogo.png'

// ]

const cachedata = ['index.html','identtificationInner.html','motherCube.html','randomInventory.html','inventory.html','qrScan.html','childcube.html','motherChildCude.html','pack.html','skudata.html','css/style.css','css/boostrap.css','js/app.js','js/childcube.js','js/mothercube.js','js/MchildCube.js','js/qrcode.js','js/inventory.js','js/inventoryTablet.js','js/bootstrap.min.js','js/jquery-3.3.1.min.js','js/Pack.js','js/skuData.js','img/motherBox.png']

self.addEventListener("install",e=> {
    e.waitUntil(
        caches.open("static")
        .then((cache)=>{
            return cache.addAll(cachedata)
        })
    )
});

self.addEventListener("fetch", e => {
    e.respondWith(caches.match(e.request)
        .then(response => { return response || fetch(e.request);})
        .catch(()=>caches.match('index.html'))
    )
})


