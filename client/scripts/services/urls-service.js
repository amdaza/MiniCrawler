
angular
.module("minicrawler")
.service("urlsService", function($http, Properties) {
    // All functionality that you want to export has to be published in this
    this.getUrls = function() {
        return $http.get(Properties.serverUrl + Properties.endpointUrls);
    };

    this.crawlUrl = function(url) {
        // console.log("before", url)
         url = encodeURIComponent(url);
        // console.log("URL in SERVice", url, Properties.serverUrl + Properties.endpointCrawl + "/" + url)
        //if (validURL(url)){
            return $http.get(Properties.serverUrl + Properties.endpointCrawl + "/" + url);
        // } else {
        //     return Promise.reject(new Error("Invalid url"));
        // }
    };
});