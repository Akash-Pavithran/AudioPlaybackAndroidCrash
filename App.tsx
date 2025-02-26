/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {AudioManager, StreamState} from 'react-native-audio-playback';

const audios = {
  MAIN_MENU_BGM: require('./assets/sounds/mainMenu_bgm_44100_2.mp3'),
  SIX_HIT: require('./assets/sounds/six_hit_ball_sound.mp3'), // <--- Loading this audio crashes android
};
console.log('audios', audios);

function App(): React.JSX.Element {
  const [streamState, setStreamState] = React.useState<StreamState>();
  const streamStatus = AudioManager.shared.getStreamState();
  const [audioPlayers, setAudioPlayers] = React.useState({});

  console.log('streamStatus', streamStatus, streamState);

  const getStreamState = () => {
    const state = AudioManager.shared.getStreamState();
    return state;
  };
  const setupStream = () => {
    const state = getStreamState();
    console.log('state in setupStream fn', state);

    if (state === StreamState.closed) {
      AudioManager.shared.setupAudioStream();
    }
    setStreamState(state);
  };

  const openStream = () => {
    const state = getStreamState();
    console.log('state in openStream fn', state);

    if (state !== StreamState.open) {
      AudioManager.shared.openAudioStream();
      setStreamState(state);
    }
  };

  const pauseStream = () => {
    const state = getStreamState();
    console.log('state in pauseStream fn', state);

    if (state !== StreamState.paused) {
      AudioManager.shared.pauseAudioStream();
    }
  };

  const loadSounds = async () => {
    const menuMusic = await AudioManager.shared.loadSound(audios.MAIN_MENU_BGM);

    const sixHit = await AudioManager.shared.loadSound(audios.SIX_HIT);

    setAudioPlayers({
      menuMusic: menuMusic,
      sixHit: sixHit,
    });
  };
  console.log({audioPlayers});

  const play1 = () => {
    audioPlayers?.menuMusic?.loopSound(false);
    audioPlayers?.menuMusic?.playSound();
  };

  const pause1 = () => {
    audioPlayers?.menuMusic?.pauseSound();
  };

  const play2 = () => {
    audioPlayers?.sixHit?.loopSound(false);
    audioPlayers?.sixHit?.playSound();
  };
  const pause2 = () => {
    audioPlayers?.sixHit?.pauseSound();
  };
  const closeStream = () => {
    const state = getStreamState();
    console.log('state in closeStream fn', state);

    if (state !== StreamState.closed) {
      AudioManager.shared.closeAudioStream();
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}>
      <Text>{streamState}</Text>

      <Button title="setup stream" onPress={setupStream} />
      <Button title="open stream" onPress={openStream} />
      <Button title="Pause" onPress={pauseStream} />
      <Button title="Load Sounds" onPress={loadSounds} />
      <Button title="Play1" onPress={play1} />
      <Button title="Pause1" onPress={pause1} />
      <Button title="Play2" onPress={play2} />
      <Button title="Pause2" onPress={pause2} />
      <Button title="close stream" onPress={closeStream} />
    </SafeAreaView>
  );
}


export default App;
