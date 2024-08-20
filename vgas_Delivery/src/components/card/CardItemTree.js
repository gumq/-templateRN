import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Text from '../Text';
import { scale } from "../../utils/resolutions";
import { colors, fontSize } from "../../themes";

const { width } = Dimensions.get('window');

const CardItemTree = ({ svgImg, title, note, style, pair }) => {
    return (
        <View style={[styles.container, style, { width: pair === true ? (width - scale(82)) / 2 : (width - scale(82)) }]}>
            <SvgXml xml={svgImg} style={styles.icon} />
            <View style={styles.boxText}>
                <Text style={pair===true?styles.titlepair:styles.title}>{title}</Text>
                <Text style={styles.note}>{note}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        flexDirection: 'row',
        marginBottom: scale(0),
    },
    contentCard: {
        marginLeft: scale(4)
    },
    header: {
    },
    title: {
        fontSize: fontSize.size12,
        fontWeight: '400',
        lineHeight: scale(18),
        fontFamily: 'Inter-Regular',
        color: colors.gray600,
        marginLeft: scale(4)
    },
    titlepair: {
        fontSize: fontSize.size12,
        fontWeight: '400',
        lineHeight: scale(18),
        fontFamily: 'Inter-Regular',
        color: colors.gray600,
        marginLeft: scale(4)
    },
    note: {
        fontSize: fontSize.size12,
        fontWeight: '600',
        lineHeight: scale(18),
        fontFamily: 'Inter-SemiBold',
        color: colors.black,
        marginLeft: scale(4)
    },
    boxText: {
        flexDirection: 'column',
    }

});

export default CardItemTree;