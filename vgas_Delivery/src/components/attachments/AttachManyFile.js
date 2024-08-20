import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
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
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';

import Text from '../Text';
import {Button} from '../buttons';
import {hScale, scale} from '../../utils/resolutions';
import {colors, fontSize} from '../../themes';
import {btnClose, close, icon_tree_delete, plus} from '../../svgImg';
import {ApiUploadFile} from '../../action/Api';
import {translateLang} from '../../store/accLanguages/slide';
import { Schema } from 'yup';

const {width} = Dimensions.get('window');

const AttachManyFile = ({
  images,
  setDataImages,
  setLinkImage,
  OID,
  dataLink,
  disable,
  square,
  approved=false
}) => {
  const languageKey = useSelector(translateLang);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const editedListImage = images.map(item => {
    return {url: item};
  });
  let updatedLinks = square
    ? dataLink && dataLink?.length > 0 && dataLink?.[0].trim() !== ''
      ? dataLink
      : []
    : dataLink && dataLink?.length > 0 && dataLink?.[0].trim() !== ''
    ? [dataLink]
    : [];
  const [currentIndex, setcurrentIndex] = useState(0);
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
    }).then(results => {
      if (results?.length > 0) {
        const updatedImages = [
          ...images,
          ...results.map(result => result.path),
        ];
        setDataImages(updatedImages);
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
    }).then(result => {
      if (result) {
        const updatedImages = [...images, result.path];
        setDataImages(updatedImages);
        setFiles([result]);
        handleCloseModalUpload();
      }
    });
  };

  const handleRemove = path => {
    const newImages = images.filter(img => img !== path);
    setDataImages(newImages);
    setFiles(newImages);
  };

  const handleRemoveSquare = path => {
    const index = images.indexOf(path);
    const newImages = images.filter(img => img !== path);
    if (index !== -1 && !newImages.includes(path)) {
      let stringLinks =
        updatedLinks?.[0]?.includes(';') === true
          ? updatedLinks?.[0]
          : updatedLinks;
      let updatedLinksArr =
        typeof stringLinks === 'string'
          ? stringLinks?.split(';')
          : updatedLinks;
      updatedLinksArr?.splice(index, 1);
      setLinkImage(updatedLinksArr);
    } else {
    }
    setDataImages(newImages);
    setFiles(newImages);
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
    });
  };

  const requestPermissionCamera = () => {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      if (result === RESULTS.GRANTED) {
        checkPermissionReadStorage();
      } else {
        showAlertPermission();
      }
    });
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
    });
  };

  const requestPermissionReadStorage = () => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
      if (result === RESULTS.GRANTED) {
        setVisible(true);
      } else {
        showAlertPermission();
      }
    });
  };

  const showAlertPermission = () => {
    Alert.alert(languageKey('_notification'), languageKey('_allow'), [
      {
        text: languageKey('_cancel'),
        style: 'cancel',
      },
      {text:languageKey('_open_install'), onPress: () => openSettings()},
    ]);
  };

  const handleViewImage = index => {
    square ? setcurrentIndex(index - 1) : null;
    setModalVisible(true);
  };

  const imagesCopy = [...images];
  const numColumns = 3;

  imagesCopy.unshift(null);

  const renderUploadButton = () => {
    return (
      <>
        {disable === true && square === true ? null : (
          <Button
            style={
              square === true ? styles.borderUploadsquare : styles.borderUpload
            }
            onPress={handleOpenModalUpload}
            disabled={disable}>
            <SvgXml xml={plus} />
          </Button>
        )}
      </>
    );
  };

  const renderItem = ({item, index}) => {
    if (item === null) {
      return renderUploadButton();
    } else {
      return (
        <View
          key={index + item}
          style={
            disable === true && square === true
              ? styles.cardContainerSquare
              : styles.cardContainer
          }>
          {disable === true && square === true ? null : (
            <Button
              style={
                square === true
                  ? styles.btnDeleteImageSquare
                  : styles.btnDeleteImage
              }
              onPress={() => {
                square ? handleRemoveSquare(item) : handleRemove(item);
              }}>
              <SvgXml xml={btnClose} />
            </Button>
          )}
          <Button
            style={square === true ? styles.viewImagesquare : styles.viewImage}
            onPress={() => handleViewImage(index)}>
            <Image
              source={{uri: item}}
              style={square === true ? styles.imagesquare : styles.image}
              resizeMode="cover"
            />
          </Button>
        </View>
      );
    }
  };
  
  const handleSelectFileAndSubmit = () => {
    const formData = new FormData();
    formData.append('OID', OID);
    formData.append(
      'EntryID',
      square === true ? 'GREENERY_COLLECTION' : 'SmartLighting',
    );
    formData.append('FactorID', square === true ? 'GREENERY' : 'Category');
    formData.append('Name', 'Ảnh');
    formData.append('Note', 'Ghi chú');
    if (files.length > 0) {
      files.forEach(file => {
        const document = {
          uri: file.uri ? file.uri : file.path,
          name: file.name ? file.name : file.path,
          type: file.type ? file.type : file.mime,
        };
        formData.append('File', document);
      });
      ApiUploadFile(formData)
        .then(val => {
          const result = val.status ? val.data?.Result?.[0]?.LinkFile : null;
          if (result) {
            if (typeof updatedLinks === 'string' && square === true) {
              updatedLinks = [dataLink];
              updatedLinks.push(result);
              setLinkImage(updatedLinks);
              handleCloseModalUpload();
            } else {
              updatedLinks.push(result);
              setLinkImage(updatedLinks);
              handleCloseModalUpload();
            }
          } else {
            console.log(val.message);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
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
        data={approved===true?imagesCopy?.filter(item => item !== null):imagesCopy}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index.toString()}
        numColumns={disable === true && square === true ? 3 : numColumns}
        key={numColumns}
        contentContainerStyle={
          imagesCopy.length > 2 && disable === true && square === true
            ? styles.flatlistContentsquare
            : styles.flatlistContent
        }
      />
      <Modal
        isVisible={visible}
        style={styles.modal}
        onBackButtonPress={handleCloseModalUpload}
        onBackdropPress={handleCloseModalUpload}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating>
        <View style={[styles.modalContainer,{height:hScale(Platform.OS==='ios'?220:200)}]}>
          <View style={styles.cameraGalleryContainer}>
            <View style={styles.takeChoose} onPress={takePhoto}>
              <Text style={styles.txtTakeChoose}>
                {languageKey('_upload_photo')}
              </Text>
            </View>
            <Button style={styles.takePhotoBtn} onPress={takePhoto}>
              <Text style={styles.txtTakePhoto}>
                {languageKey('_take_photo')}
              </Text>
            </Button>
            <Button style={styles.chooseGalleryBtn} onPress={getImageGallery}>
              <Text style={styles.txtTakePhoto}>
                {languageKey('_select_gallery')}
              </Text>
            </Button>
          </View>
          <Button style={[styles.cancelButton,]} onPress={handleCloseModalUpload}>
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
        style={styles.modal}>
        {square === true && (
          <StatusBar
            animated
            barStyle="dark-content"
            backgroundColor={colors.black}
          />
        )}
        {modalVisible ? (
          <>
            <ImageViewer
              enableSwipeDown={true}
              onSwipeDown={handleCloseModal}
              imageUrls={editedListImage}
              index={approved===true?currentIndex+1:currentIndex}
              renderHeader={() =>
                square ? null : (
                  <Button style={styles.closeBtn} onPress={handleCloseModal}>
                    <SvgXml xml={close} />
                  </Button>
                )
              }
            />
            {square && (
              <Button
                style={[styles.closeButton]}
                onPress={() => setModalVisible(false)}>
                <SvgXml
                  xml={icon_tree_delete}
                  width={scale(22)}
                  height={scale(22)}
                  style={{zIndex: 0}}
                />
              </Button>
            )}
          </>
        ) : (
          <View />
        )}
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
  btnDeleteImageSquare: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 1,
  },
  viewImage: {
    marginTop: scale(16),
  },
  viewImagesquare: {
    marginTop: scale(8),
  },
  image: {
    width: width / 3 - 22,
    height: hScale(98),
    borderRadius: scale(8),
    marginRight: scale(16),
  },
  imagesquare: {
    width: width / 3 - scale(24),
    height: width / 3 - scale(24),
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
    marginTop: scale(16),
  },
  borderUploadsquare: {
    width: width / 3 - scale(24),
    height: width / 3 - scale(24),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#D1D3DB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
    marginTop: scale(8),
  },
  flatlistContent: {
    flexGrow: 1,
  },
  flatlistContentsquare: {
    flexDirection: 'column',
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
    fontFamily: 'Inter-SemiBold',
  },
  txtTakePhoto: {
    fontSize: fontSize.size14,
    color: colors.black,
    paddingHorizontal: scale(10),
    fontWeight: '500',
    lineHeight: scale(22),
    fontFamily: 'Inter-Medium',
  },
  txtBtn: {
    fontSize: fontSize.size14,
    color: colors.white,
    fontWeight: '600',
    lineHeight: scale(22),
    fontFamily: 'Inter-SemiBold',
  },
  cancelButton: {
    height: hScale(38),
    borderRadius: scale(8),
    backgroundColor: colors.red,
    marginTop: scale(4),
    marginHorizontal: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: scale(16),
    marginTop: scale(5),
  },
  closeButton: {
    position: 'absolute',
    top: '2.8%',
    right: scale(16),
    padding: scale(16),
    width: scale(56),
    height: scale(56),
    zIndex: 5,
  },
  cardContainerSquare: {
    flexDirection: 'row',
  },
});

export default AttachManyFile;
