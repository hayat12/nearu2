import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumScreen } from './shipping/state/shipping.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'nearu';
  constructor(private router:Router){
  }
  ngOnInit(): void {
    const cart:any = localStorage.getItem(EnumScreen.CART);
    if(!!cart && Object.keys(JSON.parse(cart)).length > 0){
      this.router.navigate(['nearu/parcels']);
    }
  }
}
