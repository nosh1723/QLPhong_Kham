import React from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import SpaceComponent from '@/src/components/SpaceComponent';
import { colors } from '../constants/Colors';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/splash-img.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}>
      <Image
        source={require('../../assets/splash.png')}
        style={{
          width: "100%",
          resizeMode: 'contain',
        }}
      />
      <SpaceComponent height={16} />
      <ActivityIndicator color={colors.gray} size={22} />
    </ImageBackground>
  );
};

export default SplashScreen;