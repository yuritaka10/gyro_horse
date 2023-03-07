var CACHE_NAME = 'gyro_horse';
var urlsToCache = [
    'https://yuritaka10.github.io/gyro_horse/index.html',
    'https://yuritaka10.github.io/gyro_horse/css/style.css',
    'https://yuritaka10.github.io/gyro_horse/images/icons-192.png',
    'https://yuritaka10.github.io/gyro_horse/images/icons-152.png'
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});