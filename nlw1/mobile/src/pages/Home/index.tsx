import React, {useState, useEffect} from 'react';
import {Feather as Icon} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View, ImageBackground, Image, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUf{
  sigla:string
}
interface IBGECity{
  nome: string;
}
interface Picker {
  label: string;
  value: string;
}

const Home = () => {

    const navigation = useNavigation();
    const [ufs, setUfs] = useState<Picker[]>([]);
    const [cities, setCities] = useState<Picker[]>([]);
    const [selectedUf, setSelectedUf] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    //Pegando UF's da API do IBGE
    useEffect(() => {
      axios.get<IBGEUf[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
          const arrAux: Picker[] = response.data.map((uf: IBGEUf) => ({ label: uf.sigla, value: uf.sigla }));
          setUfs(arrAux);
      });
    }, []);
    //Pegando Cidades por UF's pela API do IBGE
    useEffect(() => {
      if(selectedUf === ''){
        setSelectedCity('');
        return;
      }
      axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
        const arrAux2: Picker[] = response.data.map((city: IBGECity) => ({ label: city.nome, value: city.nome }));
        setCities(arrAux2);
      });
    }, [selectedUf]);

    function handleNavigateToPoints(){
        if(selectedUf === '' || selectedCity === ''){
          Alert.alert('Oooooops...', 'A localização correta é essencial para o funcionamento da aplicação!');
        }
        else{
          navigation.navigate('Points',{selectedUf,selectedCity});
        }
    }

    return(
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={{width: 274, height: 368}}>
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}></Image>
                <View>
                  <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                  <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de resíduos.</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.input}>
                  <PickerSelect 
                  items={ufs}
                  value={selectedUf}
                  onValueChange={(value => setSelectedUf(value))}
                  placeholder={{ label: "UF", value: null }}
                  />
                </View>
                <View style={styles.input}>
                  <PickerSelect
                  disabled={selectedUf === ''} 
                  items={cities}
                  value={selectedCity}
                  onValueChange={(value => setSelectedCity(value))}
                  placeholder={{ label: selectedUf === '' ? '' : 'Cidade', value: null }}   
                  />
                </View>
                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name='arrow-right' color='#FFF' size={24}></Icon>
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Enter
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
});

export default Home;