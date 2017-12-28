import fbText2html from 'fb-text2html';

describe('fb-text2html', () => {
  const text =
    'hey! checkout this cool FB page 😋,\n\nand also checkout this link: goo.gl/Q377nS\nbye! 😹';
  const tags = [
    {
      id: '189217720153',
      name: 'cool FB page',
      type: 'page',
      offset: 19,
      length: 12
    }
  ];

  describe('running with default options (all transformations)', () => {
    it('outputs the expected html-formatted string', () => {
      const html = fbText2html(text, tags);

      expect(html).toMatchSnapshot();
    });
  });

  describe('only adding tags', () => {
    it('outputs the expected html-formatted string', () => {
      const html = fbText2html(text, tags, {
        addTags: true,
        autolinker: false,
        addParagraphs: false
      });

      expect(html).toMatchSnapshot();
    });
  });

  describe('only autolinking', () => {
    it('outputs the expected html-formatted string', () => {
      const html = fbText2html(text, tags, {
        addTags: false,
        autolinker: true,
        addParagraphs: false
      });

      expect(html).toMatchSnapshot();
    });
  });

  describe('only adding paragraphs', () => {
    it('outputs the expected html-formatted string', () => {
      const html = fbText2html(text, tags, {
        addTags: false,
        autolinker: false,
        addParagraphs: true
      });

      expect(html).toMatchSnapshot();
    });
  });
});