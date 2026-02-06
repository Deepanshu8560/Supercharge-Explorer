import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';


import { MapPageComponent } from './map-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

@NgModule({
  declarations: [
    MapPageComponent,
    FilterPanelComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class MapModule { }
