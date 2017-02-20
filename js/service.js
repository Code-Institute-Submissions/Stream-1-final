angular.module('myService', [])
    .factory('MyService', function($http) {
        
        MyService = {
            getPrice: function(url) {
                return $http.get(url);
                
            }
        };
        return MyService;
    })

    .factory('UserAPIService', function($http) {
 
        UserAPIService = {
            registerEnquiry: function(url, data) {
                return $http.post(url, data);
            }
        };
        return UserAPIService;
    });