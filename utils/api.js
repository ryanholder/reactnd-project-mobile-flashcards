import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from './_decks';

export const saveDeckTitle = async (title) => {
  try {
    const decks = await getDecks()
    if (decks.hasOwnProperty(title)) {
      throw Error(`title: '${title}' exists.`)
    }
    decks[title] = {
      title,
      questions: [],
    }
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

// export function removeEntry (key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }