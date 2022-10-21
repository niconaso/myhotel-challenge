import { Pipe, PipeTransform } from '@angular/core';
import { Rating } from '@core/enums';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Pipe({
  name: 'ratingEmoji',
})
export class RatingEmojiPipe implements PipeTransform {
  private readonly ratingEmojiMap: Map<Rating, IconProp> = new Map([
    [Rating.WORST, 'face-angry'],
    [Rating.POOR, 'face-frown'],
    [Rating.AVERAGE, 'face-meh'],
    [Rating.GOOD, 'face-smile'],
    [Rating.EXCELLENT, 'face-laugh-beam'],
  ]);

  private _defaultRatingEmoji: IconProp = 'smile';

  transform(rating: number): IconProp {
    return this.ratingEmojiMap.get(rating) || this._defaultRatingEmoji;
  }
}
