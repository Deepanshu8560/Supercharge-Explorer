import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'map',
    loadChildren: () => import('./features/map/map.module').then(m => m.MapModule)
  },
  {
    path: 'trip',
    loadChildren: () => import('./features/trip/trip.module').then(m => m.TripModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
