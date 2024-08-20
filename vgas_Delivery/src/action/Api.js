import axios from 'axios';
import { getLocale, getToken, getRefreshToken, setToken, setRefreshToken, clearRefreshToken } from '../storage';
import Config from 'react-native-config';

axios.interceptors.request.use(
  async config => {
    config.baseURL = Config.API_URL;
    let language = JSON.parse(await getLocale());
    config.headers.Language = language ? language.Code : 'vn';
    if (
      !config.url.includes(
        '/authentication/LoginUserApp' ||
        'config/ChoseLanguage' ||
        'config/MobileLanguage',
      )
    ) {
      const token = JSON.parse(await getToken());
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const tokenRefresh = JSON.parse(await getRefreshToken());
      if (tokenRefresh) {
        let val = await ApiRefreshToken({ refreshToken: tokenRefresh })
        let result = val.status ? val.data : null
        if (result) {
          setToken(result.Token);
          setRefreshToken(result.RefreshToken);
        } else {
          clearToken();
          clearRefreshToken();
          clearUserInfo();
        }
      }
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { config, status, data } = error.response;

    if (__DEV__) {
      console.log(`URL: ${config?.url}\n`, `STATUS: ${status}\n `, data);
    }
    return Promise.reject(error);
  },
);


export const ApiChooseLanguage = () => {
  return axios({
    method: 'post',
    url: 'config/ChoseLanguage',
    data: {},
  });
};

export const ApiGetLanguageDetails = () => {
  return axios({
    method: 'post',
    url: 'customize-ver2/MobileLanguage',
    data: { TableName: 'NLT_SC' },
  });
};

export const ApiLogin = body => {
  return axios({
    method: 'post',
    url: 'authentication/LoginUserGateway',
    data: body,
  });
};

export const ApiChangePasswordCustomer = body => {
  return axios({
    method: 'post',
    url: 'authentication/ChangePasswordUser',
    data: body,
  });
};

//get menu
export const ApiGetMenuRightByGroupID = body => {
  return axios({
    method: 'post',
    url: 'menu/GetMenuRightByGroupID',
    data: body,
  });
};

export const ApiSmartLightingDashboard = () => {
  return axios({
    method: 'post',
    url: 'SmartLighting/Dashboard',
    data: {},
  });
};

export const ApiSmartLightingMonitor = () => {
  return axios({
    method: 'post',
    url: 'SmartLighting/Monitor',
    data: {},
  });
};

export const ApiSmartLightingMonitorByStationID = body => {
  return axios({
    method: 'post',
    url: 'SmartLighting/MonitorByStationID',
    data: body,
  });
};

// api get config company information
export const ApiCheckTokenAppValid = body => {
  return axios({
    method: 'post',
    url: 'authentication/CheckToken',
    data: body,
  });
};

export const ApiRefreshToken = body => {
  return axios({
    method: 'post',
    url: 'AuthenticationCustomer/RefreshToken',
    data: body,
  });
};

// add phần thông báo
export const ApiAddTokenFirebase = body => {
  return axios({
    method: 'post',
    url: 'TokenAppVer2/Add',
    data: body,
  });
};

export const ApiGetNotify = (data) => {
  return axios({
    method: 'post',
    url: 'NotifyVer2/Get',
    data,
  });
};

export const ApiGetTotalNotify = () => {
  return axios({
    method: 'post',
    url: 'NotifyVer2/GetTotal',
    data: {},
  });
};

export const ApiUpdateViewNoti = (body) => {
  return axios({
    method: 'post',
    url: 'NotifyVer2/UpdateView',
    data: body,
  });
};

export const ApiDeleteNoti = (body) => {
  return axios({
    method: 'post',
    url: 'NotifyVer2/DeleteNotifyByListDetails',
    data: body,
  });
};

// api logout
export const ApiauthenticationLogOut = body => {
  return axios({
    method: 'post',
    url: 'authentication/LogOut',
    data: body,
  });
};

// Thay đổi tài khoản
export const ApiGetInfoContact = () => {
  return axios({
    method: 'post',
    url: 'CompanyConfig/GetContactByUserID',
    data: {},
  });
};

// Đơn hàng
export const ApiDeliveryAppGetTotal = () => {
  return axios({
    method: 'post',
    url: 'DeliveryApp/GetTotal',
    data: {},
  });
};

export const ApiDeliveryAppGetListOrder = () => {
  return axios({
    method: 'post',
    url: 'DeliveryApp/GetListOrder',
    data: {},
  });
};

export const ApiDeliveryAppGetByID = (body) => {
  return axios({
    method: 'post',
    url: 'DeliveryApp/GetByID',
    data: body,
  });
};

export const ApiDeliveryAppStart = (body) => {
  return axios({
    method: 'post',
    url: 'DeliveryApp/Start',
    data: body,
  });
};

export const ApiDeliveryAppDone = (body) => {
  return axios({
    method: 'post',
    url: 'DeliveryApp/Done',
    data: body,
  });
};

export const ApiDeliveryAppCancel = (body) => {
  return axios({
    method: 'post',
    url: 'DeliveryApp/Cancel',
    data: body,
  });
};

export const ApiDeliveryAppLater = (body) => {
  return axios({
    method: 'post',
    url: 'DeliveryApp/Later',
    data: body,
  });
};

export const ApiDeliveryGetReason = (body) => {
  return axios({
    method: 'post',
    url: 'NPLCategories/GetActive',
    data: body,
  });
};

export const ApiSetChangeMode = (body) => {
  return axios({
    method: 'post',
    url: 'SmartLighting/SetChangeMode',
    data: body,
  });
};

export const ApiSetActionByStationID = (body) => {
  return axios({
    method: 'post',
    url: 'SmartLighting/SetActionByStationID',
    data: body,
  });
};

// Cấu hình thiết bị => camera
export const ApiStationsGet = (body) => {
  return axios({
    method: 'post',
    url: 'Stations/Get',
    data: body,
  });
};

export const ApiStationNodesGet = (body) => {
  return axios({
    method: 'post',
    url: 'StationNodes/Get',
    data: body,
  });
};

export const ApiStationDeviceIPGet = (body) => {
  return axios({
    method: 'post',
    url: 'StationDeviceIP/Get',
    data: body,
  });
};

export const ApiCategoryGeneralsGetActive = (body) => {
  return axios({
    method: 'post',
    url: 'CategoryGenerals/GetActive',
    data: body,
  });
};

export const ApiStationDeviceIPAdd = (body) => {
  return axios({
    method: 'post',
    url: 'StationDeviceIP/Add',
    data: body,
  });
};

export const ApiStationDeviceIPEdit = (body) => {
  return axios({
    method: 'post',
    url: 'StationDeviceIP/Edit',
    data: body,
  });
};

export const ApiStationDeviceIPDelete = (body) => {
  return axios({
    method: 'post',
    url: 'StationDeviceIP/Delete',
    data: body,
  });
};

export const ApiStationDeviceIPGetById = (body) => {
  return axios({
    method: 'post',
    url: 'StationDeviceIP/GetById',
    data: body,
  });
};

// Cấu hình thiết bị => danh sách đèn
export const ApiStationNodesAdd = (body) => {
  return axios({
    method: 'post',
    url: 'StationNodes/Add',
    data: body,
  });
};

export const ApiStationNodesEdit = (body) => {
  return axios({
    method: 'post',
    url: 'StationNodes/Edit',
    data: body,
  });
};

export const ApiStationNodesDelete = (body) => {
  return axios({
    method: 'post',
    url: 'StationNodes/Delete',
    data: body,
  });
};

export const ApiStationNodesGetById = (body) => {
  return axios({
    method: 'post',
    url: 'StationNodes/GetById',
    data: body,
  });
};

//chỉnh sửa tủ
export const ApiStationsGetByID = (body) => {
  return axios({
    method: 'post',
    url: 'Stations/GetByID',
    data: body,
  });
};

export const ApiStationsEdit = (body) => {
  return axios({
    method: 'post',
    url: 'Stations/Edit',
    data: body,
  });
};

//Danh sách tỉnh thành
export const ApinPLRegionsGuestsGetByLevel = (body) => {
  return axios({
    method: 'post',
    url: 'nPLRegionsGuests/GetByLevel',
    data: body,
  });
};

export const ApinPLRegionsGuestsGetByParentID = (body) => {
  return axios({
    method: 'post',
    url: 'nPLRegionsGuests/GetByParentID',
    data: body,
  });
};

export const ApiUploadFile = body => {
  return axios({
    method: 'post',
    url: 'AttachFiles/Add',
    data: body,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const ApiGetMonitorByMobile = (body) => {
  return axios({
    method: 'post',
    url: 'DashboardMaintenanceProcess/GetMonitorByMobile',
    data: body,
  });
};

export const ApiGetMonitorById = (body) => {
  return axios({
    method: 'post',
    url: 'DashboardMaintenanceProcess/GetMonitorById',
    data: body,
  });
};

// Tiếp nhận và kết quả duy tu từng mục
export const ApiMaintenanceProcessConfirm = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/Confirm',
    data: body,
  });
};

export const ApiMaintenanceProcessComplete = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/Complete',
    data: body,
  });
};

