'use strict';

/**
 * @ngdoc directive
 * @name lpToggleApp.directive:lpToggle
 * @description
 * # lpToggle
 */
angular.module( 'lpToggleApp' )
    .directive( 'lpToggle', [ 'lpToggleTargets', function( lpToggleTargets ) {
        var lpToggleLink = function( scope, element, attrs ) {
            var targets = attrs.lpToggle.split( ' ' );

            element.on( 'click', function() {
                lpToggleTargets.toggleState( targets );
            } );
        };

        return {
            link: lpToggleLink,
            restrict: 'A'
        };
    } ] );
