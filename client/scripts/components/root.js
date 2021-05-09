
angular
.module("minicrawler")
.component("root", {
    $routeConfig: [{
        name: "Urls",
        path: "/urls",
        component: "urls",
        useAsDefault: true
    },
    {
        name: "UrlCrawled",
        path: "/crawl/:id",
        component: "crawl"
    }],
    templateUrl: "views/root.html"
});