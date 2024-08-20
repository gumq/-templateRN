import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Text from '../Text';
import { colors, fontSize } from '../../themes';
import { scale } from '../../utils/resolutions';
import { radio, radio_active } from '../../svgImg';

const RadioCompany = ({
    data,
    style,
    isDisabled,
    handleCloseModal,
    setValue
}) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelection = (item) => {
        if (!isDisabled) {
            setValue(item)
            handleCloseModal();
            setSelectedItem(item);
        }
    };

    return (
        <View {...{ style }}>
            <View style={styles.row}>
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={item.CmpnID || item?.CollectFromServer}
                        disabled={isDisabled}
                        style={index === data.length - 1 ? styles.cardNoBorder : styles.card}
                        onPress={() => handleSelection(item)}
                    >
                        <Text bold style={styles.title}>
                            {item?.CompanyName || item?.ServerName}
                        </Text>
                        {selectedItem === item ? (
                            <SvgXml xml={radio_active} />
                        ) : (
                            <SvgXml xml={radio} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

};


const styles = StyleSheet.create({
    row: {
        borderRadius: scale(12),
        backgroundColor: colors.white,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: scale(10),
        borderBottomWidth: 1,
        borderBottomColor: '#D1D3DB',
        marginHorizontal: scale(16),
        alignItems: 'center'
    },
    cardNoBorder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: scale(10),
        marginHorizontal: scale(16)
    },
    title: {
        color: colors.black,
        fontSize: fontSize.size14,
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        lineHeight: scale(22)
    },
});

export default RadioCompany;
