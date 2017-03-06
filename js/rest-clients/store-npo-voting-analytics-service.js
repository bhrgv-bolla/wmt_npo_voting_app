

const STORE_ANALYTICS_SERVICE_ENDPOINT = "http://172.16.143.136:8082/api/caritasAnalytics/";

var storeAnalyticsService = {
  getAnalyticsForStore: function(storeId){
      let endPoint = STORE_ANALYTICS_SERVICE_ENDPOINT + 100;//TODO change this to storeId
      console.log("Requested for storeId", endPoint);
      return fetch(endPoint, {method: "GET"}).then((response) => response.json());//return a promise
  }
}

module.exports = storeAnalyticsService;
