import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VOICE_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useNavigation } from '@react-navigation/native';

export default function CreatorCallScreen() {
  const navigation = useNavigation();
  const [duration, setDuration] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Start call timer
    timerRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    // Block back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        console.log('Back button blocked on call screen');
        return true;
      }
    );

    return () => {
      clearInterval(timerRef.current);
      backHandler.remove();
    };
  }, []);

  const endCallAndGoBack = () => {
    console.log('Ending call and navigating back');
    clearInterval(timerRef.current);
    navigation.goBack(); // or navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Call Duration: {formatDuration(duration)}</Text>
      <ZegoUIKitPrebuiltCall
  appID={1297163706}
  appSign={'48ccad9f315eeeed0f6ec3f55deb66441d5a24b012c399947253403a29c32804'}
  userID={'user_123'}
  userName={'Dhanashri'}
  callID={'room_123'}
  config={{
    ...ONE_ON_ONE_VOICE_CALL_CONFIG,
    useSpeakerWhenJoining: true,
    onHangUp: () => {
      console.log('✅ Red button pressed');
      clearInterval(timerRef.current);
      navigation.navigate('Home'); // or goBack()
    },
    onOnlySelfInRoom: () => {
      console.log('✅ Only self in room, leaving...');
      clearInterval(timerRef.current);
      navigation.navigate('Home');
    },
  }}
/>
    </View>
  );
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timer: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
});
