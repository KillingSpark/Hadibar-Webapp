function accountReport(success, failure){
    isSessionIDSet()
    callApi("/api/f/reports/accounts", 'GET',{}, success, failure)   
}

function beverageReport(success, failure){
    isSessionIDSet()
    callApi("/api/f/reports/beverages", 'GET',{}, success, failure)   
}

function transactionReport(accountID, success, failure){
    isSessionIDSet()
    callApi("/api/f/reports/transactions", 'GET',{accid: accountID}, success, failure)   
}