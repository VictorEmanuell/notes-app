import uuid from 'react-native-uuid';

const folders = {
    new: async ({ name, color }) => {
        const data = {
            id: uuid.v4(),
            name,
            color
        }
    },
    delete: async (id) => {

    },
    edit: async ({ id, edited }) => {

    }
}

const notes = {
    new: async ({ title, text, folder }) => {
        const data = {
            id: uuid.v4(),
            title,
            date: Date(),
            text,
            folder
        }
    },
    delete: async (id) => {

    },
    edit: async ({ id, edited }) => {

    }
}

const Date = () => {
    const date = new Date()

    const day = String(date.getDay()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())

    const dateFormated = `${day}/${month}/${year}`

    return dateFormated
}

export default { folders, notes }