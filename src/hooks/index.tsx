import React from 'react';

import { PopupProvider } from './popup';
import { CategoryProvider } from './categories';
import { FinancialProvider } from './financial';

const AppProvider: React.FC = ({ children }) => (
  <PopupProvider>
    <CategoryProvider>
      <FinancialProvider>{children}</FinancialProvider>
    </CategoryProvider>
  </PopupProvider>
);

export default AppProvider;
