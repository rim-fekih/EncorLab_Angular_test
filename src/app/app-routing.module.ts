import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';

const routes: Routes = [
  {
    path: 'favorites',
    component: FavoritesPageComponent,
  },
  {
    path: '**',
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
