import { StyleSheet, Platform } from 'react-native';
import {
  white,
  black,
  orange,
  green,
  red,
} from './colors';

export default StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 40,
    backgroundColor: white,
  },
  label: {
    fontSize: 28,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 44,
    marginTop: 10,
    padding: 8,
    width: '100%',
  },
  buttonSubmit: {
    alignItems: 'center',
    backgroundColor: orange,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  buttonTextSubmit: {
    fontSize: 20,
    color: white,
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 20,
  },
  list: {
    flex: 1,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: black,
  },
  quizItem: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    margin: 20,
    borderWidth: 0,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    flex: 1,
    alignItems: 'stretch',
  },
  quizCenter: {
    flex: 1,
  },
  question: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCorrect: {
    alignItems: 'center',
    backgroundColor: green,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    justifyContent: 'center',
  },
  buttonIncorrect: {
    alignItems: 'center',
    backgroundColor: red,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    justifyContent: 'center',
  },
  buttonFlip: {
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    justifyContent: 'center',
  },
  cardCount: {
    alignSelf: 'flex-start',
  },
  face: {
    alignItems: 'center',
    flex: 1,
  },
  back: {
    alignItems: 'center',
    flex: 1,
  },
  quizResults: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flipText: {
    color: red,
  },
});
