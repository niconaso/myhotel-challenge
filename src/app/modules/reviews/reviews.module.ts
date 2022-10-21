import { NgModule } from '@angular/core';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared/shared.module';
import { CreateOrUpdateReviewComponent, ReviewsComponent } from './components';
import { CreateOrEditReviewDirective } from './directives';
import { ReviewsRoutingModule } from './reviews-routing.module';

const DIRECTIVES: any[] = [CreateOrEditReviewDirective];
const COMPONENTS: any[] = [ReviewsComponent, CreateOrUpdateReviewComponent];
const MODULES: any[] = [SharedModule, ReviewsRoutingModule, ComponentsModule];

@NgModule({
  declarations: [...DIRECTIVES, ...COMPONENTS],
  imports: [...MODULES],
})
export class ReviewsModule {}
