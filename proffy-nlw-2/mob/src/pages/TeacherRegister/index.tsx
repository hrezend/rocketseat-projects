import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import registerBackgroundIMG from '../../assets/images/give-classes-background.png';
import styles from './styles';

function TeacherRegister(){
    const navigation = useNavigation();

    function handleNavigateBack(){
        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <ImageBackground style={styles.content} resizeMode="contain" source={registerBackgroundIMG}>
                <Text style={styles.title}>Do you want be a Proffy?</Text>
                <Text style={styles.description}>To start, you must access our web platform.</Text>
            </ImageBackground>
            <RectButton style={styles.okButton} onPress={handleNavigateBack}>
                <Text style={styles.okButtonText}>Okay</Text>
            </RectButton>
        </View>
    );
}

export default TeacherRegister;