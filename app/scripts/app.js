'use strict';

/**
 * @ngdoc overview
 * @name lp-toggle
 * @description
 * # lp-toggle
 *
 * Main module of the application.
 */
angular.module( 'lp-toggle', [ 'ngRoute' ] )
    .config( /* @ngInject */ function( $routeProvider ) {
        $routeProvider.
            when( '/', {
                templateUrl: 'views/main.html'
            } ).
            when( '/another-page', {
                templateUrl: 'views/another-page.html'
            } ).
            otherwise( {
                redirectTo: '/'
            } );
    } );
