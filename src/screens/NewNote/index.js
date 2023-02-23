// import modules

import { useState } from 'react';
import { View, TextInput, Vibration, TouchableOpacity, KeyboardAvoidingView, ScrollView, Text, ToastAndroid } from 'react-native';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';

// import styles/assets

import { styles } from './styles';
import Colors from '../../assets/Colors';

// import components

import { Loading } from '../../components/Loading';

// import services

import Storage from '../../services/Storage';

export function NewNote({ navigation, route }) {
    const { folderSelect } = route.params

    // hooks

    const [inputHeight, setInputHeight] = useState(0);
    const [title, onChangeTitle] = useState('');
    const [text, onChangeText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // methods

    const newNote = async () => {
        setIsLoading(true)

        if (text) {
            const response = await Storage.notes.new({ title, text, folder: folderSelect ? folderSelect.id : null })

            if (response === 'error') {
                ToastAndroid.show('Ocorreu um erro!', ToastAndroid.SHORT)
            }
        } else {
            setIsLoading(false)
            ToastAndroid.show('Sua nota não pode estar vazia!', ToastAndroid.SHORT)
            return;
        }

        setTimeout(() => {
            setIsLoading(false)
            navigation.navigate('Home')
        }, 1500)
    }

    return (
        <ScrollView
            style={styles.container}
            decelerationRate={0.96}
            showsVerticalScrollIndicator={false}
        >
            <KeyboardAvoidingView behavior="height">
                <View style={styles.header}>
                    <SimpleLineIcons name="note" size={24} color={Colors.white} />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPressIn={() => {
                            Vibration.vibrate(15, false)
                            navigation.goBack()
                        }}
                        style={styles.closeButton}
                    >
                        <AntDesign name="close" size={24} color={Colors.white} />
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.inputTitle}
                    placeholder="Título"
                    placeholderTextColor="#499999"
                    keyboardType="visible-password"
                    onChangeText={onChangeTitle}
                    value={title}
                />

                <TextInput
                    style={[styles.inputText, { height: Math.max(35, inputHeight) }]}
                    placeholder="Escreva aqui..."
                    placeholderTextColor="#499999"
                    keyboardType="text"
                    multiline={true}
                    autoCorrect={false}
                    onContentSizeChange={(event) => {
                        setInputHeight(event.nativeEvent.contentSize.height)
                    }}
                    onChangeText={onChangeText}
                    value={text}
                />

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                        newNote()
                    }}
                    style={styles.saveButton}
                >
                    <Text style={styles.textSave}>Salvar</Text>
                </TouchableOpacity>

                <Loading active={isLoading} text="Salvando..." />
            </KeyboardAvoidingView>
        </ScrollView>
    );
}