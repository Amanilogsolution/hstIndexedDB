const CACHE_NAME = "version-1";
const self = this;

const cachedata = [
  "index.html",
  "dashboard.html",
  "childcubeinner.html",
  "motherCube.html",
  "indentifyinner.html",
  "inventory.html",
  "childcube.html",
  "motherChildCude.html",
  "pack.html",
  "skudata.html",
  "css/style.css",
  "css/all.css",
  "css/boostrap.css",
  "js/index.js",
  "js/app.js",
  "js/childcube.js",
  "js/mothercube.js",
  "js/MchildCube.js",
  "js/qrcode.js",
  "js/inventory.js",
  "js/inventoryTablet.js",
  "js/bootstrap.min.js",
  "js/jquery-3.3.1.min.js",
  "js/Pack.js",
  "js/skuData.js",
  "img/motherBox.png",
  "img/barcode-scanner.svg",
  "img/childCube.png",
  "img/house.svg",
  "img/identi.png",
  "img/image2vector.svg",
  "img/inventry_icon.png",
  "img/inventry_icon.svg",
  "img/logo.png",
  "img/qr-code-scan.png",
  "img/qr-code-scan.svg",
  "img/qr-code.svg",
  "img/qrcode.svg",
  "img/random.svg",
  "img/rfi.svg",
  "img/eye.png",
  "img/noImage.jpg",
  "img/KT0008.png",
  "img/KT0029.png",
  "img/KT0088.png",
  "img/KT0093.png",
  "img/KT0099.png",
  "img/KT0124.png",
  "img/childcubehome.png",
  "img/download.jpeg",
  "img/Make_In_India.png",
  "img/scanIndentifyHome.png",
];

<<<<<<< HEAD
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll(cachedata);
    })
  );
=======
const cachedata = ['index.html','dashboard.html','childcubeinner.html','motherCube.html','indentifyinner.html','inventory.html','childcube.html','motherChildCude.html','pack.html','skudata.html','css/style.css','css/all.css','css/boostrap.css','js/index.js','js/app.js','js/childcube.js','js/mothercube.js','js/MchildCube.js','js/qrcode.js','js/inventory.js','js/inventoryTablet.js','js/bootstrap.min.js','js/jquery-3.3.1.min.js','js/Pack.js','js/skuData.js'
,'img/motherBox.png','img/barcode-scanner.png','img/childCube.png','img/house.svg','img/identi.png','img/image2vector.svg','img/inventry_icon.png','img/inventry_icon.svg',
'img/logo.png','img/qr-code-scan.png','img/qr-code-scan.svg','img/qr-code.svg','img/qrcode.svg','img/random.svg','img/rfi.svg','img/eye.png','img/noImage.jpg'
,'img/KT0004.png','img/KT0006.png', 'img/KT0007.png', 'img/KT0008.png',
'img/KT0009.png', 'img/KT0010.png', 'img/KT0011.png', 'img/KT0012.png',
'img/KT0013.png', 'img/KT0014.png', 'img/KT0016.png', 'img/KT0017.png',
'img/KT0018.png', 'img/KT0019.png', 'img/KT0020.png', 'img/KT0021.png',
'img/KT0022.png', 'img/KT0023.png', 'img/KT0024.png', 'img/KT0025.png',
'img/KT0026.png', 'img/KT0027.png', 'img/KT0029.png', 'img/KT0030.png',
'img/KT0031.png', 'img/KT0032.png', 'img/KT0033.png', 'img/KT0034.png',
'img/KT0035.png', 'img/KT0036.png', 'img/KT0037.png', 'img/KT0038.png',
'img/KT0039.png', 'img/KT0040.png', 'img/KT0041.png', 'img/KT0042.png',
'img/KT0043.png', 'img/KT0044.png', 'img/KT0046.png', 'img/KT0047.png',
'img/KT0048.png', 'img/KT0049.png', 'img/KT0050.png', 'img/KT0051.png',
'img/KT0052.png', 'img/KT0054.png', 'img/KT0055.png', 'img/KT0056.png',
'img/KT0057.png', 'img/KT0058.png', 'img/KT0059.png', 'img/KT0060.png',
'img/KT0061.png', 'img/KT0063.png', 'img/KT0064.png', 'img/KT0065.png',
'img/KT0066.png', 'img/KT0067.png', 'img/KT0068.png', 'img/KT0069.png',
'img/KT0070.png', 'img/KT0072.png', 'img/KT0073.png', 'img/KT0074.png',
'img/KT0075.png', 'img/KT0076.png', 'img/KT0077.png', 'img/KT0078.png',
'img/KT0079.png', 'img/KT0081.png', 'img/KT0082.png', 'img/KT0083.png',
'img/KT0084.png', 'img/KT0085.png', 'img/KT0086.png', 'img/KT0087.png',
'img/KT0088.png', 'img/KT0089.png', 'img/KT0090.png', 'img/KT0091.png',
'img/KT0092.png', 'img/KT0093.png', 'img/KT0095.png', 'img/KT0096.png',
'img/KT0097.png', 'img/KT0098.png', 'img/KT0099.png', 'img/KT0100.png',
'img/KT0101.png', 'img/KT0102.png', 'img/KT0103.png', 'img/KT0104.png',
'img/KT0105.png', 'img/KT0107.png', 'img/KT0109.png', 'img/KT0110.png',
'img/KT0111.png', 'img/KT0112.png', 'img/KT0113.png', 'img/KT0116.png',
'img/KT0118.png', 'img/KT0120.png', 'img/KT0121.png', 'img/KT0122.png',
'img/KT0123.png', 'img/KT0124.png', 'img/KT0125.png', 'img/KT0126.png',
'img/KT0127.png', 'img/KT0129.png', 'img/KT0130.png', 'img/KT0132.png',
'img/KT0133.png', 'img/KT0134.png', 'img/KT0135.png', 'img/KT0136.png',
'img/childcubehome.png','img/download.jpeg','img/Make_In_India.png','img/scanIndentifyHome.png','js/data.json']

self.addEventListener("install",e=> {
    e.waitUntil(
        caches.open("static")
        .then((cache)=>{
            return cache.addAll(cachedata)
        })
    )
>>>>>>> 0ce4e81d9e71830398d56eb8099498e2af01eccc
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((response) => {
        return response || fetch(e.request);
      })
      .catch(() => caches.match("index.html"))
  );
});
