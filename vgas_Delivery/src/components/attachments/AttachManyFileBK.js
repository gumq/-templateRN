import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions, Image, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
    check,
    request,
    PERMISSIONS,
    RESULTS,
    openSettings,
} from 'react-native-permissions';
import { SvgXml } from "react-native-svg";
import { useSelector } from 'react-redux';

import Text from '../Text';
import { Button } from '../buttons';
import { hScale, scale } from '../../utils/resolutions';
import { colors, fontSize } from '../../themes';
import { btnClose, close, plus } from '../../svgImg';
import { ApiUploadFile } from '../../action/Api';
import { translateLang } from '../../store/accLanguages/slide';

const { width } = Dimensions.get('window');

const AttachManyFileBK = ({ images, setDataImages, setLinkImage, OID, dataLink, disable }) => {
    const languageKey = useSelector(translateLang);
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [files, setFiles] = useState([]);
    const editedListImage = images.map(item => {
        return { url: item }
    });

    const handleOpenModalUpload = () => {
        setVisible(true);
    };

    const handleCloseModalUpload = () => {
        setVisible(false);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const getImageGallery = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            multiple: true,
            compressImageQuality: 0.4,
            cropperChooseText: 'OK',
            cropperCancelText: languageKey('_try_angian'),
        }).then(results => {
            if (results?.length > 0) {
                const updatedImages = [...images, ...results.map(result => result.path)];
                setDataImages(updatedImages);
                console.log('updatedImages', updatedImages);
                setFiles(results);
                handleCloseModalUpload();
            }
        });
    };

    const takePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            compressImageQuality: 0.4,
            cropperChooseText: 'OK',
            cropperCancelText: languageKey('_try_angian'),
        }).then(result => {
            if (result) {
                const updatedImages = [...images, result.path];
                setDataImages(updatedImages);
                setFiles([result]);
                handleCloseModalUpload();
            }
        }).catch(error => {
            console.error(error);
        });
    };

    const handleRemove = path => {
        const newImages = images.filter(img => img !== path);
        setDataImages(newImages);
        setLinkImage(newImages.join(';'));
    };

    const checkPermissionCamera = () => {
        check(PERMISSIONS.ANDROID.CAMERA).then(result => {
            switch (result) {
                case RESULTS.GRANTED:
                    checkPermissionReadStorage();
                    break;
                case RESULTS.UNAVAILABLE:
                case RESULTS.DENIED:
                case RESULTS.LIMITED:
                    requestPermissionCamera();
                    break;
                case RESULTS.BLOCKED:
                    showAlertPermission();
                    break;
            }
        })
    };

    const requestPermissionCamera = () => {
        request(PERMISSIONS.ANDROID.CAMERA).then(result => {
            if (result === RESULTS.GRANTED) {
                checkPermissionReadStorage();
            } else {
                showAlertPermission();
            }
        })
    };

    const checkPermissionReadStorage = () => {
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
            switch (result) {
                case RESULTS.GRANTED:
                    setVisible(true);
                    break;
                case RESULTS.UNAVAILABLE:
                case RESULTS.DENIED:
                case RESULTS.LIMITED:
                    requestPermissionReadStorage();
                    break;
                case RESULTS.BLOCKED:
                    showAlertPermission();
                    break;
            }
        })
    };

    const requestPermissionReadStorage = () => {
        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
            if (result === RESULTS.GRANTED) {
                setVisible(true);
            } else {
                showAlertPermission();
            }
        })
    }

    const showAlertPermission = () => {
        Alert.alert(`Thông báo`, `Cho phép`,
            [
                {
                    text: `Hủy`,
                    style: 'cancel',
                },
                { text: `Mở cài đặt`, onPress: () => openSettings() },
            ]);
    };


    const handleViewImage = () => {
        setModalVisible(true);
    };


    const imagesCopy = [...images];
    const numColumns = 3;

    imagesCopy.unshift(null);

    const renderUploadButton = () => {
        return (
            <Button style={styles.borderUpload} onPress={handleOpenModalUpload} disabled={disable}>
                <SvgXml xml={plus} />
            </Button>
        );
    };

    const renderItem = ({ item, index }) => {
        if (item === null) {
            return renderUploadButton();
        } else {
            return (
                <View style={styles.cardContainer}>
                    <Button style={styles.btnDeleteImage} onPress={() => handleRemove(item)}>
                        <SvgXml xml={btnClose} />
                    </Button>
                    <Button style={styles.viewImage} onPress={() => handleViewImage(item)}>
                        <Image
                            source={{ uri: item }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </Button>
                </View>
            );
        }
    };

    const handleSelectFileAndSubmit = () => {
        const OIDTime = OID + new Date().getTime();
        const formData = new FormData();
        formData.append('OID', OIDTime);
        formData.append('EntryID', 'SmartLighting');
        formData.append('FactorID', 'Category');
        formData.append('Name', 'Ảnh');
        formData.append('Note', 'Ghi chú');

        if (files.length > 0) {
            files.forEach((file) => {
                const document = {
                    uri: file.uri ? file.uri : file.path,
                    name: file.name ? file.name : file.path,
                    type: file.type ? file.type : file.mime,
                };
                formData.append('File', document);
            });
            ApiUploadFile(formData)
                .then(val => {
                    const result = val.status ? val.data?.Result : [];
                    if (result.length > 0) {
                        const newLinks = result.map(file => file.LinkFile);
                        const currentLinks = (typeof dataLink === 'string' ? dataLink.split(';') : []);
                        const updatedLinks = [...currentLinks, ...newLinks];
                        const updatedLinksString = updatedLinks.filter(Boolean).join(';');
                        setLinkImage(updatedLinksString);
                        handleCloseModalUpload();
                    } else {
                        console.log(val.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            const linkArray = typeof dataLink === 'string' ? dataLink.split(';') : [];
            setLinkImage(linkArray.join(';'));
            handleCloseModalUpload();
        }
    };

    useEffect(() => {
        if (files?.length > 0) {
            handleSelectFileAndSubmit();
        }
    }, [files]);

    return (
        <View>
            <FlatList
                data={imagesCopy}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
                contentContainerStyle={styles.flatlistContent}
            />
            <Modal
                isVisible={visible}
                style={styles.modal}
                onBackButtonPress={handleCloseModalUpload}
                onBackdropPress={handleCloseModalUpload}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating>
                <View style={styles.modalContainer}>
                    <View style={styles.cameraGalleryContainer}>
                        <View style={styles.takeChoose} onPress={takePhoto}>
                            <Text style={styles.txtTakeChoose}>{languageKey('_upload_photo')}</Text>
                        </View>
                        <Button style={styles.takePhotoBtn} onPress={takePhoto}>
                            <Text style={styles.txtTakePhoto}>{languageKey('_take_photo')}</Text>
                        </Button>
                        <Button style={styles.chooseGalleryBtn} onPress={getImageGallery}>
                            <Text style={styles.txtTakePhoto}>{languageKey('_select_gallery')}</Text>
                        </Button>
                    </View>
                    <Button style={styles.cancelButton} onPress={handleCloseModalUpload}>
                        <Text style={styles.txtBtn}>{languageKey('_close')}</Text>
                    </Button>
                </View>
            </Modal>
            <Modal
                useNativeDriver
                isVisible={!!modalVisible}
                onBackButtonPress={handleCloseModal}
                onBackdropPress={handleCloseModal}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating
                style={styles.modal} >
                {modalVisible
                    ? (
                        <ImageViewer
                            enableSwipeDown={true}
                            onSwipeDown={handleCloseModal}
                            imageUrls={editedListImage}
                            renderHeader={() => (
                                <Button style={styles.closeBtn} onPress={handleCloseModal}>
                                    <SvgXml xml={close} />
                                </Button>
                            )}
                        />
                    )
                    : <View />}
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    btnDeleteImage: {
        position: 'absolute',
        top: 5,
        right: 10,
        zIndex: 1,
    },
    viewImage: {
        marginTop: scale(16)
    },
    image: {
        width: width / 3 - 22,
        height: hScale(98),
        borderRadius: scale(8),
        marginRight: scale(16),
    },
    borderUpload: {
        width: width / 3 - 22,
        height: hScale(98),
        borderRadius: scale(8),
        borderWidth: 1,
        borderColor: '#D1D3DB',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(16),
        marginTop: scale(16)
    },
    flatlistContent: {
        flexGrow: 1,
    },
    modal: {
        margin: 0,
    },
    modalContainer: {
        width: width,
        height: hScale(200),
        bottom: 0,
        position: 'absolute',
        backgroundColor: colors.white,
        borderTopLeftRadius: scale(12),
        borderTopRightRadius: scale(12),
    },
    cameraGalleryContainer: {
        marginBottom: scale(8),
        backgroundColor: colors.white,
        borderTopLeftRadius: scale(12),
        borderTopRightRadius: scale(12),
    },
    takePhotoBtn: {
        borderBottomWidth: scale(1),
        borderBottomColor: '#D1D3DB',
        paddingVertical: scale(12),
    },
    takeChoose: {
        borderBottomWidth: scale(1),
        borderBottomColor: '#D1D3DB',
        paddingVertical: scale(12),
    },
    chooseGalleryBtn: {
        paddingVertical: scale(12),
        borderBottomWidth: scale(1),
        borderBottomColor: '#D1D3DB',
    },
    txtTakeChoose: {
        fontSize: fontSize.size16,
        color: colors.black,
        paddingHorizontal: scale(10),
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: scale(24),
        fontFamily: 'Inter-SemiBold'
    },
    txtTakePhoto: {
        fontSize: fontSize.size14,
        color: colors.black,
        paddingHorizontal: scale(10),
        fontWeight: '500',
        lineHeight: scale(22),
        fontFamily: 'Inter-Medium'
    },
    txtBtn: {
        fontSize: fontSize.size14,
        color: colors.white,
        fontWeight: '600',
        lineHeight: scale(22),
        fontFamily: 'Inter-SemiBold'
    },
    cancelButton: {
        height: hScale(38),
        borderRadius: scale(8),
        backgroundColor: colors.red,
        marginTop: scale(4),
        marginHorizontal: scale(16),
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeBtn: {
        alignSelf: 'flex-end',
        padding: scale(16),
        marginTop: scale(5),
    }
});

export default AttachManyFileBK;