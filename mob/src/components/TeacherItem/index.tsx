import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import favoriteIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import wppIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';
import styles from './styles';

export interface Teacher{
    id: number;
    name: string;
    whatsapp: string;
    biografia: string;
    avatar: string;
    cost: number;
    subject: string;
}

interface TeacherProps{
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem:React.FC<TeacherProps> = ({teacher, favorited}) => {
    function handleLinkToWpp(){
        api.post('connections',{
            teacher_id: teacher.id,
        });
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    const [isFavorited, setIsFavorited] = useState(favorited);
    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];
        if(favorites){
            favoritesArray = JSON.parse(favorites);
        }

        if(isFavorited){
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) =>{
                return teacherItem.id === teacher.id;
            });
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        }
        else{
            favoritesArray.push(teacher);
            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.avatar} source={{ uri: teacher.avatar}}></Image>
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.biography}>{teacher.biografia}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                     price/hour {'   '}
                    <Text style={styles.priceValue}>{teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]} onPress={handleToggleFavorite}>
                        {isFavorited ? <Image source={unfavoriteIcon}></Image> : <Image source={favoriteIcon}></Image>}
                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={handleLinkToWpp}>
                        <Image source={wppIcon}></Image>
                        <Text style={styles.contactButtonText}>Send Message</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;