self.addEventListener('install', (e) => {
    console.log('Service Worker instalado correctamente.');
  });
  
  self.addEventListener('fetch', (e) => {
    // Aquí es donde en el futuro haremos que la app funcione offline
    e.respondWith(fetch(e.request));
  })