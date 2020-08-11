import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, Picker } from 'react-native';
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
                            <Picker
                                style={styles.input}
                                //placeholder={{label:'Subject', value:null, color: '#C1BCCC'}}
                                selectedValue={subject}
                                onValueChange={(itemValue) => setSubject(itemValue)}
                            >
                                <Picker.Item value='' label='Select a subject'></Picker.Item>
                                <Picker.Item value= 'Artes' label= 'Artes'></Picker.Item>
                                <Picker.Item value= 'Biologia' label= 'Biologia'></Picker.Item>
                                <Picker.Item value= 'História' label= 'História'></Picker.Item>
                                <Picker.Item value= 'Geografia' label= 'Geografia'></Picker.Item>
                                <Picker.Item value= 'Filosofia' label= 'Filosofia'></Picker.Item>
                                <Picker.Item value= 'Sociologia' label= 'Sociologia'></Picker.Item>
                                <Picker.Item value= 'Física' label= 'Física'></Picker.Item>
                                <Picker.Item value= 'Química' label= 'Química'></Picker.Item>
                                <Picker.Item value= 'Matemática' label= 'Matemática'></Picker.Item>
                                <Picker.Item value= 'Geometria' label= 'Geometria'></Picker.Item>
                                <Picker.Item value= 'Português' label= 'Português'></Picker.Item>
                                <Picker.Item value= 'Literatura' label= 'Literatura'></Picker.Item>
                                <Picker.Item value= 'Redação' label= 'Redação'></Picker.Item>
                                <Picker.Item value= 'Inglês' label= 'Inglês'></Picker.Item>
                                <Picker.Item value= 'Música e Instrumentos' label= 'Música e Instrumentos'></Picker.Item>
                            </Picker>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Day</Text>
                                <Picker
                                    style={styles.input}
                                    //placeholder={{label:'Day', value:null, color: '#C1BCCC'}}
                                    selectedValue={week_day}
                                    onValueChange={(itemValue) => setWeekDay(itemValue)}
                                >
                                    <Picker.Item value='' label='Select a day'></Picker.Item>
                                    <Picker.Item value='0' label='Domingo'></Picker.Item>
                                    <Picker.Item value='1' label='Segunda-feira'></Picker.Item>
                                    <Picker.Item value='2' label='Terça-feira'></Picker.Item>
                                    <Picker.Item value='3' label='Quarta-feira'></Picker.Item>
                                    <Picker.Item value='4' label='Quinta-feira'></Picker.Item>
                                    <Picker.Item value='5' label='Sexta-feira'></Picker.Item>
                                    <Picker.Item value='6' label='Sábado'></Picker.Item>
                                </Picker>
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