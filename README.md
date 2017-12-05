# reactnd-project-mobile-flashcards
Mobile Flashcards project application for Udacity React Nanodegree. This project was built with React-Native, React Navigation and Redux.

This is a submitted project for the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019)


This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Install and Run App

1. Clone this repository: `git clone https://github.com/ryanholder/reactnd-project-mobile-flashcards`
2. cd into folder
3. Install libraries: `yarn install`
4. Start packager: `yarn start`

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Application Tested Using...

* Run on Android Virtual Device
  * Nexus 5X using version 23 of the API

* Run on Xcode device simulator
  * Using iPhone SE with iOS 10.2

* Run on iPhone 6 using the [Expo App](https://expo.io/)


## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # package manager file. It's unlikely that you'll need to modify this.
├── App.js # This is the root of your app.
├── configureStore.js # Setup Redux Store and export to use in App.js
├── actions
│   ├── decks.js # Actions related to Decks and Deck Cards
│   └── types.js # Create type constants for Actions and Reducers
├── components
│   ├── AddNewCards.js # The add new card component
│   ├── AddNewDeck.js # The add new deck component
│   ├── DeckList.js # A list of all the available decks
│   ├── DeckListItem.js # A specific deck view after clicking on a deck from DeckList.js
│   ├── FlashcardsStatusBar.js  # Status bar component for the applicaiton
│   └── QuizCards.js # Component that handles the quiz of the flash cards
├── navigation
│   ├── MainNavigator.js # Setting up the application stack navigation
│   └── Tabs.js # Setting up the tabs for the Home screen
├── reducers
│   ├── decks.js # Deck and Deck Card related reducers for Redux
│   └── index.js # File to combine more than one type of reducer (currently have only 1)
└── utils
    ├── api.js # Used to get and add Decks and Deck Cards to AsyncStorage
    ├── colors.js # Defined colors used in application
    └── notifications.js # Create and set a local notification reminding user to study
```       

## License
This project is licensed under the terms of the MIT license.

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
