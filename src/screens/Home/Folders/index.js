import { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Vibration } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import { styles } from './styles';
import Colors from '../../../assets/Colors';
import Fonts from '../../../assets/Fonts';

import { FolderCard, FolderOptions } from '../../../components/FolderCard';

export function Folders({ setMode, data, setFolderSelect }) {
    const { folders } = data;
    const [visible, setVisible] = useState(false);
    const [isSelectable, setIsSelectable] = useState(false);
    
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                        setMode('notes')
                    }}
                >
                    <SimpleLineIcons name='notebook' size={26} color={Colors.white} />
                </TouchableOpacity>

                <Text style={[styles.textHeader, { fontSize: 20 }]}>Pastas</Text>

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
                            Vibration.vibrate(50, false)
                            hideMenu()
                            setIsSelectable([])
                        }}
                        pressColor="#0000000D"
                        textStyle={{
                            fontFamily: Fonts.light,
                            fontSize: 15
                        }}
                    >Selecionar</MenuItem>
                    <MenuDivider />
                    {
                        isSelectable && isSelectable.length > 0 ? (
                            <MenuItem
                                textStyle={{
                                    color: 'red',
                                    fontFamily: Fonts.light,
                                    fontSize: 15
                                }}
                                pressColor="#0000000D"
                                onPress={() => {
                                    Vibration.vibrate(50, false)
                                    setIsSelectable(false)
                                    hideMenu()
                                }}
                            >Excluir</MenuItem>
                        ) : null
                    }
                </Menu>
            </View>

            <ScrollView
                decelerationRate={0.96}
                showsVerticalScrollIndicator={false}
            >
                <FolderOptions
                    setMode={setMode}
                    setFolderSelect={setFolderSelect}
                    isSelectable={isSelectable}
                    setIsSelectable={setIsSelectable}
                    folders={folders}
                />
                {
                    folders.map(({ id, name, color }) => {
                        return (
                            <FolderCard
                                key={id}
                                id={id}
                                name={name}
                                color={color}
                                setMode={setMode}
                                setFolderSelect={setFolderSelect}
                                isSelectable={isSelectable}
                                setIsSelectable={setIsSelectable}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}