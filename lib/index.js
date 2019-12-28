"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.text2html = void 0;

var _autolinker = _interopRequireDefault(require("autolinker"));

var _defaults = _interopRequireDefault(require("lodash/defaults"));

var _forEachRight = _interopRequireDefault(require("lodash/forEachRight"));

var _map = _interopRequireDefault(require("lodash/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var text2html = function text2html(message) {
  var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var opts = (0, _defaults["default"])({}, options, {
    addTags: true,
    autolinker: true,
    addParagraphs: true
  });

  if (opts.addTags) {
    (0, _forEachRight["default"])(tags, function (tag) {
      message = addTag(message, tag);
    });
  }

  if (opts.autolinker) {
    message = getAutoLinker().link(message);
  }

  if (opts.addParagraphs) {
    message = message.split('\n\n').map(function (paragraph) {
      return "<p>".concat(paragraph, "</p>");
    }).join('').replace(/\n/g, '<br/>');
  }

  return message;
};

exports.text2html = text2html;

var addTag = function addTag(text, tag) {
  var id = tag.id,
      name = tag.name,
      offset = tag.offset,
      length = tag.length;
  var link = "<a href=\"https://www.facebook.com/".concat(id, "\">").concat(name, "</a>");
  var chars = getChars(text);
  return [].concat(_toConsumableArray(chars.slice(0, offset)), [link], _toConsumableArray(chars.slice(offset + length))).join('');
};

var autoLinker;

var getAutoLinker = function getAutoLinker() {
  autoLinker = autoLinker || new _autolinker["default"]({
    urls: {
      schemeMatches: true,
      wwwMatches: true,
      tldMatches: true
    },
    email: true,
    phone: false,
    hashtag: 'facebook',
    mention: false,
    newWindow: false
  });
  return autoLinker;
};
/*
  converting to array with Lodash 'toArray' solves an issue where taking string
  lengths in Javascript yields unexpected results when these strings contain
  emoji's. For example, did you know:

  '💩'.length === 2
  '👩‍❤️‍💋‍👩'.length === 11

  more about the issue:
  http://blog.jonnew.com/posts/poo-dot-length-equals-two

  uses either Array.from if available, or a polyfill method as fallback
*/


var getChars = function getChars(str) {
  return Array.from ? Array.from(str) : arrayFrom(str);
};

var arrayFrom = function arrayFrom(str) {
  return (0, _map["default"])(toCodePoints(str), function (codepoint) {
    return String.fromCodePoint(codepoint);
  });
};

var toCodePoints = function toCodePoints(str) {
  var chars = [];

  for (var i = 0; i < str.length; i++) {
    var c1 = str.charCodeAt(i);

    if (c1 >= 0xd800 && c1 < 0xdc00 && i + 1 < str.length) {
      var c2 = str.charCodeAt(i + 1);

      if (c2 >= 0xdc00 && c2 < 0xe000) {
        chars.push(0x10000 + (c1 - 0xd800 << 10) + (c2 - 0xdc00));
        i++;
        continue;
      }
    }

    chars.push(c1);
  }

  return chars;
};