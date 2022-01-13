import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingHeader } from '../setting-header';
import { CartInterface, ConfirmationModalInterface } from '../state/parcel/parcels.interface';
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
    private activateRouter:ActivatedRoute
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
    }
  }
}
