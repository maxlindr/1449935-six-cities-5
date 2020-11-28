import {CommentAdapter} from '../../../services/api-data-adapters/api-data-adapters';
import {ActionCreator} from '../action';
import {handleErrorWithAlert} from './error-handlers';

/**
 * Отправляет запрос с комментарием на сервер
 * @param {string|number} offerId offer id
 * @param {string} comment текст комментария
 * @return {Promise}
 */
export const postComment = (offerId, comment) => (dispatch, _getState, api) => (
  api.post(`/comments/${offerId}`, CommentAdapter.adaptToServer(comment))
    .then(({data}) => {
      dispatch(ActionCreator.setFetchedReviews(
          data.map(CommentAdapter.adaptToClient)
      ));
    })
    .catch((err) => {
      handleErrorWithAlert(dispatch, err);
      throw err;
    })
);
