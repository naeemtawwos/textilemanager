
var Datastore = require('nedb'),
	assert = require('assert');	
  
db = {};

//var MongoClient = require('mongodb').MongoClient,
//    assert = require('assert');

/*MongoClient.connect("mongodb://localhost:27017/textileManagerDB", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
  else{
  	console.log(err);
  }
});

var db = new MongoClient.Db('test', new MongoClient.Server('locahost', 27017));
*/


//var Engine = require('tingodb')({'nativeObjectID':true}),
  
// assert = require('assert');

db.customers_Collection = new Datastore({ filename: 'dbscript/nedb/customers_Collection.db', autoload: true });
db.suppliers_Collection = new Datastore({ filename: 'dbscript/nedb/suppliers_Collection.db', autoload: true });
db.loginCreds_Collection = new Datastore({ filename: 'dbscript/nedb/loginCreds_Collection.db', autoload: true });
db.lot_Collection = new Datastore({ filename: 'dbscript/nedb/lot_Collection.db', autoload: true });
db.count_Collection = new Datastore({ filename: 'dbscript/nedb/count_Collection.db', autoload: true });//count as in the type of the yarn purchased
db.pkTracker_Collection = new Datastore({ filename: 'dbscript/nedb/pkTracker_Collection.db', autoload: true });//count as a tracker for the autoincrement feature





//tis function initializes the database and the collections.
//if the database does not exist a new database is created, if it exists the existing database is used
function initializeDB(){
// a collection in Mongo is roughly equalto a table in RDBMS
//loginCreds_Collection = db.collection("textileManagerDB");
/*
LOT will have 
	i)a unique, preferebally auto_incrementable id
	ii) Count which is the type of lot that -i egs 30s SemiCombed, 30s Combed, 34s SemiCombed. 34s Combed etc
	iii) The mill (Supplier) from which the yarn was purchased
	iv) quantity in  kilograms plus grams
	v) Date Purchased
	vi) invoice number
	vii) price purchased for
*/

//will contain a count type and description

//console.log("**********"+suppliers_Collection.find({'_id':'address01'}).get("_fields"));


db.count_Collection.insert({_id:"01", count:"30s", description:"combed"}, function(err, insertedDoc) {
  assert.equal(null, err);
  console.log(err);
  });


db.loginCreds_Collection.insert([
	{_id:"admin", name:'admin',passwd:'test'},
	{_id:"guest", name:'guest', passwd:''}],
    function(err, insertedDoc) {
  assert.equal(null, err);
  console.log(err);
  });


db.suppliers_Collection.insert(
	{_id:"address01", name:"Mangalam Yarns", tinNo:123456, phoneNo1:"+919952494995", emailId : "naeem.mailto@gmail.com", altPhone:"+910000000", phoneNo2:"+91888888888",  streetAddres:"Palladam Road", state:"TN", city:"mangalam"  },
	function(err,insertedDoc){
		assert.equal(null,err);
		console.log(err);
	});



//collection to maintain 'auto_incrementing';
db.pkTracker_Collection.insert({_id:"customer_id",seq:1 });
}





/*
@args
add: Whether to add or remove the customer, true denotes add
cust: the object containing the details of the customer or in case of remove, the id of the customer to be removed
*/
function addRemCustomer(add,cust){

	if(add == true){
		var nexSeq;
		cust=JSON.parse(cust);
		//cust["_id"]= nexSeq;
		var result = db.pkTracker_Collection.update({'_id':'customer_id'},{$inc:{'seq':1}}); // increment the value of the counter by one
		var results = db.pkTracker_Collection.find({'_id':'customer_id'},{'seq':1,'_id':0}, function(err, docs){
			nexSeq=docs[0]['seq'];
			assert.equal(null,err);
			console.log("ERROR IN INSERTING TO PKTRACKER COLLECTION :-"+err);
			cust._id=nexSeq;
			db.customers_Collection.insert(cust,function(err,result){
			assert.equal(null,err);
			console.log(err);
			for(var key in result) {
    			var value = result[key];
				console.log(key+".........>"+value);
				}
			});
		});
		console.log("::::::::::::::::"+JSON.stringify(results));

		

		

			
	}
	else{
		db.customers_Collection.remove({"_id":cust});
	}
}

/*
@args
add: Whether to add or remove the supplier, true denotes add
cust: the object containing the details of the supplier or in case of remove, the id of the supplier to be removed
*/
function addRemSupplier(add, supplier){
	if(add == true){
		suppliers_Collection.insert(cust);
	}
	else{
		suppliers_Collection.remove({"_id":cust});
	}	
}


/*information related to a supplier can be chanded/update
	The mongo save method replaces an existing document completely with the new document
*/
function updateSupplierInfo(id, cust){
	db.suppliers_Collection.save({"_id":id}, cust);
}
/*information related to a customer can be chanded/update
	The mongo save method replaces an existing document completely with the new document
*/
function updateCustomerInfo(id,cust ){
	db.customers_Collection.save({"_id":id}, cust);
}



function addNewLot(lot){
	db.lot_Collection.insert(lot);
}

function addNewCountType(count){
	db.count_Collection.insert(count);
}


function deleteUser(){

}


function addUser(){

}


function changePassword(){

}


function errorCallback(err, result) {
	assert.equal(null,err);
	console.log(err);
}



//function used for the implementation of autoincrementing primarykey
function getNextSequence(name){
	
	db.pkTracker_Collection.update({'_id':name},{$inc:{'seq':1}}); // increment the value of the counter by one
	docs = db.pkTracker_Collection.find({'_id':name},{'seq':1,'_id':0}, function(err, docs){
		var ret = docs[0]["seq"];
		//addRemCustomer.nexSeq = ret
		assert.equal(null,err);
		console.log("ERROR IN INSERTING TO PKTRACKER COLLECTION :-"+err);
		return ret;			
	});
	
}