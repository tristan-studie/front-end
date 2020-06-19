// let db;
//
// window.onload = function() {
//   let request = window.indexedDB.open('front_end', 1);
//   request.onerror = function() {
//     console.log('Database failed to open');
//   }
//   request.onsuccess = function(){
//     console.log('Database opened successfully');
//
//     db = request.result;
//
//     displayData();
//   }
//   request.onupgradeneeded = function(e){
//     let db = e.target.result;
//     let objectStore = db.createObjectStore('settings', { keyPath: 'id', autoIncrement:true});
//
//     objectStore.createIndex('setting', 'setting', { unique: true});
//     objectStore.createIndex('value', 'value', { unique: false});
//
//     console.log('Database setup complete');
//   }
//
//   form.onsubmit = addData;
//   function.addData(e){
//     e.preventDefault();
//
//     let newItem = { setting: settingName.value, value: settingValue.value};
//     let transaction = db.transaction(['settings'], 'readwrite');
//
//     let objectStore = transaction.objectStore('settings');
//
//     let request = objectStore.add(newItem);
//     request.onsuccess = function(){
//       settingName.value = '';
//       settingValue.value = '';
//     }
//     transaction.oncomplete = function(){
//       console.log('Transaction completed: database modification finished.');
//
//       displayData();
//     }
//     transaction.onerror = function(){
//       console.log('Transaction not opened due to error');
//     }
//   }
//
//
//
// }
