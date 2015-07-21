var Engine = require('tingodb')(),
    assert = require('assert');

var textileManagerDB = new Engine.Db('dbscript/', {});



//tis function initializes the database and the collections.
//if the database does not exist a new database is created, if it exists the existing database is used
initializeDB();
function initializeDB(){
// a collection in Mongo is roughly equalto a table in RDBMS
var loginCreds_Collection = textileManagerDB.collection("textileManagerDB");
var	suppliers_Collection = textileManagerDB.collection("textileManagerDB");
var customers_Collection = textileManagerDB.collection("textileManagerDB");
var lot_Collection = textileManagerDB.collection("textileManagerDB");
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

var count_Collection = textileManagerDB.collection("textileManagerDB");
//will contain a count type and description


count_Collection.insert({count:"30s", description:"combed"}, function(err, result) {
  assert.equal(null, err);
  console.log(err);
  console.log(result);
 });


loginCreds_Collection.insert([
	{name:'admin',passwd:'test'},
	{name:'guest', passwd:''}],
    function(err, result) {
  assert.equal(null, err);
  console.log(err);
  });


suppliers_Collection.insert(
	{name:"Mangalam Yarns", tinNo:123456, phoneNo1:"+919952494995", emailId : "naeem.mailto@gmail.com", altPhone:"+910000000", phoneNo2:"+91888888888",  streetAddres:"Palladam Road", state:"TN", city:"mangalam"  },
	{name:"Mangalam Yarns", tinNo:123456, phoneNo1:"+919952494995", emailId : "naeem.mailto@gmail.com", altPhone:"+910000000", phoneNo2:"+91888888888",  streetAddres:"Palladam Road", state:"TN", city:"mangalam"  }
	, function(err,result){
		assert.equal(null,err);
	});

}


/*
@args
add: Whether to add or remove the customer, true denotes add
cust: the object containing the details of the customer or in case of remove, the id of the customer to be removed
*/
function addRemCustomer(add,cust){
	if(add == true){
		customers_Collection.insert(cust);
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
