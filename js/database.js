var Engine = require('tingodb')(),
    assert = require('assert');

var textileManagerDB = new Engine.Db('dbscript/', {});


var customers_Collection;
customers_Collection=textileManagerDB.collection("textileManagerDB");
var suppliers_Collection;
var loginCreds_Collection;
var lot_Collection;
var count_Collection;
var counters_Collection = textileManagerDB.collection("textileManagerDB");

//tis function initializes the database and the collections.
//if the database does not exist a new database is created, if it exists the existing database is used
function initializeDB(){
// a collection in Mongo is roughly equalto a table in RDBMS
loginCreds_Collection = textileManagerDB.collection("textileManagerDB");
suppliers_Collection = textileManagerDB.collection("textileManagerDB");
customers_Collection = textileManagerDB.collection("textileManagerDB");
lot_Collection = textileManagerDB.collection("textileManagerDB");
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

count_Collection = textileManagerDB.collection("textileManagerDB");
//will contain a count type and description


count_Collection.insert({_id:"01", count:"30s", description:"combed"}, function(err, result) {
  assert.equal(null, err);
  console.log(err);
  });


loginCreds_Collection.insert([
	{_id:"admin", name:'admin',passwd:'test'},
	{_id:"guest", name:'guest', passwd:''}],
    function(err, result) {
  assert.equal(null, err);
  console.log(err);
  });


suppliers_Collection.insert(
	{_id:"address01", name:"Mangalam Yarns", tinNo:123456, phoneNo1:"+919952494995", emailId : "naeem.mailto@gmail.com", altPhone:"+910000000", phoneNo2:"+91888888888",  streetAddres:"Palladam Road", state:"TN", city:"mangalam"  },
	function(err,result){
		assert.equal(null,err);
	});

}


//collection to maintain 'auto_incrementing';
counters_Collection.insert({_id:"customer_id",seq:1 });



/*
@args
add: Whether to add or remove the customer, true denotes add
cust: the object containing the details of the customer or in case of remove, the id of the customer to be removed
*/
function addRemCustomer(add,cust){

	if(add == true){
		cust=JSON.parse(cust);
		cust._id=getNextSequence("customer_id");
		customers_Collection.insert(cust, function(err,result){
			assert.equal(null,err);
			console.log(err);
		});

	}
	else{
		customers_Collection.remove({"_id":cust});
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
	suppliers_Collection.save({"_id":id}, cust);
}
/*information related to a customer can be chanded/update
	The mongo save method replaces an existing document completely with the new document
*/
function updateCustomerInfo(id,cust ){
	customers_Collection.save({"_id":id}, cust);
}



function addNewLot(lot){
	lot_Collection.insert(lot);
}

function addNewCountType(count){
	count_Collection.insert(count);
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




function getNextSequence(name) {/*
	customers_Collection.insert(cust, function(err,result){
			assert.equal(null,err);
			console.log(err);
		});*/

	var ret = counters_Collection.find({'_id':name});
	counters_Collection.update({'_id':name},{$inc:{'seq':1}});
	var ret = counters_Collection.find({'_id':name});
   

   return ret.seq;
}