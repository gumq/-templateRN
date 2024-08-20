import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';

import Text from './Text';
import { Button } from './buttons';
import { colors, fontSize } from '../themes';
import { scale } from '../utils/resolutions';
import {
  icon_tree,
  lighting,
  building_home,
  arrow_next_gray,
  arrow_next_down,
  setting_menu,
  maintance,
  report,
  maintenace_ligth,
  traffic,
  qlcds_menu,
  gas_menu,
  ppl_menu,
  ntts_menu,
  qtmt_menu,
  restaurant,
  family,
  maintenace_light,
  maintenace_tree,
  maintenace_monitor,
  maintenace_trafficlights,
  maintenace_speaker,
  maintenace_traffic_buoys,
  maintenace_qc_led_panels,
  maintenace_gas_system,
  maintenace_fire_system,
  fire_infor
} from '../svgImg';

const WIDTH_DRAWER = Dimensions.get('window').width / 1.2;

const DrawerMenu = ({ isShowMenu, handleCloseMenu }) => {
  const { menus } = useSelector(state => state.Home);
  const navigation = useNavigation();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const filteredMenus = menus.filter(menu => menu.ParentID !== '0');
  const parentMenus = filteredMenus.filter(
    menu => !filteredMenus.some(subMenu => subMenu.MenuID === menu.ParentID),
  );

  const createSubMenuTree = parentId => {
    const subMenuTree = menus.filter(menu => menu.ParentID === parentId);
    subMenuTree.forEach(menu => {
      menu.children = createSubMenuTree(menu.MenuID);
    });
    return subMenuTree;
  };

  const handleMenuPress = menuId => {
    handleCloseMenu();
    setSelectedMenu(menuId);
    const nameScreen = menus.find(menu => menu.MenuID === menuId)?.Link;
    const type = menus.find(menu => menu.MenuID === menuId)?.TableName;
    const maintenance_type = menus.find(menu => menu.MenuID === menuId)?.MenuIcon;
    navigation.navigate(nameScreen, { type: type, maintenance_type: maintenance_type });
  };
  const icons = {
    lighting: lighting,
    setting_menu: setting_menu,
    maintance: maintance,
    building_home: building_home,
    report: report,
    maintenace_ligth: maintenace_ligth,
    traffic: traffic,
    qlcds_menu: qlcds_menu,
    gas_menu: gas_menu,
    ppl_menu: ppl_menu,
    ntts_menu: ntts_menu,
    qtmt_menu: qtmt_menu,
    tree_menu: icon_tree,
    maintenace_light: maintenace_light,
    maintenace_tree: maintenace_tree,
    maintenace_monitor: maintenace_monitor,
    maintenace_trafficlights: maintenace_trafficlights,
    maintenace_speaker: maintenace_speaker,
    maintenace_traffic_buoys: maintenace_traffic_buoys,
    maintenace_qc_led_panels: maintenace_qc_led_panels,
    maintenace_gas_system: maintenace_gas_system,
    restaurant: restaurant,
    family: family,
    tree_menu: icon_tree,
    maintenace_fire_system: maintenace_fire_system,
    fire_infor: fire_infor
  };

  const renderIconByName = iconName => {
    const icon = icons[iconName];
    if (icon) {
      return <SvgXml xml={icon} />;
    }
    return null;
  };

  const renderSubMenu = subMenu => {
    const icon = subMenu?.MenuIcon ? icons[subMenu.MenuIcon] : null;
    return (
      <Button
        key={subMenu.MenuID}
        style={styles.containerMenuChild}
        onPress={() => handleMenuPress(subMenu.MenuID)}>
        <View style={styles.menuChildren}>
          <SvgXml xml={icon} />
          <Text style={styles.title}>{subMenu.MenuName}</Text>
        </View>
        {subMenu.children &&
          subMenu.children.map(child => renderSubMenu(child))}
      </Button>
    );
  };

  const toggleSubMenu = menuId => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  return (
    <Modal
      isVisible={isShowMenu}
      useNativeDriver
      animationInTiming={450}
      animationOutTiming={450}
      backdropOpacity={0.7}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      onBackButtonPress={handleCloseMenu}
      onBackdropPress={handleCloseMenu}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      style={styles.modal}>
      <ScrollView style={styles.modalContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.itemBody}>
          <Image source={require('../assets/Header.png')} style={styles.img} />
        </View>
        {parentMenus.map(menu => (
          <View key={menu.MenuID} style={styles.containerMenu}>
            <Button
              style={[
                styles.parentMenu,
                {
                  borderBottomWidth: expandedMenu === menu.MenuID ? 1 : 0,
                  paddingBottom: expandedMenu ? scale(5) : 0,
                },
              ]}
              onPress={() => toggleSubMenu(menu.MenuID)}>
              <View style={styles.iconHeader}>
                {renderIconByName(menu.MenuIcon)}
                <Text style={styles.titleCard}>{menu.MenuName}</Text>
              </View>
              <View>
                <SvgXml
                  xml={expandedMenu === menu.MenuID ? arrow_next_down : arrow_next_gray}
                />
              </View>
            </Button>
            {expandedMenu === menu.MenuID &&
              createSubMenuTree(menu.MenuID).map(subMenu =>
                renderSubMenu(subMenu),
              )}
          </View>
        ))}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    width: WIDTH_DRAWER,
    backgroundColor: colors.white,
  },
  parentMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#E5E6EB',
  },
  titleCard: {
    color: colors.black,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '500',
    fontSize: fontSize.size12,
    lineHeight: scale(18),
    marginLeft: scale(4),
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    fontSize: fontSize.size12,
    lineHeight: scale(18),
    color: colors.black,
    marginLeft: scale(4),
  },
  itemBody: {
    alignItems: 'center',
  },
  img: {
    width: WIDTH_DRAWER,
  },
  containerMenu: {
    padding: scale(8),
    borderWidth: scale(1),
    borderRadius: scale(12),
    borderColor: '#D1D3DB',
    marginBottom: scale(10),
    marginHorizontal: scale(8)
  },
  containerMenuChild: {
    padding: scale(4),
    borderRadius: scale(8),
    marginTop: scale(8),
    marginLeft: scale(20),
  },
  iconHeader: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  menuChildren: {
    flexDirection: 'row',
  },
});

export default DrawerMenu;
