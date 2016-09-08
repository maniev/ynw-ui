/**
 * Created by Mani on 20-04-2016.
 */
define(['../coreModule'],function (core) {
    return core.directive('ngEnter', function() {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };  
    });
});

