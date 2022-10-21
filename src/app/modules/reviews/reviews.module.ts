import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AddReviewComponent, ReviewsComponent } from './components';
import { AddReviewDirective } from './directives';
import { ReviewsRoutingModule } from './reviews-routing.module';

const DIRECTIVES: any[] = [AddReviewDirective];
const COMPONENTS: any[] = [ReviewsComponent, AddReviewComponent];
const MODULES: any[] = [SharedModule, ReviewsRoutingModule];

@NgModule({
  declarations: [...DIRECTIVES, ...COMPONENTS],
  imports: [...MODULES],
})
export class ReviewsModule {}
