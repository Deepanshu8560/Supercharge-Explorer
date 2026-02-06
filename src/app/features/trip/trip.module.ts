import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { RouteSummaryComponent } from './components/route-summary/route-summary.component';


import { TripPageComponent } from './trip-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TripPageComponent,
    TripFormComponent,
    RouteSummaryComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TripModule { }
