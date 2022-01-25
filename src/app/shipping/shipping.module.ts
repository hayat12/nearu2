import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingRoutingModule } from './shipping-routing.module';
import { SenderComponent } from './sender/sender.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import { CourierServiceOptionsComponent } from './courier-service-options/courier-service-options.component';
import { CompletedComponent } from './completed/completed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ParcelsComponent } from './parcels/parcels.component';
import { ServiceService } from './services/service.service';
import { AppHeaderComponent } from './app-header/app-header.component';
import { UploadProofComponent } from './upload-proof/upload-proof.component';


@NgModule({
  declarations: [
    SenderComponent,
    ReceiverComponent,
    ParcelDetailsComponent,
    CourierServiceOptionsComponent,
    CompletedComponent,
    ParcelsComponent,
    AppHeaderComponent,
    UploadProofComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ShippingRoutingModule
  ],
  providers: [ServiceService]
})
export class ShippingModule { }
