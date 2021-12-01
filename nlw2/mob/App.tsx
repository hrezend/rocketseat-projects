import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Archivo_400Regular, Archivo_700Bold } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import AppStack from './src/routes/AppStack';

export default function App(){
  let [fontsLoaded] = useFonts({Archivo_400Regular, Archivo_700Bold, Poppins_400Regular, Poppins_600SemiBold});

  if(!fontsLoaded){
    return <AppLoading></AppLoading>
  }
  else{
    return(
      <>
        <AppStack></AppStack>
        <StatusBar style="light"></StatusBar>
      </>
    );
  }
}