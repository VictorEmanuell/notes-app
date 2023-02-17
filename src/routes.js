import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './screens/Home';
import { Note } from './screens/Note';
import { NewNote } from './screens/NewNote';
import { EditNote } from './screens/EditNote';

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
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name='Note'
                    component={Note}
                    options={{
                        animation: 'slide_from_right'
                    }}
                />
                <Stack.Screen
                    name='NewNote'
                    component={NewNote}
                    options={{
                        animation: 'slide_from_bottom'
                    }}
                />
                <Stack.Screen
                    name='EditNote'
                    component={EditNote}
                    options={{
                        animation: 'slide_from_bottom'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}