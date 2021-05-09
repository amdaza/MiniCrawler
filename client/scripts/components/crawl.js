
var ctrl = function (urlsService) {
    this.errorMessage;

    var $ctrl = this;
    $ctrl.isReusable = false;
    $ctrl.$routerCanReuse = function () { return true; }

    $ctrl.$routerOnReuse = function (next) {
        if (!$ctrl.isReusable) {
            $ctrl.isReusable = true;
            return false;
        }
        $ctrl.isReusable = false;
        init(next.params);
    };

    $ctrl.$routerOnActivate = function (next) {
        init(next.params);
    }

    function init(params){
        //params are the url params
        console.log("next",params)
        // Get Product Data
        var url = params.id;
        console.log("llega al routeronactivate", url)

        urlsService.crawlUrl(url) // Returns a promise
        .then( (response) => {
            this.errorMessage = null;
            console.log("response",response)

            // In 'data' property it's its body
            self.urls = response.data.data;
        }).catch( (error) => {
            console.log(error);

            self.errorMessage= "No se han podido descargar las urls de esta página"
        });
      }
      


};


ctrl.$inject = ["urlsService"];

angular
    .module("minicrawler")
    .component("crawl", {
        templateUrl: "views/urls.html",
        // 'bindings' Establish component communication interface
        bindings: {
            // get $router automatically from ng-outlet. It has to be that name
            $router: "<" // unidirectional binding, cannot be @ nor &
        },
        controller: ctrl // Component logic
    });