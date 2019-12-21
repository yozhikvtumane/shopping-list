if ('function' === typeof importScripts) {
	importScripts(
	  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
	//   'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-window.prod.mjs'
	  
	);
	/* global workbox */
	if (workbox) {
		console.dir(workbox)
	  console.log('Workbox is loaded');
  
	  /* injection point for manifest files.  */
	  workbox.precaching.precacheAndRoute([]);
  
  /* custom cache rules*/
  } else {
	  console.log('Workbox could not be loaded. No Offline support');
	}
  }
  self.onmessage = function(event) {
	  console.log(event)
	if (event.data.type === 'save') {
	  console.log("logging from serviceWorker:", event)
	  return fetch('http://localhost:5050/shoppingList', {
		method: "POST",
		mode: 'no-cors',
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Accept": "application/json"
		},
		body: JSON.stringify(event.data.save)
	  }).catch(err => console.log(err))
	}
  };
  console.log("self", self)
//   console.log("calls", Calls)