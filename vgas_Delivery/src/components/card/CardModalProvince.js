import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';

import Text from '../Text';
import { colors, fontSize } from '../../themes';
import { hScale, scale } from '../../utils/resolutions';
import { arrow_down, close } from '../../svgImg';
import { SvgXml } from 'react-native-svg';
import { RadioProvince } from '../radio';
import { Button } from '../buttons';
import SearchBar from '../SearchBar';
import { SearchModal } from '../../components';

const { height } = Dimensions.get('window')

const CardModalProvince = ({
    data,
    title,
    setValue,
    value
}) => {
    const [ishowModal, setIsShowModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const openShowModal = () => {
        setIsShowModal(true);
    }

    const closeModal = () => {
        setIsShowModal(false)
    }

    const onChangeText = textSearch => {
        if (textSearch?.length) {
            setSearchText(textSearch);
            const resultsData = SearchModal(data, textSearch);
            setSearchResults(resultsData);
        } else {
            setSearchResults(data);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboardHeight(event.endCoordinates.height);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <View>
            <Text style={styles.label}>{title}</Text>
            <Button style={styles.container} onPress={openShowModal}>
                <View style={styles.header}>
                    <Text style={value ? styles.placeholder_two : styles.placeholder}>{value ? value : title}</Text>
                    <View >
                        <SvgXml xml={arrow_down} width="14" height="14" />
                    </View>
                </View>

                <Modal
                    useNativeDriver
                    backdropOpacity={0.5}
                    isVisible={ishowModal}
                    style={styles.optionsModal}
                    onBackButtonPress={closeModal}
                    onBackdropPress={closeModal}
                    hideModalContentWhileAnimating>
                    <KeyboardAvoidingView
                        style={styles.optionsModalContainer}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <View style={[styles.headerContent_gray, { marginTop: keyboardHeight ? 150 : 0 }]}>
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
                        <View style={styles.contentContainer}>
                            <View style={styles.search}>
                                <SearchBar
                                    value={searchText}
                                    onChangeText={text => {
                                        setSearchText(text);
                                        onChangeText(text);
                                    }}
                                />
                            </View>
                            <ScrollView style={styles.containerRadio} showsVerticalScrollIndicator={false}>
                                <RadioProvince
                                    data={searchResults?.length > 0 ? searchResults : data}
                                    handleCloseModal={closeModal}
                                    setValue={setValue}
                                />
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            </Button>
        </View>

    );

};


const styles = StyleSheet.create({
    container: {
        color: colors.black,
        borderRadius: scale(8),
        fontSize: fontSize.size14,
        height: hScale(38),
        marginTop: scale(8),
        borderWidth: scale(1),
        borderColor: '#D1D3DB',
        backgroundColor: '#F9F9FB',
        paddingLeft: scale(16),
        paddingHorizontal: scale(16),
        justifyContent: 'center',
    },
    optionsModal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    optionsModalContainer: {
        height: height / 1.5,
        paddingBottom: scale(10),
    },
    contentContainer: {
        backgroundColor: colors.graySystem2,
        height: height / 1.5,
    },
    label: {
        color: colors.black,
        fontSize: fontSize.size14,
        fontWeight: '500',
        fontFamily: 'Inter-Medium',
        lineHeight: scale(22),
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
        lineHeight: scale(22),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    titleModal: {
        color: colors.white,
        fontSize: fontSize.size16,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        lineHeight: scale(24),
        textAlign: 'center',
        flex: 1,
    },
    containerRadio: {
        borderRadius: scale(12),
        marginHorizontal: scale(16),
    },
    search: {
        marginHorizontal: scale(16),
        marginBottom: scale(16),
        marginTop: scale(16)
    },
    btnClose: {
        padding: scale(10),
    },
});

export default CardModalProvince;
