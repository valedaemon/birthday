'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('mailer service', function() {
  it('registered the mailers service', () => {
    assert.ok(app.service('mailers'));
  });
});
