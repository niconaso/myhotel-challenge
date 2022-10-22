import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { getRatingClassname } from '@utils';

@Component({
  selector: 'app-rating-emoji',
  templateUrl: './rating-emoji.component.html',
  styleUrls: ['./rating-emoji.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingEmojiComponent {
  @Input() rating!: number;

  @HostBinding('class') get classes() {
    return `rating rating--${getRatingClassname(this.rating)}`;
  }
}
