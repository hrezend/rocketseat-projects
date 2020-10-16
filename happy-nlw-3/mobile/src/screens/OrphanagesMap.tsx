import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../assets/marker.png';

export default function OrphanagesMap(){

    const navigation = useNavigation();
    function handleNavigateToOrphanageDetails(){
      navigation.navigate('OrphanageDetails');
    }

    function handleNavigateToCreateOrphanage(){
      navigation.navigate('SelectMapPosition');
    }

    return(
        <View style={styles.container}>
            <MapView style={styles.maps} provider={PROVIDER_GOOGLE} initialRegion={{latitude: -27.98756, longitude: -49.9643, latitudeDelta:0.008, longitudeDelta:0.008}}>
                <Marker icon={mapMarker} calloutAnchor={{x:2.7, y:0.8}} coordinate={{latitude: -27.98756, longitude: -49.9643}}>
                    <Callout tooltip={true} onPress={handleNavigateToOrphanageDetails}>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}></Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}></Text>
                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name="plus" size={20} color='#FFFFFF'></Feather>
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    maps:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor:'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
    calloutText:{
      fontFamily: 'Nunito_700Bold',
      color: '#0089A5',
      fontSize: 14
    },
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#8FA7B3',
    },
    createOrphanageButton:{
      width: 56,
      height: 56,
      backgroundColor: '#15C3D6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });