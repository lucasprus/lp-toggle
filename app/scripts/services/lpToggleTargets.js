/* globals _: false */
'use strict';

/**
 * @ngdoc service
 * @name lp-toggle.lpToggleTargets
 * @description
 * # lpToggleTargets
 * Factory in the lp-toggle.
 */
angular.module( 'lp-toggle' )
    .factory( 'lpToggleTargets', /* @ngInject */ function( $rootScope ) {
    var targets = {};

    return {
        add: function( name, target ) {

            // Don't allow duplicates
            if ( targets[ name ] ) {
                throw new Error( 'Target name: \'' + name + '\' already exists' );
            }

            if ( target.closeTargets ) {
                target.closeTargets = target.closeTargets.split( ' ' );
            }

            if ( target.state !== 'on' ) {
                target.state = 'off';
            }

            targets[ name ] = target;
            return target;
        },
        remove: function( name ) {
            delete targets[ name ];
            $rootScope.$broadcast( 'targets_change' );
        },
        toggleState: function( names ) {
            var that = this;
            _.forEach( names, function( name ) {
                var target = targets[ name ];

                if ( target ) {
                    if ( target.state === 'on' ) {
                        target.state = 'off';
                    } else if ( target.state === 'off' ) {
                        target.state = 'on';
                        if ( target.closeTargets ) {
                            that.close( _.difference( target.closeTargets, names ) );
                        }
                    }
                }
            } );
            $rootScope.$broadcast( 'targets_change' );
        },
        open: function( names ) {
            _.forEach( names, function( name ) {
                var target = targets[ name ];

                if ( target ) {
                    target.state = 'on';
                }
            } );
            $rootScope.$broadcast( 'targets_change' );
        },
        close: function( names ) {
            _.forEach( names, function( name ) {
                var target = targets[ name ];

                if ( target ) {
                    target.state = 'off';
                }
            } );
            $rootScope.$broadcast( 'targets_change' );
        }
    };
} );
