import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'reviews',
    loadChildren: () =>
      import('@modules/reviews/reviews.module').then((m) => m.ReviewsModule),
  },
  {
    path: '',
    redirectTo: 'reviews',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
