import AutoLinker from 'autolinker';
import { defaults, forEachRight, toArray } from 'lodash';

export function text2html(message, tags = [], options = {}) {
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
}

function addTag(text, tag) {
  const { id, name, offset, length } = tag;
  const link = `<a href="https://www.facebook.com/${id}">${name}</a>`;

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
  const chars = toArray(text);
  return [
    ...chars.slice(0, offset),
    link,
    ...chars.slice(offset + length)
  ].join('');
}

let autoLinker;
function getAutoLinker() {
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
}
