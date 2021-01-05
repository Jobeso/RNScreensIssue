/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import HomeScreen from './App';

enableScreens();

const BottomNavigator = createBottomTabNavigator(
  {
    Home: {screen: HomeScreen},
  },
  {
    headerMode: 'screen',
    initialRouteName: 'Home',
    lazy: false,
    swipeEnabled: false,
    tabBarPosition: 'bottom',
  },
);

const HeaderTitle = () => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={{fontWeight: 'bold', fontSize: 24}}>Main</Text>
  </View>
);

const AppStack = createNativeStackNavigator({
  Main: {
    screen: BottomNavigator,
    navigationOptions: (props) => ({
      headerTitle: <HeaderTitle {...props} />,
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 10,
        borderBottomColor: 'black',
      },
      hideShadow: false,
      headerLargeTitleHideShadow: false,
    }),
  },
});

const RootNavigator = createSwitchNavigator(
  {
    App: AppStack,
  },
  {
    initialRouteName: 'App',
  },
);

const AppNavigator = createAppContainer(RootNavigator);

class Navigator extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppNavigator />
      </View>
    );
  }
}

class Wrapper extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        {this.props.children}
      </View>
    );
  }
}

class App extends React.PureComponent {
  render() {
    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Wrapper>
          <Navigator />
        </Wrapper>
      </SafeAreaProvider>
    );
  }
}

export default App;
