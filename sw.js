const CACHE_NAME = "version-1";
const self = this;
const cachedata = ['index.html','offline.html','identtificationInner.html','inventoryInner.html'
,'randomInventory.html','inventory.html','qrScan.html','childcube.html','css/style.css','js/app.js'
,'js/childcube.js','js/mothercube.js','js/qrcode.js']

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


