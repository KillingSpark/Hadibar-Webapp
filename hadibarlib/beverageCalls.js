//////////////////////////////////
//          Beverages           //
//////////////////////////////////

function newBeverage(newValue, newName, newAvailable, success, failure){
    isSessionIDSet()
    callApi("/api/f/beverage/new", 'PUT',{value: newValue, available: newAvailable, name: newName}, success, failure)   
}

function getBeverages(success, failure){
    isSessionIDSet()
    callApi("/api/f/beverage/all", 'GET',{}, success, failure)   
}

function getBeverage(bevID, success, failure){
    isSessionIDSet()
    callApi("/api/f/beverage/get?id=" + bevID, 'GET',{}, success, failure)   
}

function updateBeverage(bevID, newValue, newAvailable, newName, success, failure){
    isSessionIDSet()
    callApi("/api/f/beverage/update?id=" + bevID, 'POST',{value: newValue, available: newAvailable, name: newName}, success, failure)   
}

function deleteBeverage(bevID, success, failure){
    isSessionIDSet()
    callApi("/api/f/beverage/delete?id=" + bevID, 'DELETE',{}, success, failure)   
}

function addBeverageToGroup(bevID, newGroupID, success, failure){
    isSessionIDSet()
    callApi("/api/f/beverage/addToGroup?id=" + bevID, 'POST',{newgroupid: newGroupID}, success, failure)
}