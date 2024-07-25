import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons';

import UserProfileScreen from './src/screens/UserProfile';
import RewardsScreen from './src/screens/RewardsScreen';
import HomeScreen from './src/screens/HomeScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import NewPostScreen from './src/screens/NewPostScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreenPage" component={HomeScreen} />
    </Stack.Navigator>
);

const VerifyStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
    </Stack.Navigator>
);

const NewPostStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
</Stack.Navigator>
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
            component={HomeStack}
            options={{
                tabBarIcon: ({ color }) => (
                    <Entypo name="home" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Verify"
            component={VerifyStack}
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="check-circle" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Post"
            component={NewPostStack}
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