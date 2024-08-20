import { setIsSubmitting, updateMenu } from '../accHome/slide';
import { ApiGetMenuRightByGroupID } from '../../action/Api';

const fetchMenu = (body) => async dispatch => {
  dispatch(setIsSubmitting(true))
  try {
    const { data } = await ApiGetMenuRightByGroupID(body);
    if (data.ErrorCode === '0' && data.StatusCode === 200) {
      let result = data.Result;
      if (result.length > 0) {
        dispatch(setIsSubmitting(false))
        await new Promise(resolve => {
          dispatch(updateMenu(result));
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
  fetchMenu
}
