'use strict';

/**
* @ngdoc directive
* @name lp-toggle.directive:lpToggle
* @description
* # lpToggle
*/
angular.module( 'lp-toggle' )
    .directive( 'lpToggle', /* @ngInject */ function( lpToggleTargets ) {
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
    } );
    