import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadProofComponent } from './upload-proof/upload-proof.component';

const routes: Routes = [
  // {
  //   path:'nearu',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./shipping/shipping.module').then(m => m.ShippingModule)
  //     },
  //   ]
  // },
  {
    path: 'upload-proof',
    component: UploadProofComponent
  },
  // { path: '**', redirectTo: '/upload-proof' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
