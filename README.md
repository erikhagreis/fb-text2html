# fb-text2html

Transform Facebook Graph data: `(text, tags) => html`.

When querying the FB graph using the [Javascript SDK](https://developers.facebook.com/docs/javascript/reference/FB.api), it will return content as plain text - even if the original post included all sorts of links. Information about which links to other FB pages are in the post can be obtained though. URLs and newlines can be converted to markup as well.

This lib will do this for you:
- add links for tags
- add links for urls, emailadresses and hashtags in the text
- change newlines into paragraphs and breaks

In this context, tags are basically links to other Facebook pages. Information about which pieces of the text should link to which pages can be obtained separately from the FB API (ie: `message` = text; `message_tags` = tags). For an example of a tag list, [see the example under 'usage'](#usage).

## Installing
Use the package manager of your choosing:

```bash
# npm
npm install fb-text2html

# yarn
yarn add fb-text2html
```

Or load directly into your browser:

```html
<script src="./dist/fbtext2html.min.js"></script>
<script>
  window.fbtext2html(message, message_tags, options);
</script>
```

## Usage
```javascript
import { text2html } from 'fb-text2html';

// multiline plain text in;
const text = `hey! check out this cool FB page 😋,

and also don't miss out on this link: goo.gl/Q377nS
bye! 😹`;

// tags come in the following format:
const tags = [
  {
    'id': '189217720153',
    'name': 'cool FB page',
    'type': 'page',
    'offset': 20,
    'length': 12
  }
];

// combine here...
const html = text2html(text, tags);
```
After running, the `html` const will contain the following value:

```html
<!-- formatted for readability, actually a string with no extra whitespace -->
<p>
  hey! check out this <a href="https://www.facebook.com/189217720153">cool FB page</a> 😋,
</p>
<p>
  and also don't miss out on this link: <a href="http://goo.gl/Q377nS">goo.gl/Q377nS</a>
  <br/>
  bye! 😹
</p>
```

### Using CommonJS require
Note above example uses ES Modules. When using CommonJS modules (ie in Node), you include the library as follows, with all else staying the same:

```javascript
const fbText2html = require("fb-text2html").text2html;
```

### Options
You can set some options. Here you see the defaults:

```javascript
const options = {
  // should anchor links be added for tags?
  addTags: true,

  // should autolinker add links for:
  // - urls
  // - email addresses
  // - hashtags (link to facebook's hashtag search results)
  autolinker: true,

  // should newline characters be replaced by paragraph + break markup?
  // single newline are replaced with <br/> tag
  // double newlines are processed as delineators of paragraphs
  addParagraphs: true
};

const html = fbText2html(text, tags, options);
```

## Acknowledgements
This lib uses [AutoLinker](https://github.com/gregjacobs/Autolinker.js/). Good lib, made my life easy :+1:. 

Also in there: Lodash, which turned out to be absolutely essential to work with unicode text which contains emoticons. Glad I did not have to figure out [this bit of code](https://github.com/lodash/lodash/blob/master/.internal/unicodeToArray.js) by myself :).

## License
MIT, see [LICENSE](./LICENSE).

## Author
Erik Hagreis
