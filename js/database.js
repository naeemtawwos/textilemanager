function initializeDB(){

var Engine = require('tingodb')(),
 assert = require('assert');

var textileManagerDB = new Engine.Db('dbscript/', {});
var loginCredsCollection = textileManagerDB.collection("");
loginCredentials.insert([{name:'admin',passwd:'test'}
  , {name:'guest'}, passwd:''], {w:1}, function(err, result) {
  assert.equal(null, err);

  collection.findOne({name:'guest'}, function(err, item) {
    assert.equal(null, err);
    assert.equal('guest', item.name);
  })
});

}