import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared/shared.module';
import { CreateOrUpdateReviewComponent, ReviewsComponent } from './components';
import { CreateOrEditReviewDirective } from './directives';
import { DeleteReviewDirective } from './directives/delete-review.directive';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewState } from './states';

const DIRECTIVES: any[] = [CreateOrEditReviewDirective, DeleteReviewDirective];
const COMPONENTS: any[] = [ReviewsComponent, CreateOrUpdateReviewComponent];
const MODULES: any[] = [
  SharedModule,
  ReviewsRoutingModule,
  ComponentsModule,
  NgxsModule.forFeature([ReviewState]),
];

@NgModule({
  declarations: [...DIRECTIVES, ...COMPONENTS],
  imports: [...MODULES],
})
export class ReviewsModule {}
