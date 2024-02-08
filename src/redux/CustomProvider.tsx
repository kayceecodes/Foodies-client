import { ConfigureStoreOptions, Store } from '@reduxjs/toolkit';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

interface CustomProviderProps {
    children: ReactNode;
    store: Store
}

const CustomProvider: FC<CustomProviderProps> = ({ children, store }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default CustomProvider;