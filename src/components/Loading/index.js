// import modules

import { View, Modal, ActivityIndicator, Text } from 'react-native';

// import styles/assets

import { styles } from './styles';
import Colors from '../../assets/Colors';

export function Loading({ active, text }) {
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={active}
            >
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <ActivityIndicator style={styles.activityIndicator} size="large" color={Colors.blue} />

                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}