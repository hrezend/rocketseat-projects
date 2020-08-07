import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F0F0F7',
        flex: 1,
    },
    teacherList:{
        marginTop: -40,
    },
    searchForm:{
        marginBottom: 24,
    },
    label:{
        color: '#D4C2FF',
        fontFamily: 'Poppins_400Regular',
    },
    inputGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputBlock:{
        width: '48%',
    },
    input:{
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
    },
    submitButtonSearch:{
        backgroundColor: '#04D361',
        flexDirection: 'row',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonSearchText:{
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
    },
});

export default styles;