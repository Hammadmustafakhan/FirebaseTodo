import React from 'react'

import Routers from './routers';
import {useEffect} from 'react';
import { getAuth,onAuthStateChanged, } from 'firebase/auth';
import { onValue,ref, } from 'firebase/database';
import { db } from './firebaseconfig';

import { useDispatch } from 'react-redux';
import { firebaseData, firebaseUid, setLoading } from './redux/Todoslices';

function App() {
  const auth = getAuth();
  const dispatch = useDispatch( )
  useEffect(() => {
   
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
dispatch(firebaseUid(uid))
    
        onValue(ref(db, "users/" + uid), (snapshot) => {
          const data = snapshot.val();
        dispatch(firebaseData(data))
      
        });
      } else {
       dispatch(setLoading())
      }
    });
  }, [])
  
  return (


 

<Routers/>
   
  )
}

export default App;


