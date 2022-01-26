import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedComponent } from './completed/completed.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UploadProofComponent } from './upload-proof/upload-proof.component';

const routes: Routes = [
  {
    path: 'upload-proof',
    component: UploadProofComponent
  },
  {
    path: 'success',
    component: CompletedComponent
  },
  {
    path: '404-page',
    component: NotFoundPageComponent
  },
  { path: '**', redirectTo: '/404-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
