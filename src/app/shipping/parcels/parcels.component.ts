import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { SettingHeader } from '../setting-header';
import { sendParcelData } from '../state/parcel/parcels';
import { CartInterface, ConfirmationModalInterface } from '../state/parcel/parcels.interface';
import { SenderInterface } from '../state/sender/sender.interface';
import { ActionsTypes } from '../state/shipping.enum';
declare var $:any;
@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.css']
})
export class ParcelsComponent extends SettingHeader implements OnInit {
  carts:CartInterface[] = [];
  selectedItem:any;
  modal:ConfirmationModalInterface;
  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
    private _service:ServiceService
  ) { super() }

  ngOnInit(): void {
    this.carts = this.getCart();
  }

  checkOut(){
    this.modal = {
      title: "Check Out",
      message: "Are you sure, you want to checkout ?",
      action: ActionsTypes.CHECK_OUT,
      confirm: "Check Out",
      close: "Close"
    };
    $('#confirmModal').modal('show');
    // this.router.navigate(['./completed'], {relativeTo: this.activateRouter})
  }

  createNew(){
    this.router.navigate(['./sender'], {relativeTo: this.activateRouter})
  }

  deleteItem(i:any){
    this.modal = {
      title: "Delete",
      message: "Are you sure, you want to delete ?",
      action: ActionsTypes.DELETE,
      confirm: "Delete",
      close: "Close"
    };
    this.selectedItem = i;
    $('#confirmModal').modal('show');
  }

  confirm(){
    $('#confirmModal').modal('hide');
    if(this.modal.action==ActionsTypes.DELETE){
      this.carts.splice(this.selectedItem, 1);
      this.updateCart(this.carts);
    }
    if(this.modal.action==ActionsTypes.CHECK_OUT){
      const x = sendParcelData(this.getCart());
      this.confirmSendParcel(x);
    }
  }

  confirmSendParcel(data:SenderInterface[]){
    this._service.post_sendParcel(data)
    .pipe(
      tap((res)=>console.log(res)),
      catchError((e)=>(
        console.log(e),
        EMPTY))
    )
    .subscribe();
  }
}
