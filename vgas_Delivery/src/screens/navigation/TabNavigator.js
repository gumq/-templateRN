import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { SvgXml } from 'react-native-svg';
import { useSelector } from "react-redux";

import { setting, setting_active, home_active, home, support_active, support, devices_active, devices } from '../../svgImg';
import routes from '../routes';
import { colors, fontSize } from '../../themes';
import { hScale } from '../../utils/resolutions';

import { translateLang } from '../../store/accLanguages/slide';
// import SettingScreen from '../setting/SettingScreen';
// import HomeScreen from '../home/HomeScreen';
// import EventScreen from '../event/EventScreen';
// import SupportScreen from '../support/SupportScreen';
import SplashScreen from '../splash/SplashScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const languageKey = useSelector(translateLang);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: isIphoneX() ? hScale(80) : hScale(85),
                    borderTopWidth: 0,
                    shadowOpacity: 0,
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 0,
                    elevation: 0,
                },

                tabBarLabelStyle: {
                    fontSize: fontSize.size9,
                    fontFamily: 'Inter-Medium',
                    marginBottom: 8,
                    lineHeight: 16,
                    fontWeight: '500',
                    // fontWeight: route.name === focusedRouteName ? 'bold' : '400',
                },
                sceneContainerStyle: {
                    backgroundColor: colors.red
                },

                tabBarActiveTintColor: colors.red,
                tabBarIcon: ({ color, size, focused }) => {
                    let iconToUse;

                    if (route.name === routes.HomeScreen) {
                        iconToUse = focused ? home_active : home;
                    } else if (route.name === routes.SettingScreen) {
                        iconToUse = focused ? setting_active : setting;
                    } else if (route.name === routes.SupportScreen) {
                        iconToUse = focused ? support_active : support;
                    } else if (route.name === routes.EventScreen) {
                        iconToUse = focused ? devices_active : devices;
                    }
                    return (
                        <SvgXml
                            width="24"
                            height="24"
                            xml={iconToUse}
                            style={{ marginTop: 4 }}
                        />

                    );
                },
            })}
        >

            <Tab.Screen
                name={routes.SplashScreen}
                options={{
                    title: `${languageKey('_homepage')}`,
                    // tabBarStyle:styles.border

                }}
                component={SplashScreen}
            />
            {/* <Tab.Screen
                name={routes.EventScreen}
                options={{
                    title: `${languageKey('_new_event')}`,
                }}
                component={EventScreen}
            />

            <Tab.Screen
                name={routes.SupportScreen}
                options={{
                    title: `${languageKey('_support')}`,
                }}
                component={SupportScreen}
            /> */}
            {/* <Tab.Screen
                name={routes.SettingScreen}
                options={{
                    title: `${languageKey('_settings')}`,
                }}
                component={SettingScreen}
            /> */}

        </Tab.Navigator>
    );
};

export default TabNavigator;