// Tiếp nhận và kết quả duy tu cả tuyến
export const ApiMaintenanceProcessEmployer_Confirm = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/Employer_Confirm',
    data: body,
  });
};

export const ApiMaintenanceProcessEmployer_Complete = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/Employer_Complete',
    data: body,
  });
};

//Báo cáo sự cố
export const ApiMaintenanceReportsGetMobile = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceReports/GetMobile',
    data: body,
  });
};

export const ApiMaintenanceReportsAdd = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceReports/Add',
    data: body,
  });
};

export const ApiMaintenanceReportsEdit = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceReports/Edit',
    data: body,
  });
};

export const ApiMaintenanceReportsGetById = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceReports/GetById',
    data: body,
  });
};

export const ApiEntrysGetByFactorID = () => {
  return axios({
    method: 'post',
    url: 'Entrys/GetByFactorID',
    data: { FactorID: "ReportProblem" },
  });
};

export const ApiCategoryGeneralsGetByGeoCode = (body) => {
  return axios({
    method: 'post',
    url: 'CategoryGenerals/GetByGeoCode',
    data: body,
  });
};

export const ApiIndicatorsGetByStationID = (body) => {
  return axios({
    method: 'post',
    url: 'Indicators/GetByStationID',
    data: body,
  });
};

