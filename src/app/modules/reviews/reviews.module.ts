import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ReviewsComponent } from './components';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { AddReviewDirective } from './directives/add-review.directive';
import { ReviewsRoutingModule } from './reviews-routing.module';

const DIRECTIVES: any[] = [AddReviewDirective];
const COMPONENTS: any[] = [ReviewsComponent, AddReviewComponent];
const MODULES: any[] = [SharedModule, ReviewsRoutingModule];

@NgModule({
  declarations: [...DIRECTIVES, ...COMPONENTS],
  imports: [...MODULES],
})
export class ReviewsModule {}
