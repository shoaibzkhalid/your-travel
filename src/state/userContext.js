import React from 'react';
import { useState, createContext } from 'react';

const defaultValue = {
  displayName: '',
  email: '',
  phoneNumber: '',
  country: '',
};

export const UserContext = createContext([defaultValue, v => {}]);

export const UserContextProvider = props => {
  const [state, setState] = useState(defaultValue);
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};
