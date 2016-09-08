/**
 * Created by Mani on 20-04-2016.
 */
define(['angular', 'api-check', 'formly-bootstrap', 'angular-messages','ui-select','angular-sanitize'], function (angular) {
    var formlyModule = angular.module('formlyM', ['formly','formlyBootstrap','ngMessages','ui.bootstrap','ui.select','ngSanitize']);
    formlyModule.run(['$log', 'formlyConfig', 'formlyValidationMessages', function ($log, formlyConfig, formlyValidationMessages) {
        $log.info('Initialized the Formly Module');
        var attributes = ['date-disabled', 'custom-class', 'show-weeks', 'starting-day', 'init-date', 'min-mode', 'max-mode', 'format-day', 'format-month', 'format-year', 'format-day-header', 'format-day-title', 'format-month-title', 'year-range', 'shortcut-propagation', 'datepicker-popup', 'show-button-bar', 'current-text', 'clear-text', 'close-text', 'close-on-date-selection', 'datepicker-append-to-body', 'meridians', 'readonly-input', 'mousewheel', 'arrowkeys'];
        var bindings = ['datepicker-mode', 'min-date', 'max-date', 'hour-step', 'minute-step', 'show-meridian'];
        var ngModelAttrs = {};
        angular.forEach(attributes, function (attr) {
            ngModelAttrs[camelize(attr)] = {attribute: attr};
        });
        angular.forEach(bindings, function (binding) {
            ngModelAttrs[camelize(binding)] = {bound: binding};
        });
        function camelize(string) {
            string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
            // Ensure 1st char is always lowercase
            return string.replace(/^([A-Z])/, function (match, chr) {
                return chr ? chr.toLowerCase() : '';
            });
        }

        formlyConfig.setWrapper([
            {
                template: [
                    '<div class="formly-template-wrapper form-group"',
                    'ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
                    '<formly-transclude></formly-transclude>',
                    '<div class="validation"',
                    'ng-if="options.validation.errorExistsAndShouldBeVisible"',
                    'ng-messages="options.formControl.$error">',
                    '<div ng-messages-include="../core/templates/validation.html"></div>',
                    '<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
                    '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
                    '</div>',
                    '</div>',
                    '</div>'
                ].join(' ')
            },
            {
                template: [
                    '<div class="checkbox formly-template-wrapper-for-checkboxes form-group">',
                    '<label for="{{::id}}">',
                    '<formly-transclude></formly-transclude>',
                    '</label>',
                    '</div>'
                ].join(' '),
                types: 'checkbox'
            }
        ]);
        formlyConfig.setType({
            name: 'button',
            template: '<div><button type="{{::to.type}}" class="btn btn-{{::to.btnType}}" ng-click="onClick($event)">{{to.text}}</button></div>',
            wrapper: ['bootstrapLabel'],
            defaultOptions: {
                templateOptions: {btnType: 'default', type: 'button'},
                extras: {skipNgModelAttrsManipulator: true}
            },
            controller: function ($scope) {
                $scope.onClick = onClick;
                function onClick($event) {
                    if (angular.isString($scope.to.onClick)) {
                        return $scope.$eval($scope.to.onClick, {$event: $event});
                    } else {
                        return $scope.to.onClick($event);
                    }
                }
            },
            apiCheck: function (check) {
                return {
                    templateOptions: {
                        onClick: check.oneOfType([check.string, check.func]),
                        type: check.string.optional,
                        btnType: check.string.optional,
                        text: check.string
                    }
                }
            }
        });
        /*formlyConfig.setWrapper({name:'validation',types:['input','maskedInput'], template: '<div><div class="my-messages" ng-messages="fc.$error" ng-if="form.$submitted || options.formControl.$touched"><div class="some-message" ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages"><div uib-tooltip="{{message(fc.$viewValue, fc.$modelValue, this)}}" tooltip-placement="top" tooltip-is-open="true" tooltip-trigger="none" tooltip-class="customClass" style="margin-top:-5px;height:5px;">&nbsp;</div></div></div><formly-transclude></formly-transclude> </div>'});*/
        formlyConfig.setType({
            name: 'matchField',
            apiCheck: function () {
                return {data: {fieldToMatch: formlyExampleApiCheck.string}}
            },
            apiCheckOptions: {prefix: 'matchField type'},
            defaultOptions: function matchFieldDefaultOptions(options) {
                return {
                    extras: {validateOnModelChange: true}, expressionProperties: {
                        'templateOptions.disabled': function (viewValue, modelValue, scope) {
                            var matchField = find(scope.fields, 'key', options.data.fieldToMatch);
                            if (!matchField) {
                                throw new Error('Could not find a field for the key ' + options.data.fieldToMatch);
                            }
                            var model = options.data.modelToMatch || scope.model;
                            var originalValue = model[options.data.fieldToMatch];
                            var invalidOriginal = matchField.formControl && matchField.formControl.$invalid;
                            return !originalValue || invalidOriginal;
                        }
                    }, validators: {
                        fieldMatch: {
                            expression: function (viewValue, modelValue, fieldScope) {
                                var value = modelValue || viewValue;
                                var model = options.data.modelToMatch || fieldScope.model;
                                return value === model[options.data.fieldToMatch];
                            },
                            message: options.data.matchFieldMessage || "'Password does not match'"
                        }
                    }
                };
                function find(array, prop, value) {
                    var foundItem;
                    array.some(function (item) {
                        if (item[prop] === value) {
                            foundItem = item;
                        }
                        return !!foundItem;
                    });
                    return foundItem;
                }
            }
        });
        formlyConfig.setType({name:'select',template:'<div><select ng-if="!formState.readOnly" class="form-control" ng-model="model[options.key]" ng-options="option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] group by option[to.groupProp || \'group\'] for option in to.options"></select><p ng-if="formState.readOnly" class="form-control-static">{{model[options.key]}}</p></div>',wrapper: ['bootstrapLabel', 'bootstrapHasError'],overwriteOk: true});
        formlyConfig.setType({name:'ui-select',extends:'select',template:'<ui-select ng-model="model[options.key]" theme="bootstrap" ng-required="{{to.required}}" ng-disabled="{{to.disabled}}" reset-search-input="false"> <ui-select-match class="ui-select-match" placeholder="{{to.placeholder}}"> {{$select.selected[to.labelProp || \'name\']}} </ui-select-match> <ui-select-choices class="ui-select-choices" group-by="to.groupBy" repeat="option[to.valueProp || \'value\'] as option in to.options | filter: $select.search"> <div ng-bind-html="option[to.labelProp || \'name\'] | highlight: $select.search"></div> </ui-select-choices> </ui-select>'});
        formlyConfig.setType({
        name:'ui-select-multiple',extends:'ui-select',template:'<ui-select multiple="" ng-model="model[options.key]" theme="bootstrap" ng-required="{{to.required}}" ng-disabled="{{to.disabled}}"><ui-select-match placeholder="{{to.placeholder}}"> {{$item[to.labelProp || \'name\']}} </ui-select-match><ui-select-choices group-by="to.groupBy" repeat="option[to.valueProp || \'value\'] as option in to.options | filter: $select.search"><div ng-bind-html="option[to.labelProp || \'name\'] | highlight: $select.search"></div></ui-select-choices></ui-select>'});
        formlyConfig.setType({
            name: 'simple-select',
            template: '<div><select ng-if="!formState.readOnly" class="form-control" ng-model="model[options.key]" ng-options="option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] for option in to.options"></select><p ng-if="formState.readOnly" class="form-control-static">{{model[options.key]}}</p></div>',
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            overwriteOk: true
        });
        formlyConfig.setType({
            name: 'radioType',
            extends: 'radio',
            template: '<div class="radio-group"><label ng-repeat="(key, option) in to.options"class="radio-inline"><input type="radio" id="{{id + \'_\'+ $index}}" tabindex="0" ng-value="option[to.valueProp || \'value\']" ng-model="model[options.key]">{{option[to.labelProp || \'name\']}}</label></div>'
        })
        formlyConfig.setType({
            name: 'richTextArea',
            extends: 'textarea',
            template: '<wysiwyg textarea-id="question" textarea-class="form-control"  textarea-height="180px" textarea-name="textareaQuestion" textarea-required ng-model="description" enable-bootstrap-title="true" textarea-menu="menu" disabled="disabled"></wysiwyg>'
        });
        formlyConfig.setType({
            name: 'datepicker',
            template: '<p class="input-group" ng-if="!formState.readOnly"><input type="text" id="{{::id}}" name="{{::id}}" ng-model="model[options.key]" class="form-control" ng-click="datepicker.open($event)" datepicker-popup="{{to.datepickerOptions.format}}" is-open="datepicker.opened" datepicker-options="to.datepickerOptions"/><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="datepicker.open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></p><p ng-if="formState.readOnly" class="form-control-static">{{model[options.key]}}</p>',
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            defaultOptions: {
                ngModelAttrs: ngModelAttrs, templateOptions: {
                    datepickerOptions: {
                        format: 'dd-MMM-yyyy',
                        initDate: new Date()
                    }
                }
            },
            controller: ['$scope', function ($scope) {
                $scope.datepicker = {};
                $scope.datepicker.opened = false;
                $scope.datepicker.open = function ($event) {
                    $scope.datepicker.opened = true;
                };
            }]
        });
        formlyConfig.setType({
            name: 'timepicker',
            template: '<timepicker ng-model="model[options.key]"></timepicker>',
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            defaultOptions: {ngModelAttrs: ngModelAttrs, templateOptions: {datepickerOptions: {}}}
        });
        formlyConfig.setType({name:'input', template:'<div><input ng-if="!formState.readOnly" class="form-control" ng-model="model[options.key]"><p ng-if="formState.readOnly" class="form-control-static">{{model[options.key]}}</p></div>', wrapper:['bootstrapLabel', 'bootstrapHasError'], overwriteOk:true});
    }]);
    return formlyModule;
});