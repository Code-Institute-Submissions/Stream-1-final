//creates the for formDirective
angular.module('formDirectives',[]).directive('ngSubValid', [function() {
    var FOCUS_CLASS = "ng-subinvalid";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch('submitted', function() {
                if (scope.submitted && ctrl.$dirty && ctrl.$invalid) {
                    element.addClass(FOCUS_CLASS);
                } else {
                    element.removeClass(FOCUS_CLASS);
                }         
            });
            element.bind('focus', function(evt) {
                element.removeClass(FOCUS_CLASS);
            }).bind('blur', function(evt) {
                if (scope.submitted && ctrl.$dirty && ctrl.$invalid) {
                    element.addClass(FOCUS_CLASS);
                } else {
                    element.removeClass(FOCUS_CLASS);
                }
            });
        }
    }
}])

//make map directive, allow us to inject map into template when called
.directive('makeMap', function() {
        var directive = {
            templateUrl: 'templates/directives/map.html',
            scope: {
                map: '='
            },
            link: function(scope, element, attrs) {
                console.log("in map directive link");
            },
            controller: function mapController($scope) {
                $scope.zoomIn = function() {
                    $scope.map.zoom++;
                };
 
                $scope.zoomOut = function() {
                    $scope.map.zoom--;
                }
 
                $scope.mapDimensions = function() {
                    if (!$scope.map.width) {
                        var width = 1000;
                    } else {
                        width = $scope.map.width;
                    }
 
                    if (!$scope.map.height) {
                        var height = 800;
                    } else {
                        height = $scope.map.height;
                    }
                    return width + 'x' + height;
                }
            }
        };
        return directive;
    })


.directive('priceTable4', function() {
    return {
    restrict: 'A',    // A -> attribute
    templateUrl: 'templates/directives/price-table-4.html'
  };
})

.directive('weatherTable', function(){
    return {
        restrict: 'A',
        templateUrl: 'templates/directives/weather-table.html'
    };
});
