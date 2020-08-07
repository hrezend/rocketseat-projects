import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#8257E5',
        padding: 40,
    },
    topBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title:{
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 24,
        lineHeight: 32,
        maxWidth: 160,
        marginVertical: 40,
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default styles;