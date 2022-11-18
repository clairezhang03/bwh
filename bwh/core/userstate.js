import React, { useState, useContext, createContext, useEffect } from 'react';
import { auth, db } from '../core/config'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, updateDoc,arrayUnion } from 'firebase/firestore';

const user = createContext();

export const useUser = () => {
    return useContext(user);
}

function UserState({ children }) {
    const [uid, setUid] = useState(undefined);
    const [userDoc, setUserDoc] = useState();
    //const [uid, setUid] = useState(undefined);
   
    /*
    useEffect(() => {
        //if user is undefined, it isn't doing anything
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
                getDoc(doc(db, "users", uid)).then((snapShot) => {
                    setUserDoc(snapShot.data())
                }).catch((e) => alert(e))
            }
        })
        return unsubscribe;
    }, [])*/

    const updateUid = (userId) => {
        if (userId === undefined) {
            setUid(undefined);
        }
        else {
            setUid(userId);
        }
    }
    
    const addToWatchList = (stock) => {
        updateDoc(doc(db, "users", uid), {
            watchlist: arrayUnion(stock),
        }).then(() => {
            // if stock object is not already in userDoc's watchlist, add it
            if (!userDoc.data.watchlist.includes(stockObject)) {
                //copy userDoc because immutable
                let tempDoc = Object.assign({}, userDoc);
                let tempWatchList = userDoc.data.watchlist.slice();
                tempWatchList.push(stockObject);
                tempDoc.data.watchlist = tempWatchList;
                setUserDoc(tempDoc);

                var iterator = userDoc.data.watchlist.values();

                // Here all the elements of the array is being printed.
                for (let elements of iterator) {
                    console.log(elements);
                }
            }
        }).catch((e) => console.log(e));
    }

    const removeFromWatchList = (stock) => {

    }

    return (
        <user.Provider value={{
            uid: uid,
            data: userDoc,
            addToWatchlist: addToWatchList,
            removeFromWatchlist: removeFromWatchList,
            updateUid: updateUid,
        }}>
            {children}
        </user.Provider>
    );
}

export default UserState;