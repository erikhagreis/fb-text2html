'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = text2html;

var _autolinker = require('autolinker');

var _autolinker2 = _interopRequireDefault(_autolinker);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function text2html(message) {
  var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var opts = (0, _lodash.defaults)({}, options, {
    addTags: true,
    autolinker: true,
    addParagraphs: true
  });

  if (opts.addTags) {
    (0, _lodash.forEachRight)(tags, function (tag) {
      message = addTag(message, tag);
    });
  }

  if (opts.autolinker) {
    message = getAutoLinker().link(message);
  }

  if (opts.addParagraphs) {
    message = message.split('\n\n').map(function (paragraph) {
      return '<p>' + paragraph + '</p>';
    }).join('').replace(/\n/g, '<br/>');
  }

  return message;
}

function addTag(text, tag) {
  var id = tag.id,
      name = tag.name,
      offset = tag.offset,
      length = tag.length;

  var link = '<a href="https://www.facebook.com/' + id + '">' + name + '</a>';

  // converting to array with Lodash 'toArray' solves an issue where taking string
  // lengths in Javascript yields unexpected results when these strings contain
  // emoji's. For example, did you know:
  //
  // '💩'.length === 2
  // '👩‍❤️‍💋‍👩'.length === 11
  //
  // more about the issue:
  // http://blog.jonnew.com/posts/poo-dot-length-equals-two
  //
  // how lodash solved this:
  // https://github.com/lodash/lodash/blob/master/.internal/unicodeToArray.js
  //
  var chars = (0, _lodash.toArray)(text);
  return [].concat(_toConsumableArray(chars.slice(0, offset)), [link], _toConsumableArray(chars.slice(offset + length))).join('');
}

var autoLinker = void 0;
function getAutoLinker() {
  autoLinker = autoLinker || new _autolinker2.default({
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
}