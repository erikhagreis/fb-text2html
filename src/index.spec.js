import { text2html } from 'fb-text2html';

describe('fb-text2html', () => {
  const text =
    "hey! check out this cool FB page 😋,\n\nand also don't miss out on this link: goo.gl/Q377nS\nbye! 😹";
  const tags = [
    {
      id: '189217720153',
      name: 'cool FB page',
      type: 'page',
      offset: 20,
      length: 12
    }
  ];
  let output;

  describe('running with default options (all transformations)', () => {
    it('outputs the expected html-formatted string', () => {
      output = text2html(text, tags);
      expect(output).toMatchSnapshot();
    });
  });

  describe('only adding tags', () => {
    it('outputs the expected html-formatted string', () => {
      output = text2html(text, tags, {
        addTags: true,
        autolinker: false,
        addParagraphs: false
      });
      expect(output).toMatchSnapshot();
    });
  });

  describe('only autolinking', () => {
    it('outputs the expected html-formatted string', () => {
      output = text2html(text, tags, {
        addTags: false,
        autolinker: true,
        addParagraphs: false
      });
      expect(output).toMatchSnapshot();
    });
  });

  describe('only adding paragraphs', () => {
    it('outputs the expected html-formatted string', () => {
      output = text2html(text, tags, {
        addTags: false,
        autolinker: false,
        addParagraphs: true
      });
      expect(output).toMatchSnapshot();
    });
  });
});
