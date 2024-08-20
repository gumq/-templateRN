import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Dimensions } from 'react-native';
import { fontSize } from '../themes';
import { hScale, scale } from '../utils/resolutions';

const DeltaArray = ({ data, setDeltaArrayMain }) => {
    const initialArray = data ? data.split(',').map(Number) : Array(5).fill(0);

    const [deltaArray, setDeltaArray] = useState(initialArray);

    const handleInputChange = (index, value) => {
        const newArray = [...deltaArray];
        newArray[index] = parseInt(value) || 0;
        setDeltaArray(newArray);
        setDeltaArrayMain(newArray);
    };

    return (
        <View style={styles.container}>
            {deltaArray.map((value, index) => (
                <TextInput
                    key={index}
                    value={String(value)}
                    onChangeText={(text) => handleInputChange(index, text)}
                    style={[
                        styles.input,
                        index !== deltaArray.length - 1 && styles.inputBorderRight
                    ]}
                    keyboardType="numeric"
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: scale(8),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#D1D3DB',
        marginHorizontal: scale(16),
        marginTop: scale(8),
    },
    input: {
        width: Dimensions.get('window').width / 5.45,
        height: hScale(40),
        backgroundColor: '#F9F9FB',
        textAlign: 'center',
        color: '#6B6F80',
        fontSize: fontSize.size14,
        fontWeight: '400',
        lineHeight: 22,
    },
    inputBorderRight: {
        borderRightWidth: 1,
        borderRightColor: '#D1D3DB',
    },
});

export default DeltaArray;
