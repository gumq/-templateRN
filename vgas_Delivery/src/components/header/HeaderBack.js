import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { scale, hScale } from '../../utils/resolutions';
import { colors, fontSize } from '../../themes';
import { arrow_white } from '../../svgImg';
import { Button } from '../buttons';

const HeaderBack = ({
    title,
    onPress,
    btn,
    titleBtn,
    onPressBtn
}) => {

    return (
        <View style={styles.container}>
            <Button onPress={onPress} style={styles.btnMenu}>
                <SvgXml xml={arrow_white} />
            </Button>
            <Text style={styles.title}>{title}</Text>
            {btn ?
                <Button onPress={onPressBtn} style={styles.btnMenu}>
                    <Text style={titleBtn?styles.txtBtn:styles.txtBtn24}>{titleBtn}</Text>
                </Button>
                : <View style={styles.btnMenu} />
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: scale(5),
        paddingRight: scale(10),
        height: hScale(54),
        backgroundColor: colors.red
    },
    title: {
        color: colors.white,
        fontSize: fontSize.size16,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        lineHeight: scale(24),
        textAlign: 'center',
    },
    btnMenu: {
        padding: scale(10),
    },
    txtBtn: {
        color: colors.white,
        fontSize: fontSize.size14,
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        lineHeight: scale(22),
        textAlign: 'center',
    },
    txtBtn24: {
       width:scale(24)
    }
});

export default HeaderBack;
