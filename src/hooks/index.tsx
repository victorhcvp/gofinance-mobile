import React from 'react';

import { PopupProvider } from './popup';

const AppProvider: React.FC = ({ children }) => (
  <PopupProvider>{children}</PopupProvider>
);

export default AppProvider;
