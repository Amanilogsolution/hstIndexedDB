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

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll(cachedata);
    })
  );
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
