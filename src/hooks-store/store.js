import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

const useStore = () => {
  const setState = useState(globalState)[1];
  
  listeners.push(setState);

  useEffect(()=> {
    listeners.push(setState);

    return () =>{
      listeners = listeners.filter(li => li !== setState);
    }
  }, [setState]);

}


