'use strict';

describe( 'Directive: lpToggleTarget', function() {
    var lpToggleTargets;
    var $compile;
    var scope;

    beforeEach( function() {
        module( 'lp-toggle' );

        inject( function( _lpToggleTargets_, _$compile_, _$rootScope_ ) {
            lpToggleTargets = _lpToggleTargets_;
            $compile = _$compile_;
            scope = _$rootScope_.$new();
        } );
    } );

    it( 'should add class to element depending on state', function() {
        var element1 = $compile( '<div lp-toggle-target="zzz1" data-lp-toggle-target-options="{ onClass: \'open\', offClass: \'closed\', state: \'off\' }"></div>' )( scope );
        var element2 = $compile( '<div lp-toggle-target="zzz2" data-lp-toggle-target-options="{ onClass: \'open\', offClass: \'closed\', state: \'on\' }"></div>' )( scope );
        scope.$digest();
        expect( element1.hasClass( 'closed' ) ).toBeTruthy();
        expect( element2.hasClass( 'open' ) ).toBeTruthy();
    } );

    it( 'should throw error if target name already exists', function() {
        var compile = function() {
            $compile( '<div lp-toggle-target="zzz" data-lp-toggle-target-options="{ onClass: \'open\', offClass: \'closed\', state: \'off\' }"></div>' +
            '<div lp-toggle-target="zzz" data-lp-toggle-target-options="{ onClass: \'open\', offClass: \'closed\', state: \'on\' }"></div>' )( scope );
        };

        expect( compile ).toThrowError( 'Target name: \'zzz\' already exists' );
    } );

    it( 'should update element class when lpToggleTargets changes target state', inject( function( $timeout ) {
        var element = $compile( '<div lp-toggle-target="zzz" data-lp-toggle-target-options="{ onClass: \'open\', offClass: \'closed\', state: \'off\' }"></div>' )( scope );
        scope.$digest();

        expect( element.hasClass( 'closed' ) ).toBeTruthy();
        lpToggleTargets.toggleState( [ 'zzz' ] );
        $timeout.flush();
        expect( element.hasClass( 'open' ) ).toBeTruthy();
        lpToggleTargets.toggleState( [ 'zzz' ] );
        $timeout.flush();
        expect( element.hasClass( 'closed' ) ).toBeTruthy();

        lpToggleTargets.open( [ 'zzz' ] );
        $timeout.flush();
        expect( element.hasClass( 'open' ) ).toBeTruthy();

        lpToggleTargets.close( [ 'zzz' ] );
        $timeout.flush();
        expect( element.hasClass( 'closed' ) ).toBeTruthy();
    } ) );
} );
