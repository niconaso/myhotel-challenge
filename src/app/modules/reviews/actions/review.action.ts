import { Review } from '../models';

export class AddReview {
  static readonly type = '[Review] Add';

  constructor(public payload: Review) {}
}

export class GetReviews {
  static readonly type = '[Review] Get';
}

export class UpdateReview {
  static readonly type = '[Review] Update';

  constructor(public payload: Review, public id: string | undefined) {}
}

export class DeleteReview {
  static readonly type = '[Review] Delete';

  constructor(public id: string | undefined) {}
}

export class SetSelectedReview {
  static readonly type = '[Review] Set';

  constructor(public payload: Review | null) {}
}
