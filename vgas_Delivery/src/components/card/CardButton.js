import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { hScale, scale } from "../../utils/resolutions";

const { width } = Dimensions.get('window');

const CardButton = ({ svgImg, onPress, bgColor, right }) => {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: bgColor, width: width, marginRight: right }]} onPress={onPress}>
            <SvgXml xml={svgImg} style={styles.icon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: scale(8),
        height: hScale(38),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(8),
    },
    contentCard: {
        marginLeft: scale(4)
    },
});

export default CardButton;