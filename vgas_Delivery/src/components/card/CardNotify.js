import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Text from '../Text';
import { scale } from "../../utils/resolutions";
import { colors, fontSize } from "../../themes";
import { Button } from '../buttons';
import { close_notify } from '../../svgImg';

const { width } = Dimensions.get('window')

const CardNotify = ({ style, svgImg, content, statuscolorTilte, statuscolorContent, statuscolorTime, title, time, btn, onPressDelte }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.contentWrapper}>
                <View style={styles.titleWrapper}>
                    <SvgXml xml={svgImg} style={styles.svg} />
                    <Text style={[styles.title, { color: statuscolorTilte }]}>{title}</Text>
                    {btn && (
                        <Button onPress={onPressDelte} style={styles.btnDele}>
                            <SvgXml xml={close_notify} />
                        </Button>
                    )}
                </View>
                <Text style={[styles.time, { color: statuscolorTime }]}>{time}</Text>
            </View>
            <Text style={[styles.content, { color: statuscolorContent }]}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: width - 32,
        marginBottom: scale(8),
        borderRadius: scale(12),
        paddingTop:scale(8)
    },
    svg: {
        width: scale(40),
        height: scale(40),
        marginRight: scale(8),
    },
    contentWrapper: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: scale(8),
        alignContent: 'center'
    },
    title: {
        fontSize: fontSize.size14,
        fontWeight: '400',
        lineHeight: scale(22),
        fontFamily: 'Inter-SemiBold',
        width: width - 110,
    },
    content: {
        fontSize: fontSize.size12,
        lineHeight: scale(18),
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        bottom:scale(10),
        marginHorizontal:scale(8)
    },
    time: {
        fontSize: fontSize.size12,
        lineHeight: scale(18),
        fontWeight: '500',
        fontFamily: 'Inter-Medium',
        left: scale(52),
        bottom: scale(15),
    },
    btnDele: {
        marginRight: 0,
    },
});

export default CardNotify;
