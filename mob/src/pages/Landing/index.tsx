import React from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import teachIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import styles from './styles';

function Landing(){
    const navigation = useNavigation();

    function handleNavigationToTeacherRegisterPage(){
        navigation.navigate('TeacherRegister');
    }

    function handleNavigationToStudyPage(){
        navigation.navigate('Study');
    }

    return(
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImage}></Image>

            <Text style={styles.title}>
                Welcome, {'\n'}
                <Text style={styles.titleBold}>
                    what do you want to do?
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handleNavigationToStudyPage}>
                    <Image source={studyIcon}></Image>
                    <Text style={styles.buttonText}>Study</Text>
                </RectButton>
                <RectButton style={[styles.button, styles.buttonSecondary]} onPress={handleNavigationToTeacherRegisterPage}>
                    <Image source={teachIcon}></Image>
                    <Text style={styles.buttonText}>Teach</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                total of ... connections made {' '}
                <Image source={heartIcon}></Image>
            </Text>
        </View>
    );
}

export default Landing;