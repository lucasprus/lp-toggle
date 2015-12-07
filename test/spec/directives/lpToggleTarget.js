'use strict';

describe('Directive: lpToggleTarget', function () {

  // load the directive's module
  beforeEach(module('lpToggleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<lp-toggle-target></lp-toggle-target>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the lpToggleTarget directive');
  }));
});
