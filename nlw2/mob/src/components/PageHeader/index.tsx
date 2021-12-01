import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoIcon from '../../assets/images/logo.png';
import styles from './styles';

interface PageHeaderProps{
    title: string;
    headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    const navigation = useNavigation();
    
    function handleGoBack(){
        navigation.navigate('Landing');
    }

    return(
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode="contain"></Image>
                </BorderlessButton>
                <Image source={logoIcon} resizeMode="contain"></Image>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>{props.title}</Text>
                {props.headerRight}
            </View>

            {props.children}
        </View>
    );
}

export default PageHeader;