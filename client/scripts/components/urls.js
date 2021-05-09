var ctrl = function (urlsService, $scope, $rootRouter) {
    // this references context, this context is the one we need, so we save it on self var
    var self = this;
    this.errorMessage;

    self.work = () => {
        console.log($scope.url);

        if($scope.url){
                //params are the url params
            console.log("SCOPE",$scope.url)
            // Get Product Data
           // console.log("llega al routeronactivate", url)

            urlsService.crawlUrl($scope.url) // Returns a promise
            .then( (response) => {
                this.errorMessage = null;
                console.log("response",response)

                // In 'data' property it's its body
                self.urls = response.data.data;

                $rootRouter.navigate(["Urls"])
            }).catch( (error) => {
                console.log(error);

                self.errorMessage= "No se han podido descargar las urls de esta página"
            });
        } else{
            urlsService.getUrls() // Returns a promise
            .then( (response) => {
                this.errorMessage = null;
                // console.log(response)

                // In 'data' property it's its body
                self.urls = response.data.data;

                // self.urls.forEach(element => {
                //     element.urlEncoded = customEncode(element.link);
                // });
            }).catch( (error) => {
                console.log(error);

                self.errorMessage= "No se han podido descargar ideas de urls"
            });
        }
    }

    // self.$onInit = function () {
    //     console.log("init")
    //     self.work();
    // };

    self.$routerOnActivate = function (next) {
        console.log("router activate",$scope.url);
        self.work();
    }

    self.newSearch = (url) =>{
        console.log("pasa")
        $scope.url = url;
        self.work();
    }
};

ctrl.$inject = ["urlsService","$scope", "$rootRouter"];

angular
    .module("minicrawler")
    .component("urls", {
        // component view
        templateUrl: "views/urls.html",
        bindings:{
            $router:"<"
        },
        controller: ctrl // Component logic
    });