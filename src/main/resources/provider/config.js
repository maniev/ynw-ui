/**
 * Created by Mani on 01-06-2016.
 */
require.config({
    paths: {
        'angular': "../vendors/angular/angular.min",
        'bootstrap':'../vendors/bootstrap/js/bootstrap.min',
        'jquery':'../vendors/jquery/jquery.min',
        'angular-formly':'../vendors/angular/formly/formly.min',
        'angular-ui-route':'../vendors/angular/ui-router/angular-ui-router.min',
        'api-check': '../vendors/angular/formly/api-check.min',
        'formly-bootstrap':'../vendors/angular/formly/angular-formly-templates-bootstrap.min',
        'jquery-vegas':'../vendors/vegas/jquery.vegas.min',
        'angular-modal-service':'../vendors/angular/modal/angular-modal-service',
        'angular-messages':'../vendors/angular/message/angular-messages.min',
        'ui-bootstrap':'../vendors/bootstrap/js/ui-bootstrap-tpls-0.14.3.min',
        'angular-breadcumb':'../vendors/angular/breadcrumb/uiBreadcrumbs',
        'color-picker':'../vendors/angular/color-picker/bootstrap-colorpicker-module.min',
        'angular-wysiwyg':'../vendors/angular/wysiwyg/angular-wysiwyg.min',
        'ui-select':'../vendors/angular/ui-select/select',
        'angular-sanitize':'../vendors/angular/angular-sanitize'
    },
    shim: {
        'require':{exports:'require'},
        'bootstrap':{deps:['jquery']},
        'angular': {exports: "angular",deps:['bootstrap']},
        'ui-bootstrap':{deps:['angular']},
        'color-picker':{deps:['angular']},
         'ui-select':{deps:['angular']},
        'angular-modal-service':{deps:['angular'],exports:'angular-modal-service'},
        'angular-messages':{deps:['angular'],exports:'angular-messages'},
        'angular-ui-route': {deps:['angular']},
        'angular-formly':{deps:['angular'],exports:'formly'},
        'angular-breadcumb':{deps:['angular'],exports:'angular-breadcumb'},
        'angular-wysiwyg':{deps:['color-picker'],exports:'angular-wysiwyg'},
        'angular-sanitize':{deps:['angular']}
    }
});

require(['main']);