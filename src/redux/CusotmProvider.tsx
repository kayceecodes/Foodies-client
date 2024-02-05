import { Provider } from 'react-redux';


const CustomProvider = ({ children, store }: Provider) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default CustomProvider;