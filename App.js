import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numberOfRounds, setNumberOfRounds] = useState(0);

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

  if (userNumber && numberOfRounds <= 0) {
    content = <GameScreen 
                userChoice={userNumber} 
                onGameOver={gameOverHandler} 
              />;
  } else if(numberOfRounds > 0) {
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
