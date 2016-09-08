/**
 * Created by Mani on 27-11-2015.
 */

var counter_module = angular.module('time_counter', []);

counter_module.directive('countdown', ['$interval', function ($interval) {
    return {
        restrict: 'A',
        replace: true,
        scope: {date: '@', showdays:'@', showhours:'@',showminutes:'@',showseconds:'@'},
        transclude: true,
        templateUrl: 'components/counter/counter_tmpl.html',
        link: function (scope, element) {
            var future;
            future = new Date(scope.date);
            scope.days = 0;
            scope.hours = 0;
            scope.minutes = 0;
            scope.seconds = 0;
            $interval(function () {
                var future;
                future = new Date(scope.date);
                var diff;
                diff = Math.floor(((future.getTime() - new Date().getTime())) / 1000);
                diff =diff-19800;
               /* console.log(future.getTime());
                console.log(new Date().getTime());
                console.log(diff);*/
                t=diff;
                var days, hours, minutes, seconds;
                days = Math.floor(diff / 86400);
                t -= days * 86400;
                hours = Math.floor(t / 3600) % 24;
                t -= hours * 3600;
                minutes = Math.floor(t / 60) % 60;
                t -= minutes * 60;
                seconds = t % 60;
                if(scope.showdays=="true")
                    scope.days = days;
                if(scope.showhours=="true")
                    scope.hours = hours;
                if(scope.showminutes=="true")
                    scope.minutes = minutes;
                if(scope.showseconds=="true")
                    scope.seconds = seconds;
            }, 1000);
        }
    };
}]);
