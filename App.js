import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numberOfRounds, setNumberOfRounds] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }


  const restartGameHandler = () => {
    setNumberOfRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numRounds) => {
    setNumberOfRounds(numRounds)
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  content = <GameOverScreen
      roundsNumber={1}
      userNumber={1}
      onRestart={restartGameHandler}
    />;

  if (userNumber && numberOfRounds <= 0) {
    content = <GameScreen
      userChoice={userNumber}
      onGameOver={gameOverHandler}
    />;
  } else if (numberOfRounds > 0) {
    content = <GameOverScreen
      roundsNumber={numberOfRounds}
      userNumber={userNumber}
      onRestart={restartGameHandler}
    />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
