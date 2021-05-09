// Module setter

angular.module(
    "minicrawler",
    [
        "ngComponentRouter"
    ]);

// Configure provider $locationProvider.
// Establish navigation model HTML5 for Single Page Application to work
angular.module("minicrawler").config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});

// Indicate root component in '$routerRootComponent'
angular.module("minicrawler").value("$routerRootComponent", "root");