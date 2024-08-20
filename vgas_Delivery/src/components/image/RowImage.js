import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

import { Button } from '../buttons';
import { colors, fontSize } from '../../themes';
import { hScale, scale } from '../../utils/resolutions';

const { width } = Dimensions.get('window');

const RowImage = ({ item, remove, hasRemove, pressImage }) => {

    const alertDelete = () => {
        // Alert.alert(`${i18n('alert_delete_image_title')}`,
        //     `${i18n('confirm_delete_image')}`,
        //     [
        //         { text: `${i18n('alert_btn_cancel')}`, style: 'cancel' },
        //         { text: `${i18n('deploy_yes_alert')}`, onPress: () => handleDelete() },
        //     ]);
    };

    return (
        <View style={styles.boxImage}>
            <Button style={styles.viewImage} onPress={pressImage}>
                {item ? (
                    <Image
                        source={{ uri: item }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.mockupImage} />
                )}
            </Button>
            {hasRemove ? (
                <View style={styles.infoImage}>
                    <Button style={styles.btnRemove} onPress={alertDelete}>
                    </Button>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    boxImage: {
        width: width / 3 - 22,
        height: hScale(98),
        marginTop: scale(6),
        backgroundColor: colors.white,
        borderRadius: scale(8)
    },
    viewImage: {
        width: '100%',
        height: hScale(98),
    },
    image: {
        width: width / 3 - 22,
        height: hScale(98),
        borderRadius: scale(8)
    },
    mockupImage: {
        width: width / 3 - 22,
        height: hScale(98),
        borderRadius: scale(8),
        backgroundColor: colors.systemGray2_1,
    },
    infoImage: {
        alignItems: 'flex-end',
    },
    btnRemove: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(8),
        paddingTop: scale(8),
        paddingBottom: scale(4),
    },
});

export default RowImage;

