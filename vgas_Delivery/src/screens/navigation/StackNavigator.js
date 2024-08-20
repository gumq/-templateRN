import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from '../routes';

 import { ChooseCompanyScreen, LoginScreen } from "../auth";
import SplashScreen from "../splash/SplashScreen";
import TabNavigator from "./TabNavigator";
// import NotificationScreen from "../notify/NotificationScreen";
// import ChangePassScreen from "../setting/ChangePassScreen";
// import ChangeLanguageScreen from "../setting/ChangeLanguageScreen";
// import InforContactScreen from "../setting/InforContactScreen";
// import SmartLightingScreen from "../light/SmartLightingScreen";
// import DetailSmartLightingScreen from "../light/detailSmartLighting/DetailSmartFireScreen";
// import ConfigDeviesCabinet from "../light/configDevices/ConfigDevicesCabinet";
// import ListLightScreen from "../light/configDevices/ListLightScreen";
// import ListCameraScreen from "../light/configDevices/ListCameraScreen";
// import AddCameraScreen from "../light/formEditConfig/AddCameraScreen";
// import AddLightScreen from "../light/formEditConfig/AddLightScreen";
// import EditInfoCabinetScreen from "../light/formEditConfig/EditInfoCabinetScreen";
// import MaintenanceLightScreen from "../maintenance/maintenance_light/MaintenanceLightScreen";
// import ReportIncidentScreen from "../maintenance/report_incident/ReportIncidentScreen";
// import DetailMaintenanceLightScreen from "../maintenance/maintenance_light/DetailMaintenanceLightScreen";
// import AddReportScreen from "../maintenance/report_incident/AddReportScreen";
// import ConfigDevicesTraffic from "../traffic/configDevicesSmartTraffic/ConfigDevicesTraffic";
// import ListDirectionScreen from "../traffic/configDevicesSmartTraffic/ListDirectionScreen";
// import AddDirectionScreen from "../traffic/formEditConfigTraffic/AddDirectionScreen";
// import AddCameraTrafficScreen from "../traffic/formEditConfigTraffic/AddCameraTrafficScreen";
// import ListCameraTrafficScreen from "../traffic/configDevicesSmartTraffic/ListCameraTrafficScreen";
// import EditInfoTrafficScreen from "../traffic/formEditConfigTraffic/EditInfoTrafficScreen";
// import ListSensorScreen from "../lifebuoy/configDevicesLifebuoy/ListSensorScreen";
// import AddSensorScreen from "../lifebuoy/formEditLifebuoyConfig/AddSensorScreen";
// import IndexMonitorScreen from "../aquaculture/configDevicesAquaculture_Monitor/IndexMonitorScreen";
// import ListDevicesAquacultureScreen from "../aquaculture/configDevicesAquaculture_Monitor/ListDevicesAquacultureScreen";
// import MonitoringScreen from "../aquaculture/configDevicesAquaculture_Monitor/MonitoringScreen";
// import AddMonitoringScreen from "../aquaculture/formEditAquaculture_MonitorConfig/AddMonitoringScreen";
// import EditInfoCabinetAquacultureScreen from "../aquaculture/formEditAquaculture_MonitorConfig/EditInfoCabinetAquacultureScreen";
// import AddCameraAquacultureScreen from "../aquaculture/formEditAquaculture_MonitorConfig/AddCameraAquacultureScreen";
// import ConfigDevicesLifebuoy from "../lifebuoy/configDevicesLifebuoy/ConfigDevicesLifebuoy";
// import EditInfoCabinetLifebuoyScreen from "../lifebuoy/formEditLifebuoyConfig/EditInfoCabinetLifebuoyScreen";
// import AddCameraLifebuoyScreen from "../lifebuoy/formEditLifebuoyConfig/AddCameraLifebuoyScreen";
// import ListCameraLifebuoyScreen from "../lifebuoy/configDevicesLifebuoy/ListCameraLifebuoyScreen";
// import ConfigDevicesAquaculture_Monitor from "../aquaculture/configDevicesAquaculture_Monitor/ConfigDevicesAquaculture_Monitor";
// import ListCameraAquaculture_MonitorScreen from "../aquaculture/configDevicesAquaculture_Monitor/ListCameraAquaculture_MonitorScreen";
// import AddListDevicesAqual_MonitorScreen from "../aquaculture/formEditAquaculture_MonitorConfig/AddListDevicesAqual_MonitorScreen";
// import TrafficSmartScreen from "../traffic/TrafficSmartScreen";
// import DetailSmartTrafficScreen from "../traffic/detailSmartTraffic/DetailSmartTrafficScreen";
// import AquaCultureScreen from "../aquaculture/AquaCultureScreen";
// import DetailSmartAquaScreen from "../aquaculture/detailAqua/DetailSmartAquaScreen";
// import ConfigDevicesLeakGas from "../gas/configDevicesLeakGas/ConfigDevicesLeakGas";
// import ListCameraLeakGasScreen from "../gas/configDevicesLeakGas/ListCameraLeakGasScreen";
// import ListSensorLeakGasScreen from "../gas/configDevicesLeakGas/ListSensorLeakGasScreen";
// import AddSensorLeakGasScreen from "../gas/formEditLeakGasConfig/AddSensorLeakGasScreen";
// import AddCameraLeakGasScreen from "../gas/formEditLeakGasConfig/AddCameraLeakGasScreen";
// import EditInfoCabinetLeakGasScreen from "../gas/formEditLeakGasConfig/EditInfoCabinetLeakGasScreen";
// import TreeDetailScreen from "../updatedatatree/TreeDetailScreen";
// import TreeDataUpdate from "../updatedatatree/RequestScreen";
// import ListTreeScreen from "../updatedatatree/ListTreeScreen";
// import EditTreeScreen from "../updatedatatree/EditTreeScreen";
// import AddTreeScreen from "../updatedatatree/AddTreeScreen";
// import GasRestaurantScreen from "../gas/GasRestaurantScreen";
// import DetailSmartGasScreen from "../gas/detailSmartGas/DetailSmartGasScreen";
// import SettingSmartGasScreen from "../gas/settingSmartGas/SettingSmartGasScreen";
// import LifeBuoySmartScreen from "../lifebuoy/LifeBuoySmartScreen";
// import DetailSmartLifeBuoyScreen from "../lifebuoy/detailSmartLifebuoy/DetailSmartLifeBuoyScreen";
// import ChooseServerScreen from "../auth/ChooseServerScreen";
// import ListCameraFireAlarmScreen from "../fire_alarm/configDeviesFireAlarm/ListCameraFireAlarmScreen";
// import ListSensorFireAlarmScreen from "../fire_alarm/configDeviesFireAlarm/ListSensorFireAlarmScreen";
// import ConfigDevicesFireAlarm from "../fire_alarm/configDeviesFireAlarm/ConfigDevicesFireAlarm";
// import AddSensorFireAlarmScreen from "../fire_alarm/formEditFireAlarmConfig/AddSensorFireAlarmScreen";
// import AddCameraFireAlarmScreen from "../fire_alarm/formEditFireAlarmConfig/AddCameraFireAlarmScreen";
// import EditInfoCabinetFireAlarmScreen from "../fire_alarm/formEditFireAlarmConfig/EditInfoCabinetFireAlarmScreen";
// import SmartFireAlarmScreen from "../fire_alarm/SmartFireAlarmScreen";
// import DetailSmartFireAlarmScreen from "../fire_alarm/detailSmartFireAlarm/DetailSmartFireAlarmScreen";
// import DetailRoomOfFloorScreen from "../fire_alarm/detailFloorFire/DetailRoomOfFloorScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: 'slide_from_right',

            }}>
            <Stack.Screen name={routes.SplashScreen} component={SplashScreen} />
            <Stack.Screen name={routes.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={routes.ChooseCompanyScreen} component={ChooseCompanyScreen} />
            {/* <Stack.Screen name={routes.ChooseServerScreen} component={ChooseServerScreen} />
            <Stack.Screen name={'TabNavigator'} component={TabNavigator} />
            <Stack.Screen name={routes.NotificationScreen} component={NotificationScreen} />
            <Stack.Screen name={routes.ChangePassScreen} component={ChangePassScreen} />
            <Stack.Screen name={routes.ChangeLanguageScreen} component={ChangeLanguageScreen} />
            <Stack.Screen name={routes.InforContactScreen} component={InforContactScreen} />
            <Stack.Screen name={routes.SmartLightingScreen} component={SmartLightingScreen} />
            <Stack.Screen name={routes.DetailSmartLightingScreen} component={DetailSmartLightingScreen} /> */}
            {/* Chiếu sáng thông minh */}
      
        </Stack.Navigator>
    );
}

export {
    MainStackNavigator,
};