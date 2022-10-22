import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {
  AddReview,
  DeleteReview,
  GetReviews,
  SetSelectedReview,
  UpdateReview,
} from '../actions/review.action';
import { Review } from '../models/review';
import { ReviewService } from '../services';

export class ReviewStateModel {
  reviews!: Review[];
  selectedReview!: Review | null;
}

@State<ReviewStateModel>({
  name: 'reviews',
  defaults: {
    reviews: [],
    selectedReview: null,
  },
})
@Injectable()
export class ReviewState {

  /**
   * Creates an instance of ReviewState.
   * @param {ReviewService} _reviewService
   * @memberof ReviewState
   */
  constructor(private _reviewService: ReviewService) {}

  @Selector()
  static getReviewList(state: ReviewStateModel) {
    return state.reviews;
  }

  @Selector()
  static getSelectedReview(state: ReviewStateModel) {
    return state.selectedReview;
  }

  @Action(GetReviews)
  getReviews({ getState, setState }: StateContext<ReviewStateModel>) {
    return this._reviewService.getAll().pipe(
      tap((reviews) => {
        const state = getState();
        setState({
          ...state,
          reviews,
        });
      })
    );
  }

  @Action(AddReview)
  addReview(
    { getState, patchState }: StateContext<ReviewStateModel>,
    { payload }: AddReview
  ) {
    return this._reviewService.create(payload).pipe(
      tap((review) => {
        const state = getState();
        patchState({
          reviews: [...state.reviews, review],
        });
      })
    );
  }

  @Action(UpdateReview)
  updateReview(
    { getState, setState }: StateContext<ReviewStateModel>,
    { payload, id }: UpdateReview
  ) {
    return this._reviewService.update(payload, id).pipe(
      tap((result) => {
        const state = getState();
        const reviewList = [...state.reviews];
        const reviewIndex = reviewList.findIndex(
          (review: Review) => review.id === id
        );
        reviewList[reviewIndex] = result;
        setState({
          ...state,
          reviews: reviewList,
        });
      })
    );
  }

  @Action(DeleteReview)
  deleteReview(
    { getState, setState }: StateContext<ReviewStateModel>,
    { id }: DeleteReview
  ) {
    return this._reviewService.remove(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.reviews.filter(
          (review: Review) => review.id !== id
        );
        setState({
          ...state,
          reviews: filteredArray,
        });
      })
    );
  }

  @Action(SetSelectedReview)
  setSelectedReview(
    { getState, setState }: StateContext<ReviewStateModel>,
    { payload }: SetSelectedReview
  ) {
    const state = getState();
    setState({
      ...state,
      selectedReview: payload,
    });
  }
}
