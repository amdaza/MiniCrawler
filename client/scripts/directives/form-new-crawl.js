angular.module("minicrawler").directive("formNewCrawl", function () {

    return {
        restrict: "EA",
        templateUrl: "views/form-new-crawl.html",
        scope:{
            newCrawlToClick: "&"
        },
        link: function (scope){
            scope.notifyNewCrawl = function (){
                scope.newCrawlToClick({
                    url: scope.newUrl
                });
            };
        }
    };
});