export const ApiGetByStationIsSelect = (body) => {
  return axios({
    method: 'post',
    url: 'Indicators/GetByStationIsSelect',
    data: body,
  });
};


export const ApiStationRights_ByGroupEditByList = (body) => {
  return axios({
    method: 'post',
    url: 'StationRights_ByGroup/EditByList',
    data: body,
  });
};

export const ApiStationDevicesGet = (body) => {
  return axios({
    method: 'post',
    url: 'StationDevices/Get',
    data: body,
  });
};

export const ApiStationDevicesDelete = (body) => {
  return axios({
    method: 'post',
    url: 'StationDevices/Delete',
    data: body,
  });
};

export const ApiStationDevicesEdit = (body) => {
  return axios({
    method: 'post',
    url: 'StationDevices/Edit',
    data: body,
  });
};

export const ApiStationNodesGetGasVersion = () => {
  return axios({
    method: 'post',
    url: 'StationNodes/GetGasVersion',
    data: {},
  });
};

// Tổng hợp giám sát và điều khiển Đèn tín hiệu giao thông
export const ApiSmartTrafficDashboard = () => {
  return axios({
    method: 'post',
    url: 'SmartTraffic/Dashboard',
    data: {},
  });
};

export const ApiSmartTrafficMonitor = () => {
  return axios({
    method: 'post',
    url: 'SmartTraffic/Monitor',
    data: {},
  });
};

export const ApiSmartTrafficMonitorByStationID = (body) => {
  return axios({
    method: 'post',
    url: 'SmartTraffic/MonitorByStationID',
    data: body,
  });
};

export const ApiSmartTrafficChartTotal = (body) => {
  return axios({
    method: 'post',
    url: 'SmartTraffic/ChartTotal',
    data: body,
  });
};

export const ApiSmartTrafficReport = (body) => {
  return axios({
    method: 'post',
    url: 'SmartTraffic/Report',
    data: body,
  });
};

export const ApiSmartTrafficSetChangeMode = (body) => {
  return axios({
    method: 'post',
    url: 'SmartTraffic/SetChangeMode',
    data: body,
  });
};

export const ApiSmartTrafficSetActionByStationID = (body) => {
  return axios({
    method: 'post',
    url: 'SmartTraffic/SetActionByStationID',
    data: body,
  });
};

// Tổng hợp giám sát và điều khiển Quan trắc môi trường
export const ApiSmartAquaDashboard = () => {
  return axios({
    method: 'post',
    url: 'SmartMonitor/Dashboard',
    data: {},
  });
};

export const ApiSmartAquaMonitor = () => {
  return axios({
    method: 'post',
    url: 'SmartMonitor/Monitor',
    data: {},
  });
};

export const ApiSmartAquaMonitorByStationID = (body) => {
  return axios({
    method: 'post',
    url: 'SmartMonitor/MonitorByStationID',
    data: body,
  });
};

