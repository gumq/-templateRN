import {
  updateCabinet,
  updateCamera,
  updateDetailCamera,
  updateLight,
  updateListConnect,
  updateListDetailProvince,
  updateListDetailWard,
  updateListDetector,
  updateListDevices,
  updateListIndicator,
  updateListPower,
  updateListProvince,
  updateListStationAquaculture,
  updateListVersion,
  updateListTypeControl,
  updateListTypeBuoy,
  updateListTypeFire,
  updateListIndicatorModal,
  updateListTypeGas,
  updateListCustomer
} from '../accDevices/slide';
import {
  ApiCategoryGeneralsGetActive,
  ApiGetByStationIsSelect,
  ApiIndicatorsGetByStationID,
  ApiStationDeviceIPAdd,
  ApiStationDeviceIPDelete,
  ApiStationDeviceIPEdit,
  ApiStationDeviceIPGet,
  ApiStationDeviceIPGetById,
  ApiStationDevicesDelete,
  ApiStationDevicesEdit,
  ApiStationDevicesGet,
  ApiStationNodesAdd,
  ApiStationNodesDelete,
  ApiStationNodesEdit,
  ApiStationNodesGet,
  ApiStationNodesGetGasVersion,
  ApiStationRights_ByGroupEditByList,
  ApiStationsEdit, ApiStationsGet,
  ApinPLCustomersGetActiveAll,
  ApinPLRegionsGuestsGetByLevel,
  ApinPLRegionsGuestsGetByParentID
} from '../../action/Api';
import { setIsSubmitting } from '../accDevices/slide';
import { NotifierAlert } from '../../components';

const fetchListCabinet = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))

  try {
    const { data } = await ApiStationsGet(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateCabinet(result));
          resolve();
        });
      } else {
        dispatch(setIsSubmitting(false))
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListLight = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationNodesGet(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result && result.length > 0) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateLight(result));
          resolve();
        });
      } else {
        dispatch(setIsSubmitting(false));
        dispatch(updateLight([]));
      }
    }
  } catch (error) {
    dispatch(setIsSubmitting(false))
    console.log('error', error);
  }
};

const fetchListCamera = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationDeviceIPGet(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result && result.length > 0) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateCamera(result));
          resolve();
        });
      } else {
        dispatch(updateCamera([]));
        dispatch(setIsSubmitting(false))
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListDevices = () => async dispatch => {
  dispatch(setIsSubmitting(true))
  const body = {
    CategoryType: "DeviceIPTypes"
  }
  try {
    const { data } = await ApiCategoryGeneralsGetActive(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateListDevices(result));
          resolve();
        });
      } else {
        dispatch(setIsSubmitting(false))
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListTypeControl = () => async dispatch => {
  dispatch(setIsSubmitting(true))
  const body = {
    CategoryType: "MonitorDeviceTypes"
  }
  try {
    const { data } = await ApiCategoryGeneralsGetActive(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateListTypeControl(result));
          resolve();
        });
      } else {
        dispatch(setIsSubmitting(false))
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchAddCamera = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationDeviceIPAdd(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );
      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    } else {
      dispatch(setIsSubmitting(false))
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (error) {
    dispatch(setIsSubmitting(false))
    NotifierAlert(
      3000,
      'Thông báo',
      `${error}`,
      'error',
    );
  }
};

const fetchEditCamera = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationDeviceIPEdit(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );

      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchDeleteCamera = (body, item) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationDeviceIPDelete(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        const { data } = await ApiStationDeviceIPGet({ StationID: item });
        if (data.ErrorCode === '0' && data.StatusCode === 200) {
          let result = data.Result;
          await new Promise(resolve => {
            dispatch(updateCamera(result));
            resolve();
          });
        }
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );

      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    } else {
      dispatch(setIsSubmitting(false))
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (error) {
    console.log('error', error);
  }
};


