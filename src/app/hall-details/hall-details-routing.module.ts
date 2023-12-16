import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HallDetailsPage } from './hall-details.page';

const routes: Routes = [
  {
    path: '',
    component: HallDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HallDetailsPageRoutingModule {}
