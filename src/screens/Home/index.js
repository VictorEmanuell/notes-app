import { useState } from 'react';

import { Notes } from './Notes';
import { Folders } from './Folders';

import Data from '../../data.json';

export function Home({ navigation }) {
    const [mode, setMode] = useState('notes');

    if (mode === 'notes') {
        return <Notes navigation={navigation} setMode={setMode} data={Data} />
    }

    if (mode === 'folders') {
        return <Folders navigation={navigation} setMode={setMode} data={Data} />
    }
}