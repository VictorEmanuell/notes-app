import { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Vibration, Modal, TextInput } from 'react-native';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import { styles } from './styles';
import Colors from '../../../assets/Colors';
import Fonts from '../../../assets/Fonts';

import { FolderCard, FolderOptions } from '../../../components/FolderCard';

const colors = [
    '#0c0636',
    '#095169',
    '#059b9a',
    '#53ba83',
    '#ef4335',
    '#f68b36',
    '#cae081',
    '#88eed0',
    '#314c53',
    '#5a7f78'
]

export function Folders({ setMode, data, setFolderSelect }) {
    const { folders } = data;
    const [visible, setVisible] = useState(false);
    const [isSelectable, setIsSelectable] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

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
                    setModalVisible={setModalVisible}
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        borderRadius: 15,
                        padding: 20,
                        elevation: 5,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <SimpleLineIcons name='folder-alt' size={26} color='gray' />

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPressIn={() => {
                                    Vibration.vibrate(15, false)
                                    setModalVisible(false)
                                }}
                                style={{
                                    padding: 5,
                                    backgroundColor: 'red',
                                    borderRadius: 10,
                                }}
                            >
                                <AntDesign name="close" size={24} color={Colors.white} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            keyboardType="visible-password"
                            placeholder='Nova pasta'
                            style={{
                                color: Colors.primary,
                                padding: 10,
                                fontFamily: Fonts.regular,
                                fontSize: 15,
                                borderBottomColor: '#c2c2c2',
                                borderBottomWidth: 0.5,
                                marginTop: 10
                            }}
                        />

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                            {
                                colors.map(color => {
                                    return (
                                        <TouchableOpacity
                                            key={color}
                                            style={{
                                                backgroundColor: color,
                                                padding: 20,
                                                borderRadius: 10,
                                                margin: 4
                                            }}
                                            activeOpacity={0.8}
                                        />
                                    )
                                })
                            }
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPressIn={() => {
                                Vibration.vibrate(15, false)
                            }}
                            style={{
                                padding: 20,
                                paddingVertical: 15,
                                marginHorizontal: 20,
                                marginVertical: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.blue,
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{
                                fontFamily: Fonts.bold,
                                fontSize: 15,
                                color: Colors.white
                            }}>Criar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}