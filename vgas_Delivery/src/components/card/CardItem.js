import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Text from '../Text';
import { scale } from "../../utils/resolutions";
import { colors, fontSize } from "../../themes";

const CardItem = ({ svgImg, content, style }) => {
    return (
        <View style={[styles.container, style]}>
            <SvgXml xml={svgImg} style={styles.icon} />
            <Text style={styles.content}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        flexDirection: 'row',
        marginBottom: scale(8),
        alignItems:'center'
    },
    contentCard: {
        marginLeft: scale(4)
    },
    header: {
    },
    content: {
        fontSize: fontSize.size12,
        fontWeight: '600',
        lineHeight: scale(18),
        fontFamily: 'Inter-SemiBold',
        color: colors.black,
        marginLeft: scale(4)
    },

});

export default CardItem;