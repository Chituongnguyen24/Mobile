import {
    createBottomTabNavigator,
    createBottomTabScreen,
} from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import { createStaticNavigation } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    createNativeStackScreen,
} from '@react-navigation/native-stack';
import { Home } from './screens/Home';
import { NotFound } from './screens/NotFound';
import { Profile } from './screens/Profile';
import { Screen02 } from './screens/Screen02';
import { Todo } from './screens/Todo';
import { Updates } from './screens/Updates';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: createBottomTabScreen({
      screen: Screen02,
      options: {
        title: 'Home',
      },
    }),
    Updates: createBottomTabScreen({
      screen: Updates,
      options: {
        title: 'Updates',
      },
    }),
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Login: createNativeStackScreen({
      screen: Home,
      options: {
        title: 'Login',
        headerShown: false,
      },
    }),
    HomeTabs: createNativeStackScreen({
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    }),
    Profile: createNativeStackScreen({
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    }),
    Screen02: createNativeStackScreen({
      screen: Screen02,
      options: {
        title: 'Screen 02',
      },
    }),
    Todo: createNativeStackScreen({
      screen: Todo,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    }),
    NotFound: createNativeStackScreen({
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    }),
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}
