

//Implements Store NPO service endpoints.
const STORE_NPO_SERVICE_ENDPOINT = "http://caritas-store-configuration-svc.devenv.jmagan1.dev.cloud.wal-mart.com:8080/";

var storeNPOService = {
  getAllNPOsForStore: function(storeId){
      let endPoint = STORE_NPO_SERVICE_ENDPOINT + "allNonProfits/store/" + storeId;
      console.log("Requested for storeId", endPoint);
      return fetch(endPoint, {method: "GET"}).then((response) => response.json());//return a promise

  },
  getVoteableNPOsForStore: function(storeId){
    let endPoint = STORE_NPO_SERVICE_ENDPOINT + "allVotableNonProfits/store/" + storeId;
    console.log("Requested for storeId", endPoint);
    return fetch(endPoint, {method: "GET"}).then((response) => response.json());
  },
  getTop3NPOsForStore: function(storeId){
    let endPoint = STORE_NPO_SERVICE_ENDPOINT + "topThreeVisableNonProfits/store/" + storeId;
    console.log("Requested for storeId", endPoint);
    return fetch(endPoint, {method: "GET"}).then((response) => response.json());
  },
  setVotableStatusForNPO: function(npo, storeId, status){
    let endPoint = STORE_NPO_SERVICE_ENDPOINT + "setNonProfitsVotableStatus/nonProfit/"+npo+"/store/"+storeId+"/status/"+status;
    console.log("Requested change for NPO", endPoint);
    return fetch(endPoint, {method: "PUT"}).then((response) => console.log(response)); //Just console log the data
  },
  setVisibleStatusForNPO: function(npo, storeId, status){
    let endPoint = STORE_NPO_SERVICE_ENDPOINT + "setNonProfitVisibleStatus/nonProfit/"+npo+"/store/"+storeId+"/status/"+status;
    console.log("Requested change for NPO", endPoint);
    return fetch(endPoint, {method: "PUT"}).then((response) => console.log(response)); //yeah don't bother catching the response status.
  }
}



module.exports = storeNPOService;



/*
/allNonProfits/store/{store}
/allVotableNonProfits/store/{store}
/topThreeVisableNonProfits/store/{store} - this actually brings anything back that visible....no restrictions yet



#PUT Endpoints - expects no body (and would do nothing with it)
/setNonProfitsVotableStatus/nonProfit/{nonProfit}/store/{store}/status/{status}
/setNonProfitVisibleStatus/nonProfit/{nonProfit}/store/{store}/status/{status}
*/
