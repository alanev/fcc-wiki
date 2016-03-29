var app = angular.module('wikiSearch', []);

app.controller('wikiSearchCtrl', ($scope, $http) => {
    $scope.query = '';
    $scope.results = [];
    $scope.error = false;
    $scope.image = (url) => {
        if (url) {
            var arr = url.replace('thumb/', '').split('/');
            delete arr[arr.length - 1];
            return arr.join('/').slice(0, -1);
        } else {
            return '';
        }
    }
    $scope.get = () => {
        var api = `http://ru.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=15&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${$scope.query}&callback=JSON_CALLBACK`;
        
        $scope.error = '';
        $scope.results = [];
        
        $http.jsonp(api)
            .success((data) => {
                if (data.query) {
                    $scope.results = data.query.pages;
                } else {
                    $scope.error = true;
                }
            });
    }
});