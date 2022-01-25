import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingHeader } from '../setting-header';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent extends SettingHeader implements OnInit {
  message = "";
  constructor(
    private activateRoute:ActivatedRoute
  ) { super()}

  ngOnInit(): void {
   var x:any = document.querySelector("#messge");
   this.message = this.activateRoute.snapshot.queryParams.message;
   if(this.isEmpty(this.message)){
     this.message = "Please proceed to the counter <br> and provide the sender's contact no.";
   }
   x.innerHTML = this.message;
  }

}
