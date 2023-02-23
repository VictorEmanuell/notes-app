// import modules

import { useState } from 'react';
import { View, Vibration, Text, Modal, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';

// import styles/assets

import { styles } from './styles';
import Colors from '../../../../assets/Colors';

// import services

import Storage from '../../../../services/Storage';

// folder colors

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

export function NewFolder({ modalVisible, setModalVisible, isLoading, setIsLoading }) {
    // hooks

    const [name, setName] = useState('');
    const [colorSelect, setColorSelect] = useState('');

    // methods

    const newFolder = async () => {
        setIsLoading(true);

        const response = await Storage.folders.new({ name, color: colorSelect })

        if (response === 'error') {
            ToastAndroid.show('Ocorreu um erro!', ToastAndroid.SHORT)
        }

        setTimeout(() => {
            setIsLoading(false);
            setModalVisible(false);
        }, 500)
    }

    return (
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
                <View style={styles.containerNewFolder}>
                    <View style={styles.headerNewFolder}>
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
                        style={styles.inputNewFolder}
                        onChangeText={setName}
                        value={name}
                    />

                    <View style={styles.colorsNewFolder}>
                        {
                            colors.map(color => {
                                return (
                                    <TouchableOpacity
                                        key={color}
                                        activeOpacity={0.8}
                                        onPressIn={() => {
                                            Vibration.vibrate(15, false)
                                        }}
                                        onPress={() => {
                                            if (colorSelect === color) {
                                                setColorSelect(null)
                                            } else {
                                                setColorSelect(color)
                                            }
                                        }}
                                        style={[
                                            styles.colorButton,
                                            {
                                                backgroundColor: color,
                                                borderWidth: colorSelect === color ? 4 : 0,
                                                padding: colorSelect === color ? 16 : 20,
                                            }
                                        ]}
                                    />
                                )
                            })
                        }
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPressIn={() => {
                            Vibration.vibrate(15, false)

                            if (name.length > 0) {
                                newFolder()
                            } else {
                                ToastAndroid.show('Digite um nome!', ToastAndroid.SHORT)
                            }
                        }}
                        style={styles.saveButton}
                    >
                        <Text style={styles.textSaveButton}>Criar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
}