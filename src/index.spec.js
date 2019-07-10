import { text2html } from './index';

describe('sample 1', () => {
  const text = `hey! check out this cool FB page 😋,

and also don't miss out on this link: goo.gl/Q377nS
bye! 😹`;

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

describe('sample 2', () => {
  const text = `We have an insanely nice & loyal fan who buys us a crate of the most exclusive beer in the world every now and then! 😱 thank you so much Harm Janssen! ❤️ we just played an instore show at MusicMachine Sittard and now we’re off to play Fiesta du Rock in Flemalle, Belgium! 🇧🇪🤟🏾🦅🍻`;
  const tags = [
    {
      id: '10157307567462822',
      name: 'Harm Janssen',
      type: 'user',
      offset: 137,
      length: 12
    },
    {
      id: '1649041608657713',
      name: 'MusicMachine Sittard',
      type: 'page',
      offset: 188,
      length: 20
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
