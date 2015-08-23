


function saveCustomer(formData){
    addRemCustomer(formData, add = true);
	return true;
}


function saveSupplier(formData){
    addRemSupplier(formData, add = true);
    return true;
}


function loadCustomers(){
  db.customers_Collection.find({});
  db.customers_Collection.find({}, function (err, docs){
        //ret = docs;
        customers = docs;

  });
}

function login(){

}



//jquery function to serialize form
//jquery should be included before this script is included
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
