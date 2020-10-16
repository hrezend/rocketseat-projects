import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OrphanagesMap from './screens/OrphanagesMap';
import OrphanageDetails from './screens/OrphanageDetails';
import OrphanageData from './screens/CreateOrphanage/OrphanageData';
import SelectMapPosition from './screens/CreateOrphanage/SelectMapPosition';
import Header from './components/Header';

const {Navigator, Screen} = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle:{backgroundColor:'#F2F2F5'}}}>
                <Screen name="OrphanagesMap" component={OrphanagesMap}></Screen>
                <Screen name="OrphanagesDetails" component={OrphanageDetails} options={{headerShown: true, header: () => <Header title="Orfanato" showCancel={false} ></Header>}} ></Screen>
                <Screen name="OrphanageData" component={OrphanageData} options={{headerShown: true, header: () => <Header title="Informe os dados"></Header>}}></Screen>
                <Screen name="SelectMapPosition" component={SelectMapPosition} options={{headerShown: true, header: () => <Header title="Selecione no mapa"></Header>}} ></Screen>
            </Navigator>
        </NavigationContainer>
    );
}