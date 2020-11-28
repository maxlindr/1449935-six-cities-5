import {ActionCreator} from '../action';
import {CommentAdapter} from '../../../services/api-data-adapters/api-data-adapters';

export const fetchReviewsList = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => {
      dispatch(ActionCreator.setFetchedReviews(
          data.map(CommentAdapter.adaptToClient)
      ));
    })
    .catch(() => {
      dispatch(ActionCreator.showAlert(`Cannot fetch reviews`));
    })
);
