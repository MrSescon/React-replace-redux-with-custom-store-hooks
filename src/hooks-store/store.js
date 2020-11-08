import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = {...globalState, ...newState};

    for(const listener of listeners){
      listener(globalState);
    }

    return [globalState, dispatch];
  }
  
  listeners.push(setState);

  useEffect(()=> {
    listeners.push(setState);

    return () =>{
      listeners = listeners.filter(li => li !== setState);
    }
  }, [setState]);

}

export const initStore = (userActions, initialState) => {
  if(initialState) {
    globalState = {...globalState, ...initialState};
  }
  actions = {...actions, ...userActions};
};


