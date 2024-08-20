import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Text from '../Text';
import { scale } from "../../utils/resolutions";
import { colors, fontSize } from "../../themes";

const CardItemFlat = ({ style, icon, content, status, colorStatus, bgColor, bgNone, border }) => {
    return (
        <View >
            <View style={[styles.container, style, { borderBottomWidth: border ? 1 : 0, borderBottomColor: '#D1D3DB' }]}>
                <View style={styles.headerCard}>
                    <SvgXml xml={icon} />
                    <Text
                        style={[
                            styles.content,
                            content?.length > 30 ? { width: '80%' } : null
                        ]}
                    >
                        {content}
                    </Text>
                </View>
                <View style={[styles.bodyStatus, { backgroundColor: bgColor, borderRadius: scale(4) }]}>
                    <Text style={[bgNone ? styles.timeNone : styles.time, { color: colorStatus }]}>{status}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: scale(16),
        marginBottom: scale(8),
        paddingBottom: scale(8)
    },
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        fontSize: fontSize.size14,
        lineHeight: scale(22),
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        color: colors.black,
        marginLeft: scale(4),
    },
    time: {
        fontSize: fontSize.size12,
        lineHeight: scale(18),
        fontWeight: '500',
        fontFamily: 'Inter-Medium',
        marginBottom: scale(2)
    },
    timeNone: {
        fontSize: fontSize.size14,
        fontWeight: '600',
        lineHeight: scale(22),
        fontFamily: 'Inter-SemiBold',
    },
    bodyStatus: {
        borderRadius: scale(4),
        paddingHorizontal: scale(4),
        paddingVertical: scale(2),
        width: 'auto'
    }
});

export default CardItemFlat;