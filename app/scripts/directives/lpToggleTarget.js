'use strict';

/**
 * @ngdoc directive
 * @name lpToggleApp.directive:lpToggleTarget
 * @description
 * # lpToggleTarget
 */
angular.module('lpToggleApp')
    .directive('lpToggleTarget', [ 'lpToggleTargets', function( lpToggleTargets ) {
        var lpToggleTargetLink = function( scope, element, attrs ) {
            var target = lpToggleTargets.add( attrs.lpToggleTarget, { state: scope.options.state, closeTargets: scope.options.closeTargets } );

            var onClass = scope.options.onClass;
            var offClass = scope.options.offClass;

            scope.$watch( function() {
                    return target.state;
                }, function( newValue ) {
                if ( newValue === 'on' ) {
                    element.removeClass( offClass );
                    element.addClass( onClass );
                } else if ( newValue === 'off' ) {
                    element.addClass( offClass );
                    element.removeClass( onClass );
                }
            } );

            scope.$on( 'targets_change', function() {
                scope.$digest();
            } );

            scope.$on( '$destroy', function() {
                lpToggleTargets.remove( attrs.lpToggleTarget );
            } );
        };

        return {
            scope: {
                options: '=lpToggleTargetOptions'
            },
            link: lpToggleTargetLink
        };
    } ] );
