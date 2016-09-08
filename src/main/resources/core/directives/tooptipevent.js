/**
 * Created by Mani on 20-04-2016.
 */
define(['../coreModule'],function (core) {
    return core.directive('fireToolEvent', function() {
        return {
            restrict: "A",
            link: function (scope, element) {
                element.find('button').on('click', function () {
                    element.find('span').trigger("toolEvent");
                });
            }
        };
    });
});

