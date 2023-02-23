// import modules

import { useState } from 'react';

// import components

import { Notes } from './Notes';
import { Folders } from './Folders';

export function Home({ navigation }) {
    // hooks

    const [mode, setMode] = useState('notes');
    const [folderSelect, setFolderSelect] = useState(null);

    // render specific component for notes or folders

    if (mode === 'notes') {
        return (
            <Notes
                navigation={navigation}
                setMode={setMode}
                folderSelect={folderSelect}
            />
        )
    }

    if (mode === 'folders') {
        return (
            <Folders
                navigation={navigation}
                setMode={setMode}
                setFolderSelect={setFolderSelect}
            />
        )
    }
}