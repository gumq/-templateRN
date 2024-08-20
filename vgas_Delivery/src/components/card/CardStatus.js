import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Text from '../Text';
import { scale } from "../../utils/resolutions";
import { colors, fontSize } from "../../themes";

const CardStatus = ({ svgImg, content, title, style, bgColor, txtColor, value }) => {
    return (
        <View style={[styles.container, style]}>
            <SvgXml xml={svgImg} style={styles.icon} />
            {title ?
                <View style={styles.row}>
                    <Text style={styles.txtTitle}>{title}</Text>
                    <Text style={styles.txtValue}>{value}</Text>
                </View>
                :
                <View style={[styles.bodyStatus, { backgroundColor: bgColor ? bgColor : '#FFFFFF' }]}>
                    <Text style={[styles.txtItem, { color: txtColor ? txtColor : '#000000' }]}>{content}</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        flexDirection: 'row',
        marginBottom: scale(8),
    },
    txtItem: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        fontSize: fontSize.size12,
        lineHeight: scale(18),
    },
    bodyStatus: {
        borderRadius: scale(6),
        width: 'auto',
        paddingHorizontal: scale(8),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: scale(4)
    },
    content: {
        fontSize: fontSize.size12,
        fontWeight: '600',
        lineHeight: scale(18),
        fontFamily: 'Inter-SemiBold',
        color: colors.black,
        marginLeft: scale(4)
    },
    txtTitle: {
        fontSize: fontSize.size14,
        fontWeight: '400',
        lineHeight: scale(22),
        fontFamily: 'Inter-Regular',
        color: colors.black,
        marginLeft: scale(4)
    },
    txtValue: {
        fontSize: fontSize.size14,
        fontWeight: '600',
        lineHeight: scale(22),
        fontFamily: 'Inter-SemiBold',
        color: colors.black,
        marginLeft: scale(4)
    },
    row:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
});

export default CardStatus;