import AutoLinker from 'autolinker';
import { defaults, forEachRight, toArray } from 'lodash';

export function messageToHtml(message, tags = [], options = {}) {
  const opts = defaults({}, options, {
    replaceTags: true,
    replaceLinks: true,
    addParagraphs: true
  });

  if (opts.replaceTags) {
    forEachRight(tags, (tag) => {
      message = addTag(message, tag);
    });
  }

  if (opts.replaceLinks) {
    message = getAutoLinker().link(message);
  }

  if (opts.addParagraphs) {
    message = message
      .split('\n\n')
      .map((paragraph) => `<p>${paragraph}</p>`).join('');
      
    message = message.replace(/\n/g, '<br/>');
  }
  
  return message;
}

export function addTag(message, tag) {
  const { id, name, offset, length } = tag;
  const link = `<a href="http://www.facebook.com/${id}">${name}</a>`;

  // converting to array with Lodash 'toArray' solves issue where taking string 
  // lengths in Javascript fails when these strings contain emoji's. For 
  // example, did you know...
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
  const chars = toArray(message);
  return [ 
    ...chars.slice(0, offset), 
    link, 
    ...chars.slice(offset + length) 
  ].join('');
}

let autoLinker;
function getAutoLinker() {
  autoLinker = autoLinker || new Autolinker({
    urls: {
      schemeMatches: true,
      wwwMatches: true,
      tldMatches: true
    },
    email: true,
    phone: false,
    twitter: true,
    hashtag: 'facebook',
    newWindow: false
  });

  return autoLinker;   
}
