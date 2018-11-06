//////////////////////////////////
//          Accounts           //
//////////////////////////////////

function newAccount(newValue, newName, success, failure){
    isSessionIDSet()
    callApi("/api/f/account/new?id=", 'PUT',{value: newValue, name: newName}, success, failure)   
}

function getAccounts(success, failure){
    isSessionIDSet()
    callApi("/api/f/account/all", 'GET',{}, success, failure)   
}

function getAccount(accID, success, failure){
    isSessionIDSet()
    callApi("/api/f/account/get?id=" + accID, 'GET',{}, success, failure)   
}

function updateAccount(accID, newValue, newName, success, failure){
    isSessionIDSet()
    callApi("/api/f/account/update?id=" + accID, 'POST',{value: newValue, name: newName}, success, failure)   
}

function deleteAccount(accID, success, failure){
    isSessionIDSet()
    callApi("/api/f/account/delete?id=" + accID, 'DELETE',{}, success, failure)   
}

function addAccountToGroup(accID, newGroupID, success, failure){
    isSessionIDSet()
    callApi("/api/f/account/addToGroup?id=" + accID, 'POST',{newgroupid: newGroupID}, success, failure)
}