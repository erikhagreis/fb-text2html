"use strict";

var _index = require("./index");

describe('sample 1', function () {
  var text = "hey! check out this cool FB page \uD83D\uDE0B,\n\nand also don't miss out on this link: goo.gl/Q377nS\nbye! \uD83D\uDE39";
  var tags = [{
    id: '189217720153',
    name: 'cool FB page',
    type: 'page',
    offset: 20,
    length: 12
  }];
  var output;
  describe('running with default options (all transformations)', function () {
    it('outputs the expected html-formatted string', function () {
      output = (0, _index.text2html)(text, tags);
      expect(output).toMatchSnapshot();
    });
  });
  describe('only adding tags', function () {
    it('outputs the expected html-formatted string', function () {
      output = (0, _index.text2html)(text, tags, {
        addTags: true,
        autolinker: false,
        addParagraphs: false
      });
      expect(output).toMatchSnapshot();
    });
  });
  describe('only autolinking', function () {
    it('outputs the expected html-formatted string', function () {
      output = (0, _index.text2html)(text, tags, {
        addTags: false,
        autolinker: true,
        addParagraphs: false
      });
      expect(output).toMatchSnapshot();
    });
  });
  describe('only adding paragraphs', function () {
    it('outputs the expected html-formatted string', function () {
      output = (0, _index.text2html)(text, tags, {
        addTags: false,
        autolinker: false,
        addParagraphs: true
      });
      expect(output).toMatchSnapshot();
    });
  });
});
describe('sample 2', function () {
  var text = "We have an insanely nice & loyal fan who buys us a crate of the most exclusive beer in the world every now and then! \uD83D\uDE31 thank you so much Harm Janssen! \u2764\uFE0F we just played an instore show at MusicMachine Sittard and now we\u2019re off to play Fiesta du Rock in Flemalle, Belgium! \uD83C\uDDE7\uD83C\uDDEA\uD83E\uDD1F\uD83C\uDFFE\uD83E\uDD85\uD83C\uDF7B";
  var tags = [{
    id: '10157307567462822',
    name: 'Harm Janssen',
    type: 'user',
    offset: 137,
    length: 12
  }, {
    id: '1649041608657713',
    name: 'MusicMachine Sittard',
    type: 'page',
    offset: 188,
    length: 20
  }];
  var output;
  describe('running with default options (all transformations)', function () {
    it('outputs the expected html-formatted string', function () {
      output = (0, _index.text2html)(text, tags);
      expect(output).toMatchSnapshot();
    });
  });
  describe('only adding tags', function () {
    it('outputs the expected html-formatted string', function () {
      output = (0, _index.text2html)(text, tags, {
        addTags: true,
        autolinker: false,
        addParagraphs: false
      });
      expect(output).toMatchSnapshot();
    });
  });
  describe('only autolinking', function () {
    it('outputs the expected html-formatted string', function () {
      output = (0, _index.text2html)(text, tags, {
        addTags: false,
        autolinker: true,
        addParagraphs: false
      });
      expect(output).toMatchSnapshot();
    });
  });
  describe('only adding paragraphs', function () {
    it('outputs the expected html-formatted string', function () {
      output = (0, _index.text2html)(text, tags, {
        addTags: false,
        autolinker: false,
        addParagraphs: true
      });
      expect(output).toMatchSnapshot();
    });
  });
});