
//tis function initializes the database and the collections.
//if the database does not exist a new database is created, if it exists the existing database is used
function initializeDB(){
var Engine = require('tingodb')(),
    assert = require('assert');

var textileManagerDB = new Engine.Db('dbscript/', {});
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


lot_Collection.insert([
	{count:"30s", description:"combed"},
	{count:"34s", description:"SemiCombed"}
	], function(err,result){
	assert.equal(null,err);
	console.log(err);	
	}

	);


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


function addRemCustomer(){

}

function addNewLot(){

}


function addRemSupplier(){

}

function addNewCountType(){

}






