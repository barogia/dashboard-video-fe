import { createContext } from 'react';

export type ClientStyleContextType = {
  reset: () => void;
  sheet: string;
};

const ClientStyleContext = createContext<ClientStyleContextType>({
  reset: () => {},
  sheet: '',
});

export default ClientStyleContext;
