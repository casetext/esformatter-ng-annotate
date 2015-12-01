'use strict';

var esformatter = require('esformatter');
var expect = require('chai').expect;
var plugin = require('../');

describe('esformatter-ng-annotate', function() {

  before(function() {
    esformatter.register(plugin);
  });

  it('should remove a single newline', function() {

    var input = [
      '/* @ngInject */',
      'function foo(bar) {',
      '}'
    ].join('\n');

    var output = esformatter.format(input);

    expect(output).to.equal([
      '/* @ngInject */ function foo(bar) {',
      '}'
    ].join('\n'))


  });

  it('should remove a multiple newlines', function() {

    var input = [
      '/* @ngInject */',
      '',
      '',
      'function foo(bar) {',
      '}'
    ].join('\n');

    var output = esformatter.format(input);

    expect(output).to.equal([
      '/* @ngInject */ function foo(bar) {',
      '}'
    ].join('\n'))


  });

})