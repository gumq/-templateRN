import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { scale, hScale } from '../../utils/resolutions';
import { colors, fontSize } from '../../themes';
import { menu, notify } from '../../svgImg';
import { Button } from '../buttons';
import DrawerMenu from '../DrawerMenu';
import { fetchTotalNotify } from '../../store/accNotify/thunk';
import routes from '../../screens/routes';

const HeaderHome = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { totalNotify } = useSelector(state => state.Notify);
    const [isShowMenu, setShowMenu] = useState(false);

    const handleShownMenu = () => {
        setShowMenu(true);
    };

    const handleCloseMenu = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        dispatch(fetchTotalNotify());
    }, []);

    const renderNotificationBadge = () => {
        if (totalNotify === undefined || totalNotify === 0) return null;
        const badgeText = totalNotify < 99 ? totalNotify : '99+';
        const badgeStyle =
            totalNotify < 10 ? styles.textTotalNotiOneNum :
                totalNotify < 99 ? styles.textTotalNotiTwoNum :
                    styles.textTotalNotiThreeNum;

        return (
            <Text style={[styles.textNotify, badgeStyle]}>{badgeText}</Text>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <Button onPress={handleShownMenu} style={styles.btnMenu}>
                    <SvgXml xml={menu} />
                </Button>
                <Text style={styles.title}>NLT SC</Text>
                <Button style={styles.btnNoti} onPress={() => navigation.navigate(routes.NotificationScreen)}>
                    <SvgXml xml={notify} />
                </Button>
                {renderNotificationBadge()}
            </View>
            <DrawerMenu {...{ isShowMenu, handleCloseMenu }} />
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scale(5),
        paddingRight: scale(10),
        marginTop: isIphoneX ? scale(30) : scale(30),
        height: hScale(54),
    },
    title: {
        color: colors.white,
        fontSize: fontSize.size16,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        lineHeight: scale(24),
        marginLeft: scale(8),
        textAlign: 'center'
    },
    textNotify: {
        position: 'absolute',
        right: 10,
        color: colors.white,
        padding: 1,
        fontFamily: 'Inter-Bold',
        fontSize: fontSize.size14,
        fontWeight: '700',
        lineHeight: scale(16)
    },
    textTotalNotiOneNum: {
        top: scale(5),
        right: scale(15),
        paddingHorizontal: scale(6),
        borderRadius: scale(9),
    },
    textTotalNotiTwoNum: {
        top: scale(5),
        right: scale(10),
        paddingHorizontal: scale(6),
        borderRadius: scale(40),
    },
    textTotalNotiThreeNum: {
        fontSize: fontSize.size10,
        top: scale(5),
        right: scale(8),
        paddingHorizontal: scale(3),
        borderRadius: scale(9),
    },
    btnMenu: {
        padding: scale(10),
    },
    btnNoti: {
        paddingVertical: scale(6),
        paddingHorizontal: scale(10),
    },
});

export default HeaderHome;
