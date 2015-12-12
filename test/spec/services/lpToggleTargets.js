'use strict';

describe( 'Service: lpToggleTargets', function() {
    var lpToggleTargets;

    beforeEach( function() {
        module( 'lp-toggle' );

        module( function( $exceptionHandlerProvider ) {
            $exceptionHandlerProvider.mode( 'log' );
        } );

        inject( function( _lpToggleTargets_ ) {
            lpToggleTargets = _lpToggleTargets_;
        } );
    } );

    it( 'should allow to add target with already used name if deleted', function() {
        lpToggleTargets.add( 'zzz', { state: 'on' } );
        lpToggleTargets.remove( 'zzz' );

        var addWithAlreadyUsedName = function() {
            lpToggleTargets.add( 'zzz', { state: 'on' } );
        };

        expect( addWithAlreadyUsedName ).not.toThrowError();
    } );

    describe( 'add', function() {
        it( 'should throw error when target name already exists', inject( function( $exceptionHandler, $timeout ) {
            lpToggleTargets.add( 'zzz', { state: 'on' } );
            $timeout( function() {
                lpToggleTargets.add( 'zzz', { state: 'on' } );
            } );

            $timeout.flush();
            expect( $exceptionHandler.errors[ 0 ] ).toEqual( new Error( 'Target name: \'zzz\' already exists' ) );
        } ) );

        it( 'should throw error when target name already exists ( another way to test it )', function() {
            lpToggleTargets.add( 'zzz', { state: 'on' } );
            var addAnotherTarget = function() {
                lpToggleTargets.add( 'zzz', { state: 'on' } );
            };

            expect( addAnotherTarget ).toThrowError( 'Target name: \'zzz\' already exists' );
        } );
    } );
} );
