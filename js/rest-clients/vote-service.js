

//Implements Vote NPO service endpoints.
const VOTE_NPO_SERVICE_ENDPOINT = "http://172.16.143.124:8080/vote/";

var voteNPOService = {
  voteForNPO: function(storeId, transId, transType, nonProfitId){//First 3 will be from QR code and nonProfitId when user selects.
    let endPoint = VOTE_NPO_SERVICE_ENDPOINT + storeId + "/transId/" + transId + "/" + transType + "/nonProfId/" + nonProfitId;
    console.log("Vote for NPO", endPoint);
    return fetch(endPoint, {method: "PUT"}).then((response) => console.log(response)); //yeah don't bother catching the response status.
  }
}

module.exports = voteNPOService;
