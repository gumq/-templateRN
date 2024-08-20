import React, { useState } from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';;
import { useDispatch, useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

import { logo } from '../../svgImg'
import { updateUser } from '../../store/accAuth/slide'
import { translateLang } from '../../store/accLanguages/slide';
import styles from './styles';
import {
  Text,
  Button,
  NotifierAlert,
  LoadingModal,
  CardModalCompany,
} from '../../components';
import { ApiLogin } from '../../action/Api';
import {
  setRefreshToken,
  setToken,
  setUserInformation,
} from '../../storage';
import routes from '../routes';

const ChooseServerScreen = ({ route }) => {
  const navigation = useNavigation();
  const body = route?.params?.body;
  const result = route?.params?.result;
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const languageKey = useSelector(translateLang);
  const [valueCmpnID, setValueCmpnID] = useState(null);

  const onSubmit = async () => {
    const param = {
      UserName: body.UserName,
      UserPassword: body.UserPassword,
      CollectFromServer: valueCmpnID?.CollectFromServer
    };
    try {
      setSubmitting(true);
      const { data } = await ApiLogin(param);
      if (data.StatusCode === 200 && data.ErrorCode === '0') {
        let result = data.Result;
        if (result[0]?.Token) {
          await new Promise(resolve => {
            dispatch(updateUser(result[0]))
            setToken(JSON.stringify(result[0].Token));
            setRefreshToken(JSON.stringify(result[0]?.RefreshToken));
            setUserInformation(JSON.stringify(result[0]));
            setSubmitting(false);
            resolve();
          });
          navigation.navigate('TabNavigator');
        } else {
          setSubmitting(false);
          navigation.navigate(routes.ChooseCompanyScreen, { body: param, result: result });
        }
      } else {
        setSubmitting(false);
        NotifierAlert(
          3000,
          `${languageKey('_notification')}`,
          `${languageKey('try_again')}`,
          'error',
        );
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

  return (
    <View style={styles.imgBackground}>
      <SafeAreaView>
        <View style={styles.optionsModal}>
          <StatusBar
            animated={true}
            backgroundColor="transparent"
            barStyle={"light-content"}
            translucent={true}
          />
          <View style={styles.header}>
            <SvgXml xml={logo} style={styles.logo} />
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            <View style={styles.inputContainer}>
              <View style={styles.bodyInput}>
                <CardModalCompany
                  title={languageKey('_choose_a_server')}
                  data={result}
                  setValue={setValueCmpnID}
                  value={valueCmpnID?.ServerName}
                />
                <Button
                  disabled={valueCmpnID?.ServerName ?  false : true}
                  onPress={onSubmit}
                  style={styles.btnNext}>
                  <Text style={styles.textLoginBtn}>{languageKey('_next')}</Text>
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        <LoadingModal visible={isSubmitting} />
      </SafeAreaView>
    </View>
  );
};

export default ChooseServerScreen;
