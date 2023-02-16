import { useState } from 'react';

import { Notes } from './Notes';
import { Folders } from './Folders';

import Data from '../../data.json';

export function Home({ navigation }) {
    const [mode, setMode] = useState('notes');
    const [folderSelect, setFolderSelect] = useState(null);

    if (mode === 'notes') {
        return (
            <Notes
                navigation={navigation}
                setMode={setMode}
                data={Data}
                folderSelect={folderSelect}
            />
        )
    }

    if (mode === 'folders') {
        return (
            <Folders
                navigation={navigation}
                setMode={setMode}
                data={Data}
                setFolderSelect={setFolderSelect}
            />
        )
    }
}