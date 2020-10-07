import React, { useState } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';
import styles from './styles';

function Favorites(){
    const [favorites, setFavorites] = useState([]);
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);
            }
        });
    }
    useFocusEffect(() => {
        loadFavorites();
    });

    return(
        <View style={styles.container}>
            <PageHeader title="Favorites Proffys"></PageHeader>
            <ScrollView style={styles.teacherList} contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}>
                {favorites.map((teacher: Teacher) =>{
                    <TeacherItem key={teacher.id} teacher={teacher} favorited={true}></TeacherItem>
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;