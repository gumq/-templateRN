import {
  updateUser,
  updateRuleFormatCurrency,
  updateRuleFormatDecimal,
  updateChangePass,
  updateInforCompany,
  setIsSubmitting
} from '../accAuth/slide';
import {
  ApiGetCompanyConfig,
  ApiLogin,
  ApiChangeInfoCustomer,
  ApiChangePasswordCustomer,
  ApiGetInfoContact,
  ApiRemoveUser
} from '../../action/Api';
import { setToken, setUserInformation, setRefreshToken } from '../../storage';
import { NotifierAlert } from '../../components';

const fetchCompanyConfig = () => async dispatch => {
  try {
    const { data } = await ApiGetCompanyConfig();
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result.CompanyInfo;
      if (result.length > 0) {
        await new Promise(resolve => {
          dispatch(updateRuleFormatCurrency(result[0].FormatCurrency));
          dispatch(updateRuleFormatDecimal(result[0].FormatDecimal));
          resolve();
        });
      } else {
        dispatch(setIsSubmitting(false))
      }
    }
  } catch (error) {
    dispatch(updateRuleFormatCurrency('VN'));
    dispatch(updateRuleFormatDecimal(2));
  }
};

const fetchLogin = (body, navigation, setShowOptions) => async dispatch => {
  try {
    const { data } = await ApiLogin(body);
    if (data.StatusCode === 200 && data.ErrorCode === '0') {
      let result = data.Result;
      if (result[0]?.Token) {
        await new Promise(resolve => {
          dispatch(updateUser(result[0]))
          setToken(JSON.stringify(result[0].Token))
          setRefreshToken(JSON.stringify(result[0].RefreshToken))
          setUserInformation(JSON.stringify(result[0]))
          setShowOptions(false);
          resolve();
        });
        navigation.navigate('TabNavigator')
      }
    } else {
      setShowOptions(false);
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
      setTimeout(() => {
        setShowOptions(true);
      }, 500)
    }
  } catch (err) {
    setShowOptions(true);
    NotifierAlert(
      3000,
      'Thông báo',
      `${data.Message}`,
      'error',
    );
  }
};

const fetchChooseCompany = (body, navigation) => async dispatch => {
  try {
    const { data } = await ApiLogin(body);
    if (data.StatusCode === 200 && data.ErrorCode === '0') {
      let result = data.Result;
      await new Promise(resolve => {
        dispatch(fetchCompanyConfig());
        dispatch(updateUser(result[0]));
        dispatch(setToken(JSON.stringify(result[0].Token)));
        dispatch(setUserInformation(JSON.stringify(result[0])));
        resolve();
      });
    } else {
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (err) {
    console.log('err', err)
  }
};

const fetchChangePass = (body) => async dispatch => {
  dispatch(setIsSubmitting(true));
  try {
    const { data } = await ApiChangePasswordCustomer(body);
    if (data.StatusCode === 200 && data.ErrorCode === '0') {
      let result = data.Result;
      dispatch(setIsSubmitting(false));
      await new Promise(resolve => {
        dispatch(updateChangePass(result[0]));
        resolve();
      });
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'success',
      );
    } else {
      dispatch(setIsSubmitting(false));
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (err) {
    dispatch(setIsSubmitting(false));
    console.log('err', err)
  }
};

const fetchChangeInfoCustomer = (body, navigation) => async dispatch => {
  try {
    const { data } = await ApiChangeInfoCustomer(body);
    if (data.StatusCode === 200 && data.ErrorCode === '0') {
      let result = data.Result;
      if (result) {
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );
      }
    } else {
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (err) {
    NotifierAlert(
      3000,
      'Thông báo',
      `${data.Message}`,
      'error',
    );
  }
};

const fetchInforCompany = () => async dispatch => {
  try {
    const { data } = await ApiGetInfoContact();
    if (data.StatusCode === 200 && data.ErrorCode === '0') {
      let result = data.Result;
      if (result) {
        await new Promise(resolve => {
          dispatch(updateInforCompany(result[0]))
          resolve();
        });
      }
    } else {
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (err) {
    NotifierAlert(
      3000,
      'Thông báo',
      `${data.Message}`,
      'error',
    );
  }
};

const fetchDeleteAccount = (body, navigation) => async dispatch => {
  try {
    const { data } = await ApiRemoveUser(body);
    if (data.StatusCode === 200 && data.ErrorCode === '0') {
      let result = data.Result;
      if (result) {
        await new Promise(resolve => {
          dispatch(updateUser(null))
          resolve();
        });
      }
    } else {
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (err) {
    NotifierAlert(
      3000,
      'Thông báo',
      `${data.Message}`,
      'error',
    );
  }
};


export {
  fetchCompanyConfig,
  fetchLogin,
  fetchChooseCompany,
  fetchChangePass,
  fetchChangeInfoCustomer,
  fetchInforCompany,
  fetchDeleteAccount
}
