import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from './screens/Main'
import Info from './screens/Info'
import Stats from './screens/Stats'

const Stack = createNativeStackNavigator()

const Navigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Info" component={Info} />
                <Stack.Screen name="Stats" component={Stats} options={{headerShown: false}} />		
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator