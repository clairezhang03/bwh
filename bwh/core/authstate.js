import React, { createContext, useContext, useState } from 'react';

const authState = createContext();
const updateAuthState = createContext();

export const useAuthState = () => {
    return useContext(authState);
}

export const useUpdateAuthState = () => {
    return useContext(updateAuthState);
}

const AuthStateProvider = ({ children }) => {
    const [uid, setUid] = useState(undefined);
    const updateUid = (userId) => {
        if (userId === undefined) {
            setUid(undefined);
        }
        else {
            setUid(userId);
        }
    }

    return (
        <authState.Provider value={uid}>
            <updateAuthState.Provider value={updateUid}>
                {children}
            </updateAuthState.Provider>
        </authState.Provider>
    );
}

export default AuthStateProvider;