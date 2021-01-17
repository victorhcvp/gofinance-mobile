import React from 'react';

import { PopupProvider } from './popup';
import { CategoryProvider } from './categories';

const AppProvider: React.FC = ({ children }) => (
  <PopupProvider>
    <CategoryProvider>{children}</CategoryProvider>
  </PopupProvider>
);

export default AppProvider;
