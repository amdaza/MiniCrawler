
angular
.module("minicrawler")
.component("root", {
    $routeConfig: [{
        name: "Urls",
        path: "/urls",
        component: "urls",
        useAsDefault: true
    }],
    templateUrl: "views/root.html"
});