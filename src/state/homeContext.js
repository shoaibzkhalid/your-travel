import React from 'react';
import { useState, createContext } from 'react';

const defaultValue = 'flights';

export const HomeContext = createContext([defaultValue, v => {}]);

export const HomeContextProvider = props => {
  const [state, setState] = useState(defaultValue);
  return (
    <HomeContext.Provider value={[state, setState]}>
      {props.children}
    </HomeContext.Provider>
  );
};
