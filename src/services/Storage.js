// import modules

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

// init storage

const startStorage = async () => {
    try {
        const initStorage = async () => {
            await AsyncStorage.multiSet([
                ['@notes', JSON.stringify([])],
                ['@folders', JSON.stringify([])]
            ])
        }

        let keys = []

        keys = await AsyncStorage.getAllKeys()

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
    } catch (e) {
        return 'error'
    }
}

// folders methods

const folders = {
    new: async ({ name, color }) => {
        try {
            const data = {
                id: uuid.v4(),
                name,
                color
            }

            let currentValue = await folders.getAll()

            await AsyncStorage.setItem('@folders', JSON.stringify([data, ...currentValue]))

            return 'success'
        } catch (e) {
            return 'error'
        }
    },
    delete: async (id) => {
        try {
            let getNotes = await notes.getAll()
            let getFolders = await folders.getAll()

            if (typeof id === 'object' && id.length > 0) {
                id.forEach(async (folder) => {
                    getFolders = getFolders.filter(i => i.id != folder)
                    await AsyncStorage.setItem('@folders', JSON.stringify([...getFolders]))

                    getNotes = getNotes.filter(i => i.folder != folder)
                    await AsyncStorage.setItem('@notes', JSON.stringify([...getNotes]))
                })

                return 'success'
            } else {
                return 'error'
            }
        } catch (e) {
            return 'error'
        }
    },
    getAll: async () => {
        try {
            let getFolders = JSON.parse(await AsyncStorage.getItem('@folders'))

            return getFolders
        } catch (e) {
            return 'error'
        }
    }
}

// notes methods

const notes = {
    new: async ({ title, text, folder }) => {
        try {
            const data = {
                id: uuid.v4(),
                title,
                date: await getDate(),
                text,
                folder
            }

            let currentValue = await notes.getAll()

            await AsyncStorage.setItem('@notes', JSON.stringify([data, ...currentValue]))

            return 'success'
        } catch (e) {
            return 'error'
        }
    },
    delete: async (id) => {
        try {
            let getNotes = await notes.getAll()

            if (typeof id === 'object' && id.length > 0) {
                id.forEach(async (note) => {
                    getNotes = getNotes.filter(i => i.id != note)
                    await AsyncStorage.setItem('@notes', JSON.stringify([...getNotes]))
                })

                return 'success'
            } else {
                return 'error'
            }
        } catch (e) {
            return 'error'
        }
    },
    edit: async (id, { title, text }) => {
        try {
            let getNotes = await notes.getAll()
            let index = getNotes.findIndex(note => note.id === id)

            getNotes[index].title = title
            getNotes[index].text = text

            await AsyncStorage.setItem('@notes', JSON.stringify([...getNotes]))

            return 'success'
        } catch (e) {
            console.log(e)
            return 'error'
        }
    },
    getAll: async () => {
        try {
            let getNotes;
            getNotes = JSON.parse(await AsyncStorage.getItem('@notes'))

            return getNotes
        } catch (e) {
            return 'error'
        }
    }
}

// get date formatted

const getDate = async () => {
    const date = new Date()

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())

    const dateFormatted = `${day}/${month}/${year}`

    return dateFormatted
}

export default {
    startStorage,
    folders,
    notes
}