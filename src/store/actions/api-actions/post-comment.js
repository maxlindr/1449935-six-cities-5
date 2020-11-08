import {CommentAdapter} from '../../../services/api-data-adapters';
import {ActionCreator} from '../action';
import {handleErrorWithAlert} from './error-handlers';

export const postComment = (offerId, comment) => (dispatch, _getState, api) => (
  api.post(`/comments/${offerId}`, CommentAdapter.toServer(comment))
    .then(({data}) => {
      dispatch(ActionCreator.setFetchedReviews(
          data.map(CommentAdapter.toClient)
      ));
    })
    .catch((err) => {
      handleErrorWithAlert(dispatch, err);
      throw err;
    })
);
