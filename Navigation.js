import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons';

import UserProfileScreen from './src/screens/UserProfile';
import RewardsScreen from './src/screens/RewardsScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
    </View>
);

const VerifyScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Verify Screen</Text>
    </View>
);

const NewPostScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>New Post Screen</Text>
    </View>
);

const ProfileStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={UserProfileScreen} />
    </Stack.Navigator>
);

const RewardsStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ShopScreen" component={RewardsScreen} />
    </Stack.Navigator>
);

const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Profile"
        activeColor="#FFF"
        inactiveColor="#8899AA"
        barStyle={{ backgroundColor: '#2A365A' }}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Entypo name="home" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Verify"
            component={VerifyScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="check-circle" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Post"
            component={NewPostScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="plus-circle" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Shop"
            component={RewardsStack}
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="shopping-bag" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="user" size={24} color={color} />
                ),
            }}
        />
    </Tab.Navigator>
);

const Navigation = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);

export default Navigation;