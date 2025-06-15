import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import GameCanvas from './components/GameCanvas';
import { saveUserData, loadUserData } from './firebase/userData';

export default function App() {
  const [started, setStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (username) {
      loadUserData(username).then(data => {
        setUserData(data || { xp: 0, level: 1, coins: 200 });
      });
    }
  }, [username]);

  if (!started) {
    return <MainMenu onStart={setStarted} setUsername={setUsername} soundOn={soundOn} setSoundOn={setSoundOn} />;
  }

  if (!userData || !username) {
    return <div style={{color: 'white', textAlign: 'center'}}>Loading game data...</div>;
  }

  return (
    <GameCanvas
      username={username}
      soundOn={soundOn}
      userData={userData}
      saveData={(data) => saveUserData(username, data)}
    />
  );
}
