import { AsyncStorage } from 'react-native';
// import { getMetricMetaInfo, timeToString } from './helpers'

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

function setDummyData() {
  console.log('logging dummy data');
  const dummyData = {
    React: {
      title: 'React',
      cards: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
  };

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData), () => {
    console.log(dummyData);
    AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
      console.log(JSON.parse(result));
    });
  });

  return dummyData;
}

export function formatDeckResults(results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results);
}
