# fb-text2html

Transform Facebook Graph data: `(text, tags) => html`.

When querying the FB graph using the [Javascript SDK](https://developers.facebook.com/docs/javascript/reference/FB.api), it will return content as plain text (as the `message` property in a `Post` object) - even if the original post included all sorts of links. URLs in the text need to be transformed into HTML links and newlines characters into HTML breaks. Links to other pages can be obtained from the `message_tags` property (see the example of such an object below).

## Emoji's
Some special care needs to be taken to split text by Unicode code points rather than simple characters. I liked the following introduction into the subject: http://blog.jonnew.com/posts/poo-dot-length-equals-two. Good thing is that `Array.from` provides an easy way to deal with this.

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

Uses `Array.from` to split the Facebook post body properly in separate unicode code points. If the function is not available, a fallback is used. The fallback was inspired by this [StackOverflow page](https://stackoverflow.com/questions/21397316/split-javascript-string-into-array-of-codepoints-taking-into-account-surrogat).

## License
MIT, see [LICENSE](./LICENSE).

## Author
Erik Hagreis
