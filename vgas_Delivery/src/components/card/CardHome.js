import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgUri, SvgXml } from 'react-native-svg';

import Text from '../Text';
import { scale } from "../../utils/resolutions";
import { fontSize } from "../../themes";

const CardHome = ({ svgImg, content, title, titleColor, padding, padingVer, fontSize, btn, onPress, percent_width, maintenance }) => {
    return (
        <View style={[styles.container, { paddingHorizontal: padding, paddingVertical: padingVer, width: percent_width, }]}>
            {btn ? (
                <TouchableOpacity onPress={onPress} disabled={maintenance === true ? false : true} style={styles.container}>
                    {maintenance === true ? <SvgXml xml={svgImg} width={scale(48)} height={scale(48)} /> : <SvgXml xml={svgImg} />}
                    <TouchableOpacity style={maintenance === true ? styles.contentCardMaintenance : styles.contentCard} onPress={onPress}>
                        <View style={styles.header}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={[styles.content, { color: titleColor, fontSize: fontSize }]}>{content}</Text>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            ) : (
                <>
                    {maintenance === true ? <SvgXml xml={svgImg} width={scale(48)} height={scale(48)} /> : <SvgUri uri={svgImg} />}
                    <View style={maintenance === true ? styles.contentCardMaintenance : styles.contentCard}>
                        <View style={styles.header}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={[styles.content, { color: titleColor, fontSize: fontSize }]}>{content}</Text>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        flexDirection: 'row',
        borderRadius: scale(12),
    },
    contentCard: {
        marginLeft: scale(8)
    },
    contentCardMaintenance: {
        marginLeft: scale(8),
        marginTop: scale(4)
    },
    header: {},
    content: {
        fontSize: scale(24),
        fontWeight: '600',
        lineHeight: scale(24),
        fontFamily: 'Inter-SemiBold',
        marginTop: scale(4)
    },
    title: {
        fontSize: fontSize.size12,
        lineHeight: scale(14),
        fontWeight: '400',
        fontFamily: 'Inter-Medium',
        color: '#6B6F80',
    },
});

export default CardHome;
