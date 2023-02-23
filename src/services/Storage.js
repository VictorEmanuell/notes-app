import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const startStorage = async () => {
    const initStorage = async () => {
        try {
            await AsyncStorage.multiSet([['@notes', JSON.stringify([])], ['@folders', JSON.stringify([])]])
        } catch (e) {
            return 'error'
        }
    }

    let keys = []

    try {
        keys = await AsyncStorage.getAllKeys()
    } catch (e) {
        return 'error'
    }

    if (keys.length > 0) {
        if (keys.includes('@notes') && keys.includes('@folders')) {
            return 'success'
        } else {
            await initStorage()
            return 'success'
        }
    } else {
        await initStorage()
        return 'success'
    }
}

const folders = {
    new: async ({ name, color }) => {
        const data = {
            id: uuid.v4(),
            name,
            color
        }

        let currentValue = await folders.getAll()

        try {
            await AsyncStorage.setItem('@folders', JSON.stringify([data, ...currentValue]))
            return 'success'
        } catch (e) {
            return 'error'
        }
    },
    delete: async (id) => {
        let getNotes = await notes.getAll()
        let getFolders = await folders.getAll()

        if (typeof id === 'object' && id.length > 0) {
            id.forEach(async (folder) => {
                try {
                    getFolders = getFolders.filter(i => i.id != folder)
                    await AsyncStorage.setItem('@folders', JSON.stringify([...getFolders]))

                    getNotes = getNotes.filter(i => i.folder != folder)
                    await AsyncStorage.setItem('@notes', JSON.stringify([...getNotes]))

                    return 'success'
                } catch (e) {
                    return 'error'
                }
            })
        } else {
            return 'error'
        }
    },
    edit: async ({ id, edited }) => {

    },
    getAll: async () => {
        let getFolders;

        try {
            getFolders = JSON.parse(await AsyncStorage.getItem('@folders'))
        } catch (e) {
            return 'error'
        }

        return getFolders
    }
}

const notes = {
    new: async ({ title, text, folder }) => {
        const data = {
            id: uuid.v4(),
            title,
            date: await getDate(),
            text,
            folder
        }

        let currentValue = await notes.getAll()

        try {
            await AsyncStorage.setItem('@notes', JSON.stringify([data, ...currentValue]))
            return 'success'
        } catch (e) {
            return 'error'
        }
    },
    delete: async (id) => {
        let getNotes = await notes.getAll()

        if (typeof id === 'object' && id.length > 0) {
            id.forEach(async (note) => {
                try {
                    getNotes = getNotes.filter(i => i.id != note)
                    await AsyncStorage.setItem('@notes', JSON.stringify([...getNotes]))

                    return 'success'
                } catch (e) {
                    return 'error'
                }
            })
        } else {
            return 'error'
        }
    },
    edit: async ({ id, edited }) => {

    },
    getAll: async () => {
        let getNotes;

        try {
            getNotes = JSON.parse(await AsyncStorage.getItem('@notes'))
        } catch (e) {
            return 'error'
        }

        return getNotes
    }
}

const getDate = async () => {
    const date = new Date()

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())

    const dateFormated = `${day}/${month}/${year}`

    return dateFormated
}

export default { startStorage, folders, notes }