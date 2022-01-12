import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingHeader } from '../setting-header';
import { CartInterface } from '../state/parcel/parcels.interface';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.css']
})
export class ParcelsComponent extends SettingHeader implements OnInit {
  carts:CartInterface[] = [];
  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute
  ) { super() }

  ngOnInit(): void {
    this.carts = this.getCart();
  }

  checkOut(){
    this.router.navigate(['./completed'], {relativeTo: this.activateRouter})
  }

  createNew(){
    this.router.navigate(['./sender'], {relativeTo: this.activateRouter})
  }
}
