'use strict';

describe('Service: lpToggleTargets', function () {

  // load the service's module
  beforeEach(module('lpToggleApp'));

  // instantiate service
  var lpToggleTargets;
  beforeEach(inject(function (_lpToggleTargets_) {
    lpToggleTargets = _lpToggleTargets_;
  }));

  it('should do something', function () {
    expect(!!lpToggleTargets).toBe(true);
  });

});
