import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Start from '../pages/Start';
import AddExpense from '../pages/AddExpense';
import AddIncome from '../pages/AddIncome';
import AddCategory from '../pages/AddCategory';
import RemoveCategory from '../pages/RemoveCategory';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#222831',
      },
    }}
  >
    <App.Screen name="Start" component={Start} />
    <App.Screen name="AddExpense" component={AddExpense} />
    <App.Screen name="AddIncome" component={AddIncome} />
    <App.Screen name="AddCategory" component={AddCategory} />
    <App.Screen name="RemoveCategory" component={RemoveCategory} />
  </App.Navigator>
);

export default AppRoutes;
