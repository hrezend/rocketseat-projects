import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import api from '../../services/api';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    function handleToggleFilterVisible(){
        setIsFilterVisible(!isFilterVisible);
    }

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);
    async function handleFilterSubmit(){
        loadFavorites();
        const response = await api.get('/study', {
            params: {subject,week_day,time}
        })
        setIsFilterVisible(false);
        setTeachers(response.data);
    }

    const [favorites, setFavorites] = useState<number[]>([]);
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIDS = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });
                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Available Proffys"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilterVisible}>
                        <Feather name="filter" size={28} color="#FFF"></Feather>
                    </BorderlessButton>
            )}>
                {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Subject</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Subject" 
                            placeholderTextColor="#C1BCCC"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        ></TextInput>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Day</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Day" 
                                    placeholderTextColor="#C1BCCC"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                ></TextInput>
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Time</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Time" 
                                    placeholderTextColor="#C1BCCC"
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                ></TextInput>
                            </View>
                        </View>

                        <RectButton style={styles.submitButtonSearch} onPress={handleFilterSubmit}>
                            <Text style={styles.submitButtonSearchText}>Filter</Text>
                        </RectButton>
                    </View>
                )}    
            </PageHeader>
            <ScrollView style={styles.teacherList} contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}>
                {teachers.map((teacher: Teacher) => {
                    return(
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        ></TeacherItem>
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;