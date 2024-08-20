import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listCabinet: [],
  listLight: [],
  listCamera: [],
  listDevices: [],
  listProvince: [],
  listDetailProvince: [],
  listDetailWard: [],
  listPower: [],
  listConnect: [],
  listDetector: [],
  listIndicator: [],
  listStationAquaculture: [],
  detailCamera: null,
  isSubmitting: false,
  listVersion: [],
  listTypeControl: [],
  listTypeBuoy:[],
  listTypeFire:[],
  listIndicatorModal:[],
  listTypeGas:[],
  listCustomer:[]
};

export const cabinetSlice = createSlice({
  name: 'cabinet',
  initialState: initialState,
  reducers: {
    updateCabinet: (state, action) => {
      state.listCabinet = action.payload;
    },
    updateLight: (state, action) => {
      state.listLight = action.payload;
    },
    updateCamera: (state, action) => {
      state.listCamera = action.payload;
    },
    updateListDevices: (state, action) => {
      state.listDevices = action.payload;
    },
    updateDetailCamera: (state, action) => {
      state.detailCamera = action.payload;
    },
    updateListProvince: (state, action) => {
      state.listProvince = action.payload;
    },
    updateListDetailProvince: (state, action) => {
      state.listDetailProvince = action.payload;
    },
    updateListDetailWard: (state, action) => {
      state.listDetailWard = action.payload;
    },
    updateListPower: (state, action) => {
      state.listPower = action.payload;
    },
    updateListConnect: (state, action) => {
      state.listConnect = action.payload;
    },
    updateListDetector: (state, action) => {
      state.listDetector = action.payload;
    },
    updateListIndicator: (state, action) => {
      state.listIndicator = action.payload;
    },
    updateListStationAquaculture: (state, action) => {
      state.listStationAquaculture = action.payload;
    },
    updateListVersion: (state, action) => {
      state.listVersion = action.payload;
    },
    updateListTypeControl: (state, action) => {
      state.listTypeControl = action.payload;
    },
    updateListTypeBuoy: (state, action) => {
      state.listTypeBuoy = action.payload;
    },
    updateListTypeFire: (state, action) => {
      state.listTypeFire = action.payload;
    },
    updateListIndicatorModal: (state, action) => {
      state.listIndicatorModal = action.payload;
    },
    updateListTypeGas: (state, action) => {
      state.listTypeGas = action.payload;
    },
    updateListCustomer: (state, action) => {
      state.listCustomer = action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    reseCabinet: state => {
      return initialState;
    },
  },
});

export const {
  updateCabinet,
  updateLight,
  updateCamera,
  setIsSubmitting,
  updateListDevices,
  updateDetailCamera,
  updateListProvince,
  updateListDetailProvince,
  updateListDetailWard,
  updateListConnect,
  updateListPower,
  updateListDataType,
  updateListDetector,
  updateListIndicator,
  updateListStationAquaculture,
  updateListVersion,
  updateListTypeControl,
  updateListTypeBuoy,
  updateListTypeFire,
  updateListIndicatorModal,
  updateListTypeGas,
  updateListCustomer
} = cabinetSlice.actions;

export default cabinetSlice.reducer;
