import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ReviewsComponent } from './components';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { ReviewsRoutingModule } from './reviews-routing.module';

const COMPONENTS: any[] = [ReviewsComponent, AddReviewComponent];
const MODULES: any[] = [SharedModule, ReviewsRoutingModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class ReviewsModule {}
