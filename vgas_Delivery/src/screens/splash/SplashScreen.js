import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';

import {copyright_NLT, logo_app_vGas, logo_nlt} from '../../svgImg';
import styles from './styles';
import routes from '../routes';
import {updateUser} from '../../store/accAuth/slide';
import {
  setFcmInfo,
  setRefreshToken,
  setToken,
  setUserInformation,
} from '../../storage';
import {NotifierAlert} from '../../components';
import {translateLang} from '../../store/accLanguages/slide';
import {ApiLogin} from '../../action/Api';
import {
  getListFetchLanguageDetails,
  getListFetchLanguageType,
  getListFetchLocale,
} from '../../store/accLanguages/thunk';
import {scale} from '../../utils/resolutions';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const {languageTypes, languageDetails} = useSelector(state => state.Language);
  const languageKey = useSelector(translateLang);
  const gotoLogin = () => {
    if (Platform.OS === 'ios') {
      fetchInit();
    } else {
      navigation.navigate(routes.LoginScreen);
    }
  };
  const fetchInit = async () => {
    const body = {
      UserName: 'autologin',
      UserPassword: 'NamLong2020',
    };
    setSubmitting(true);
    try {
      const {data} = await ApiLogin(body);
      if (data.StatusCode === 200 && data.ErrorCode === '0') {
        let result = data.Result;
        if (result[0]?.Token) {
          await dispatch(updateUser(result[0]));
          await setFcmInfo(JSON.stringify(result[0].Token));
          await setToken(JSON.stringify(result[0].Token));
          await setRefreshToken(JSON.stringify(result[0]?.RefreshToken));
          await setUserInformation(JSON.stringify(result[0]));
          await setSubmitting(false);
          navigation.navigate('TabNavigator');
        } else if (result[0]?.CollectFromServer) {
          setSubmitting(false);
          navigation.navigate(routes.ChooseServerScreen, {
            body: body,
            result: result,
          });
          resetForm();
        } else {
          setSubmitting(false);
          navigation.navigate(routes.ChooseCompanyScreen, {
            body: body,
            result: result,
          });
          resetForm();
        }
      } else {
        // navigation.navigate(routes.LoginScreen);
      }
    } catch (err) {
      setSubmitting(false);
      NotifierAlert(
        3000,
        `${languageKey('_notification')}`,
        `${languageKey('try_again')}`,
        'error',
      );
    }
  };

  useEffect(async () => {
    dispatch(getListFetchLocale());
    dispatch(getListFetchLanguageType());
    dispatch(getListFetchLanguageDetails());
    StatusBar.setBackgroundColor('transparent', true);
    StatusBar.setTranslucent(true);
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
    if (!languageDetails && !languageTypes) {
      gotoLogin();
    }
    return () => {
      StatusBar.setBackgroundColor('#ffffff', true);
      StatusBar.setTranslucent(true);
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <SvgXml xml={logo_app_vGas} style={styles.logo} />
      <View style={styles.txtcopyright}>
        <SvgXml xml={copyright_NLT} />
      </View>
    </View>
  );
};

export default SplashScreen;
