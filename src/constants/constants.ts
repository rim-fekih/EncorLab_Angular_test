import { LoremIpsum } from 'lorem-ipsum';

export const API_URL = 'https://picsum.photos/id/';

export const TEXT_GENERATOR = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const NUMBER_OF_CARDS = 1083;

export const MAX_CARDS_PER_PAGE = 12;
