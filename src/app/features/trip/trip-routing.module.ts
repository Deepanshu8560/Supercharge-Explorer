import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripPageComponent } from './trip-page.component';

const routes: Routes = [
  { path: '', component: TripPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