export const ApiSmartAquaChartTotal = (body) => {
  return axios({
    method: 'post',
    url: 'SmartMonitor/ChartTotal',
    data: body,
  });
};

export const ApiSmartAquaReport = (body) => {
  return axios({
    method: 'post',
    url: 'SmartMonitor/Report',
    data: body,
  });
};

export const ApiSmartAquaSetChangeMode = (body) => {
  return axios({
    method: 'post',
    url: 'SmartMonitor/SetChangeMode',
    data: body,
  });
};

export const ApiSmartAquaSetActionByStationID = (body) => {
  return axios({
    method: 'post',
    url: 'SmartMonitor/SetActionByStationID',
    data: body,
  });
};

// Giám sát rò rỉ gas
export const ApiSmartGasMonitor = (body) => {
  return axios({
    method: 'post',
    url: 'SmartGas/Monitor',
    data: body,
  });
};

export const ApiSmartGasMonitorByStationID = (body) => {
  return axios({
    method: 'post',
    url: 'SmartGas/MonitorByStationID',
    data: body,
  });
};

export const ApiSmartGasSetRestart = (body) => {
  return axios({
    method: 'post',
    url: 'SmartGas/SetRestart',
    data: body,
  });
};

export const ApiSmartGasSetRefresh = (body) => {
  return axios({
    method: 'post',
    url: 'SmartGas/SetRefresh',
    data: body,
  });
};

export const ApiSmartGasSetLock = (body) => {
  return axios({
    method: 'post',
    url: 'SmartGas/SetLock',
    data: body,
  });
};

export const ApiSmartGasSetGasUse = (body) => {
  return axios({
    method: 'post',
    url: 'SmartGas/SetGasUse',
    data: body,
  });
};

// Cập nhật dữ liệu cây xanh
export const ApiMaintenanceProcessGetRequestMobile = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/GetRequestMobile',
    data: body,
  });
};

export const ApiMaintenanceProcessGetListTreeMobile = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/GetListTreeMobile',
    data: body,
  });
};

export const ApiMaintenanceProcessGetTreeDetailMobile = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/GetTreeDetailMobile',
    data: body,
  });
};

export const ApiMaintenanceProcessAddTree = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/AddTree',
    data: body,
  });
};

export const ApiMaintenanceProcessEditTree = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/EditTree',
    data: body,
  });
};

export const ApiTreesV2GetActive = (body) => {
  return axios({
    method: 'post',
    url: 'TreesV2/GetActive',
    data: body,
  });
};

export const ApiStatusGet = (body) => {
  return axios({
    method: 'post',
    url: 'Status/Get',
    data: body,
  });
};
export const ApiGetMaxTreeNumber = (body) => {
  return axios({
    method: 'post',
    url: 'MaintenanceProcess/GetMaxTreeNumber',
    data: body,
  });
};
// Tổng hợp giám sát phao phân luồng
export const ApiSmartBuoyDashboard = (body) => {
  return axios({
    method: 'post',
    url: 'SmartBuoy/Dashboard',
    data: body,
  });
};

export const ApiSmartBuoyMonitor = (body) => {
  return axios({
    method: 'post',
    url: 'SmartBuoy/Monitor',
    data: body,
  });
};

export const ApiSmartBuoyMonitorByStationID = (body) => {
  return axios({
    method: 'post',
    url: 'SmartBuoy/MonitorByStationID',
    data: body,
  });
};

export const ApiCategoryGeneralTreesGetByParentID = (body) => {
  return axios({
    method: 'post',
    url: 'CategoryGeneralTrees/GetByParentID',
    data: body,
  });
};

// Tổng hợp báo cháy thông minh
export const ApiSmartFireDashboard = (body) => {
  return axios({
    method: 'post',
    url: 'SmartFire/Dashboard',
    data: body,
  });
};

export const ApiSmartFireMonitor = (body) => {
  return axios({
    method: 'post',
    url: 'SmartFire/Monitor',
    data: body,
  });
};

export const ApiSmartFireMonitorByLocalID = (body) => {
  return axios({
    method: 'post',
    url: 'SmartFire/MonitorByLocalID',
    data: body,
  });
};

export const ApiSmartFireMonitorByZoneDetailID = (body) => {
  return axios({
    method: 'post',
    url: 'SmartFire/MonitorByZoneDetailID',
    data: body,
  });
};
// Danh sách khách hàng
export const ApinPLCustomersGetActiveAll = () => {
  return axios({
    method: 'post',
    url: 'nPLCustomers/GetActiveAll',
    data: {},
  });
};