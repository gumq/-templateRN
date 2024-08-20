import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';

import Text from '../Text';
import { colors, fontSize } from '../../themes';
import { hScale, scale } from '../../utils/resolutions';
import { arrow_down, close, radio, radio_active } from '../../svgImg';
import { Button } from '../buttons';

const { height } = Dimensions.get('window')

const CardLight = ({
    data,
    disable,
    title,
    setValue,
    value
}) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSelection = (item) => {
        setValue(item);
        setSelectedItem(item);
        closeModal();
    };

    return (
        <View>
            <Text style={styles.label}>{title}</Text>
            <Button style={styles.container} onPress={openModal} disabled={disable}>
                <View style={styles.header}>
                    <Text style={value ? styles.placeholder_two : styles.placeholder}>{value ? value : title}</Text>
                    <View >
                        <SvgXml xml={arrow_down} width="14" height="14" />
                    </View>
                </View>
                <Modal
                    useNativeDriver
                    backdropOpacity={0.5}
                    isVisible={showModal}
                    style={styles.optionsModal}
                    onBackButtonPress={closeModal}
                    onBackdropPress={closeModal}
                    hideModalContentWhileAnimating>
                    <View style={styles.optionsModalContainer}>
                        <View style={styles.headerContent_gray}>
                            <Text style={styles.titleModal}>{title}</Text>
                            <View style={styles.contentBody} />
                            <Button onPress={closeModal} style={styles.btnClose} >
                                <SvgXml
                                    width="14"
                                    height="14"
                                    xml={close}

                                />
                            </Button>

                        </View>
                        <ScrollView style={styles.containerRadio} showsVerticalScrollIndicator={false}>
                            <View style={styles.row}>
                                {data?.map((item, index) => (
                                    <TouchableOpacity
                                        key={item.LightID || item?.OID}
                                        style={index === data.length - 1 ? styles.cardNoBorder : styles.card}
                                        onPress={() => handleSelection(item)}
                                    >
                                        <Text bold style={styles.title}>
                                            {item.LightID || item?.Name}
                                        </Text>
                                        {selectedItem === item ? (
                                            <SvgXml xml={radio_active} />
                                        ) : (
                                            <SvgXml xml={radio} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </Button>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        color: colors.black,
        borderRadius: scale(12),
        fontSize: fontSize.size14,
        height: hScale(46),
        marginTop: scale(8),
        borderWidth: scale(1),
        borderColor: '#D1D3DB',
        backgroundColor: colors.white,
        paddingLeft: scale(16),
        paddingHorizontal: scale(16),
        justifyContent: 'center',
        marginBottom: scale(16)
    },
    row: {
        borderRadius: scale(12),
        backgroundColor: colors.white,
        marginTop: scale(8)
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: scale(10),
        borderBottomWidth: 1,
        borderBottomColor: '#D1D3DB',
        marginHorizontal: scale(16)
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
    optionsModal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    optionsModalContainer: {
        height: height / 2.2,
        backgroundColor: colors.graySystem2,
        borderTopLeftRadius: scale(24),
        borderTopRightRadius: scale(24),
        paddingBottom: scale(10)
    },
    label: {
        color: colors.black,
        fontSize: fontSize.size14,
        fontWeight: '500',
        fontFamily: 'Inter-Medium',
        fontSize: fontSize.size14,
        lineHeight: scale(22)
    },
    placeholder: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scale(6),
    },
    placeholder_two: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scale(6),
        color: colors.black,
        fontSize: fontSize.size14,
        fontFamily: 'Inter-Regular',
        fontSize: fontSize.size14,
        lineHeight: scale(22)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerContent_gray: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: hScale(46),
        paddingHorizontal: scale(16),
        backgroundColor: colors.red,
        borderTopLeftRadius: scale(24),
        borderTopRightRadius: scale(24),
        marginBottom: scale(8)
    },
    contentBody: {
        paddingRight: '32%'
    },
    titleModal: {
        color: colors.white,
        fontSize: fontSize.size16,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        lineHeight: scale(24),
        textAlign: 'center',
    },
    containerRadio: {
        borderRadius: scale(12),
        marginHorizontal: scale(16)
    },
    btnClose: {
        padding: scale(10),
    }
});

export default CardLight;