const fetchDetailCamera = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationDeviceIPGetById(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateDetailCamera(result));
          resolve();
        });
      } else {
        dispatch(setIsSubmitting(false))
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchDeleteLight = (body, stattionID) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationNodesDelete(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        const { data } = await ApiStationNodesGet({ StationID: stattionID });
        if (data.ErrorCode === '0' && data.StatusCode === 200) {
          let result = data.Result;
          await new Promise(resolve => {
            dispatch(updateLight(result));
            resolve();
          });
        }
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );

      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    } else {
      dispatch(setIsSubmitting(false))
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchAddLight = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationNodesAdd(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );

      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    } else {
      dispatch(setIsSubmitting(false))
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.error}`,
        'error',
      );
    }
  } catch (error) {
    dispatch(setIsSubmitting(false))
    NotifierAlert(
      3000,
      'Thông báo',
      `${error}`,
      'error',
    );
  }
};

const fetchEditLight = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationNodesEdit(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );

      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    } else {
      dispatch(setIsSubmitting(false))
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (error) {
    console.log('error', error);
    dispatch(setIsSubmitting(false))
    NotifierAlert(
      3000,
      'Thông báo',
      `${error}`,
      'error',
    );
  }
};

const fetchEditCabinet = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationsEdit(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );

      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    } else {
      dispatch(setIsSubmitting(false))
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (error) {
    console.log('error', error);
    dispatch(setIsSubmitting(false))
    NotifierAlert(
      3000,
      'Thông báo',
      `${error}`,
      'error',
    );
  }
};

const fetchListProvince = () => async dispatch => {
  const body = {
    Level: 2
  }
  try {
    const { data } = await ApinPLRegionsGuestsGetByLevel(body);
    if (data.StatusCode === 200 && data.ErrorCode === '0') {
      let result = data.Result;
      if (result) {
        await new Promise(resolve => {
          dispatch(updateListProvince(result))
          resolve();
        });
      } else {
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
    console.log('err', err)
  }
};

const fetchListDetailProvince = (body) => async dispatch => {
  try {
    const { data } = await ApinPLRegionsGuestsGetByParentID(body);
    if (data.StatusCode === 200 && data.ErrorCode === '0') {
      let result = data.Result;
      if (result) {
        await new Promise(resolve => {
          dispatch(updateListDetailProvince(result))
          resolve();
        });
      } else {
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
    console.log('err', err)
  }
};

const fetchListDetailWard = (body) => async dispatch => {
  try {
    const { data } = await ApinPLRegionsGuestsGetByParentID(body);
    if (data.StatusCode === 200 && data.ErrorCode === '0') {
      let result = data.Result;
      if (result) {
        await new Promise(resolve => {
          dispatch(updateListDetailWard(result))
          resolve();
        });
      } else {
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
    console.log('err', err)
  }
};

const fetchListPower = () => async dispatch => {
  const body = {
    CategoryType: "PowerTypes"
  }
  try {
    const { data } = await ApiCategoryGeneralsGetActive(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        await new Promise(resolve => {
          dispatch(updateListPower(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListConnect = () => async dispatch => {
  const body = {
    CategoryType: "ConnectTypes"
  }
  try {
    const { data } = await ApiCategoryGeneralsGetActive(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {

        await new Promise(resolve => {
          dispatch(updateListConnect(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }

    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchLevelDetector = () => async dispatch => {
  const body = {
    CategoryType: "LevelDetectors"
  }
  try {
    const { data } = await ApiCategoryGeneralsGetActive(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        await new Promise(resolve => {
          dispatch(updateListDetector(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListIndicator = (body) => async dispatch => {
  try {
    const { data } = await ApiIndicatorsGetByStationID(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        await new Promise(resolve => {
          dispatch(updateListIndicator(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListIndicatorModal = (body) => async dispatch => {
  try {
    const { data } = await ApiGetByStationIsSelect(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        await new Promise(resolve => {
          dispatch(updateListIndicatorModal(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};


const fetchEditStationByList = (body,bodyGet) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationRights_ByGroupEditByList(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        const { data } = await ApiIndicatorsGetByStationID(bodyGet);
        if (data.ErrorCode === '0' && data.StatusCode === 200) {
          let result = data.Result;
          await new Promise(resolve => {
            dispatch(updateListIndicator(result));
            resolve();
          });
        }
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );

      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    } else {
      dispatch(setIsSubmitting(false))
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListDevicesAquaculture = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationDevicesGet(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateListStationAquaculture(result));
          resolve();
        });
      } else {
        dispatch(setIsSubmitting(false))
      }
    }
  } catch (error) {
    dispatch(setIsSubmitting(false))
    console.log('error', error);
  }
};

const fetchEdittationDevices = (body, item) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationDevicesEdit(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        const { data } = await ApiStationDevicesGet({ StationID: item?.StationID });
        if (data.ErrorCode === '0' && data.StatusCode === 200) {
          let result = data.Result;
          await new Promise(resolve => {
            dispatch(updateListStationAquaculture(result));
            resolve();
          });
        }
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );

      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    } else {
      dispatch(setIsSubmitting(false))
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchDeleteStationDevices = (body, item) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiStationDevicesDelete(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result) {
        dispatch(setIsSubmitting(false))
        const { data } = await ApiStationDevicesGet({ StationID: item?.StationID });
        if (data.ErrorCode === '0' && data.StatusCode === 200) {
          let result = data.Result;
          await new Promise(resolve => {
            dispatch(updateListStationAquaculture(result));
            resolve();
          });
        }
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'success',
        );

      } else {
        dispatch(setIsSubmitting(false))
        NotifierAlert(
          3000,
          'Thông báo',
          `${data.Message}`,
          'error',
        );
      }
    } else {
      dispatch(setIsSubmitting(false))
      NotifierAlert(
        3000,
        'Thông báo',
        `${data.Message}`,
        'error',
      );
    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListVersion = () => async dispatch => {
  try {
    const { data } = await ApiStationNodesGetGasVersion();
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        await new Promise(resolve => {
          dispatch(updateListVersion(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};


const fetchListTypeBuoy = () => async dispatch => {
  const body = {
    CategoryType: "BuoyDeviceTypes"
  }
  try {
    const { data } = await ApiCategoryGeneralsGetActive(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {

        await new Promise(resolve => {
          dispatch(updateListTypeBuoy(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }

    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListTypeFire = () => async dispatch => {
  const body = {
    CategoryType: "FireDeviceTypes"
  }
  try {
    const { data } = await ApiCategoryGeneralsGetActive(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {

        await new Promise(resolve => {
          dispatch(updateListTypeFire(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }

    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListTypeGas = () => async dispatch => {
  const body = {
    CategoryType: "GasDeviceTypes"
  }
  try {
    const { data } = await ApiCategoryGeneralsGetActive(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {

        await new Promise(resolve => {
          dispatch(updateListTypeGas(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }

    }
  } catch (error) {
    console.log('error', error);
  }
};

const fetchListGetCustomer = () => async dispatch => {
  try {
    const { data } = await ApinPLCustomersGetActiveAll();
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {

        await new Promise(resolve => {
          dispatch(updateListCustomer(result));
          resolve();
        });
      } else {
        console.log(data.Message);
      }

    }
  } catch (error) {
    console.log('error', error);
  }
};


export {
  fetchListCabinet,
  fetchListLight,
  fetchListCamera,
  fetchListDevices,
  fetchAddCamera,
  fetchDeleteCamera,
  fetchDetailCamera,
  fetchEditCamera,
  fetchDeleteLight,
  fetchAddLight,
  fetchEditLight,
  fetchEditCabinet,
  fetchListProvince,
  fetchListDetailProvince,
  fetchListDetailWard,
  fetchListPower,
  fetchListConnect,
  fetchLevelDetector,
  fetchListIndicator,
  fetchEditStationByList,
  fetchListDevicesAquaculture,
  fetchDeleteStationDevices,
  fetchEdittationDevices,
  fetchListVersion,
  fetchListTypeControl,
  fetchListTypeBuoy,
  fetchListTypeFire,
  fetchListIndicatorModal,
  fetchListTypeGas,
  fetchListGetCustomer
}
