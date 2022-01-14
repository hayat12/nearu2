import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedComponent } from './completed/completed.component';
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import { CourierServiceOptionsComponent } from './courier-service-options/courier-service-options.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { SenderComponent } from './sender/sender.component';

const routes: Routes = [
  {
    path: '',
    component: SenderComponent
  },
  {
    path: 'sender',
    component: SenderComponent
  },
  {
    path: 'receiver',
    component: ReceiverComponent
  },
  {
    path: 'parcel-details',
    component: ParcelDetailsComponent
  },
  {
    path: 'courier-service-options',
    component: CourierServiceOptionsComponent
  },
  {
    path: 'completed',
    component: CompletedComponent
  },
  {
    path: 'parcels',
    component: ParcelsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingRoutingModule { }
