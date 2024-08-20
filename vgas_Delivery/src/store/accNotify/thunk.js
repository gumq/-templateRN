import { setIsSubmitting, updateListNotify, updateTotalNotify } from '../accNotify/slide';
import { ApiGetNotify, ApiGetTotalNotify } from '../../action/Api';

const fetchTotalNotify = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  const body = { GroupType: "GroupUsers" }
  try {
    const { data } = await ApiGetTotalNotify(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateTotalNotify(result[0]?.TotalNotify));
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

const fetchListNotify = () => async dispatch => {
  dispatch(setIsSubmitting(true))
  const body = { GroupType: "GroupUsers" }
  try {
    const { data } = await ApiGetNotify(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateListNotify(result));
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

export {
  fetchTotalNotify,
  fetchListNotify
}
