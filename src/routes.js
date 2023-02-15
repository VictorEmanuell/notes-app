import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';

import { Home } from './screens/Home';
import { Note } from './screens/Note';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Note' component={Note} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}