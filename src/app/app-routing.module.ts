import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'nearu',
    children: [
      {
        path: '',
        loadChildren: () => import('./shipping/shipping.module').then(m => m.ShippingModule)
      }
    ]
  },
  { path: '**', redirectTo: '/nearu' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
