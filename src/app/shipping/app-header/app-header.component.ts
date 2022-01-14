import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingHeader } from '../setting-header';
import { EnumScreen } from '../state/shipping.enum';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent extends SettingHeader implements OnInit {
  @Input() title: string = "Nearu";

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event:any) {
    const carts = this.getCart();
    if(Object.keys(carts).length < 1){
      this.resetLoacalStorage();
    }else{
      this.clearInfo();
      localStorage.removeItem((EnumScreen.SENDER));
    }
  }

  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
  ) { super() }

  ngOnInit(): void {}

  get cartCount():number{
    if(Object.keys(this.getCart().length > 0)){
      return this.getCart().length;
    }
    return 0;
  }
  viewCart(){
    this.router.navigate(['../parcels'], {relativeTo:this.activateRouter});
  }
}
