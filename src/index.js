import AutoLinker from 'autolinker';
import { defaults, forEachRight, map } from 'lodash';

export const text2html = (message, tags = [], options = {}) => {
  const opts = defaults({}, options, {
    addTags: true,
    autolinker: true,
    addParagraphs: true
  });

  if (opts.addTags) {
    forEachRight(tags, tag => {
      message = addTag(message, tag);
    });
  }

  if (opts.autolinker) {
    message = getAutoLinker().link(message);
  }

  if (opts.addParagraphs) {
    message = message
      .split('\n\n')
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('')
      .replace(/\n/g, '<br/>');
  }

  return message;
};

const addTag = (text, tag) => {
  const { id, name, offset, length } = tag;
  const link = `<a href="https://www.facebook.com/${id}">${name}</a>`;

  const chars = getChars(text);
  return [
    ...chars.slice(0, offset),
    link,
    ...chars.slice(offset + length)
  ].join('');
};

let autoLinker;
const getAutoLinker = () => {
  autoLinker =
    autoLinker ||
    new AutoLinker({
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
const getChars = str => (Array.from ? Array.from(str) : arrayFrom(str));

const arrayFrom = str =>
  map(toCodePoints(str), codepoint => String.fromCodePoint(codepoint));

const toCodePoints = str => {
  const chars = [];
  for (var i = 0; i < str.length; i++) {
    var c1 = str.charCodeAt(i);
    if (c1 >= 0xd800 && c1 < 0xdc00 && i + 1 < str.length) {
      var c2 = str.charCodeAt(i + 1);
      if (c2 >= 0xdc00 && c2 < 0xe000) {
        chars.push(0x10000 + ((c1 - 0xd800) << 10) + (c2 - 0xdc00));
        i++;
        continue;
      }
    }
    chars.push(c1);
  }
  return chars;
};
