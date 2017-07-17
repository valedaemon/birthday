'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('review service', function() {
  it('registered the reviews service', () => {
    assert.ok(app.service('reviews'));
  });
});
