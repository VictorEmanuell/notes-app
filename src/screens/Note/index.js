import { useState } from 'react';
import { View, Text, TouchableOpacity, Vibration, ScrollView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import { styles } from './styles';
import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';

export function Note({ route, navigation }) {
    const { id, title, date, text } = route.params;

    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                        navigation.goBack()
                    }}
                >
                    <SimpleLineIcons name="arrow-left" size={22} color={Colors.white} />
                </TouchableOpacity>

                <Text style={styles.textTitle}>{title}</Text>

                <View style={styles.optionsButton}>
                    <Menu
                        visible={visible}
                        anchor={
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPressIn={() => {
                                    Vibration.vibrate(15, false)
                                    showMenu()
                                }}
                            >
                                <SimpleLineIcons name='options-vertical' size={25} color={Colors.white} />
                            </TouchableOpacity>
                        }
                        onRequestClose={hideMenu}
                        style={{
                            borderRadius: 15,
                            width: '45%'
                        }}
                        animationDuration={200}
                    >
                        <MenuItem
                            onPress={() => {
                                hideMenu()
                                navigation.navigate('EditNote', { id, title, date, text })
                            }}
                            pressColor="#0000000D"
                            textStyle={{
                                fontFamily: Fonts.light,
                                fontSize: 15
                            }}
                        >Editar</MenuItem>
                        <MenuDivider />
                        <MenuItem
                            textStyle={{
                                color: 'red',
                                fontFamily: Fonts.light,
                                fontSize: 15
                            }}
                            pressColor="#0000000D"
                            onPress={() => {
                                hideMenu()

                            }}
                        >Excluir</MenuItem>
                    </Menu>
                </View>
            </View>

            <ScrollView
                decelerationRate={0.96}
                showsVerticalScrollIndicator={false}
            >
                <Text dataDetectorType='all' selectable={true} style={styles.textBody}>{text}</Text>
            </ScrollView>
        </View>
    );
}