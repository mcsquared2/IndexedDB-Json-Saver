//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange

if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const employeeData = [
   { id: "00-01", name: "gopal", age: 35, email: "gopal@tutorialspoint.com" },
   { id: "00-02", name: "prasad", age: 32, email: "prasad@tutorialspoint.com" }
];
var db;
var _request;
class JsonSaver {
   SetUpDatabase(databaseName, version) {
      this.databaseName = databaseName;
      this.request = window.indexedDB.open(databaseName, version);
   }

   SetOnError(errorCB) {
      this.request.onerror = errorCB;
   }

   SetOnSuccess(successCB) {
      this.request.onsuccess = successCB;
   }

   SetOnUpgradeNeeded(upgradeCB) {
      this.request.onupgradeneeded = upgradeCB;
   }

   Read(table, id) {
      var transaction = db.transaction([table]);
      var objectStore = transaction.objectStore(table);
      var request = objectStore.get(id);

      request.onerror = function(event) {
         alert("Unable to retrieve item");
      }

      request.onsuccess = function(event){
         if (request.result){
            alert("We have retrieved the item.");
         } else {
            alert("Unable to retrieve item with id [" + id + "] from table [" +table+"].");
         }
      };
   }

   ReadAll(table) {
      var objectStore = db.transaction(table).objectStore(table);
      objectStore.openCursor().onsuccess = function(event){
         var cursor = event.target.result;

         if (cursor) {
            alert(cursor.key + " :::: " + cursor.value);
            cursor.continue();
         } else {
            alert("No More Entries")
         }
      }
   }

   Remove(table, id) {
      var request = db.transaction([table], "readwrite")
         .objectStore(table)
         .delete(id);

      request.onsuccess = function(event){
         alert("Deleted item with id of [" + id + "] from table [" + table+"].")
      }
   }

   Add(table, item) {
      var request = db.transaction([table], "readwrite")
         .objectStore(table)
         .add(item);

      request.onsuccess = function(event) {
         alert("Item has been added to " + table);
      }

      request.onerror = function(event) {
         alert("Unable to add item to " + table);
      }
   }

} 



// function add() {
//    var request = db.transaction(["employee"], "readwrite")
//    .objectStore("employee")
//    .add({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });
   
//    request.onsuccess = function(event) {
//       alert("Kenny has been added to your database.");
//    };
   
//    request.onerror = function(event) {
//       alert("Unable to add data\r\nKenny is aready exist in your database! ");
//    }
// }

// function remove() {
//    var request = db.transaction(["employee"], "readwrite")
//    .objectStore("employee")
//    .delete("00-03");
   
//    request.onsuccess = function(event) {
//       alert("Kenny's entry has been removed from your database.");
//    };
// }

// function readAll() {
//    var objectStore = db.transaction("employee").objectStore("employee");
   
//    objectStore.openCursor().onsuccess = function(event) {
//       var cursor = event.target.result;
      
//       if (cursor) {
//          alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
//          cursor.continue();
//       } else {
//          alert("No more entries!");
//       }
//    };
// }

// request.onupgradeneeded = function(event) {
//    var db = event.target.result;
//    var objectStore = db.createObjectStore("employee", {keyPath: "id"});
   
//    for (var i in employeeData) {
//       objectStore.add(employeeData[i]);
//    }
// }

// function read() {
//    var transaction = db.transaction(["employee"]);
//    var objectStore = transaction.objectStore("employee");
//    var request = objectStore.get("00-03");
   
//    request.onerror = function(event) {
//       alert("Unable to retrieve daa from database!");
//    };
   
//    request.onsuccess = function(event) {
//       // Do something with the request.result!
//       if(request.result) {
//          alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
//       } else {
//          alert("Kenny couldn't be found in your database!");
//       }
//    };
// }
