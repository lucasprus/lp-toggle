'use strict';

/**
 * @ngdoc directive
 * @name lp-toggle.directive:lpToggleTarget
 * @description
 * # lpToggleTarget
 */
angular.module( 'lp-toggle' )
    .directive( 'lpToggleTarget', /* @ngInject */ function( lpToggleTargets ) {
        var lpToggleTargetLink = function( scope, element, attrs ) {
            var name = attrs.lpToggleTarget;
            var target = lpToggleTargets.add( name, { state: scope.options.state, closeTargets: scope.options.closeTargets } );

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
                scope.$applyAsync();
            } );

            scope.$on( '$destroy', function() {
                lpToggleTargets.remove( name );
            } );
        };

        return {
            scope: {
                options: '=lpToggleTargetOptions'
            },
            link: lpToggleTargetLink
        };
    } );
