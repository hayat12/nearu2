import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { SettingHeader } from '../setting-header';
import { senderInfo } from '../state/sender/sender';
import { SelectListInterface } from '../state/shipping.interface';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent extends SettingHeader implements OnInit {
  countries:SelectListInterface[] = [];
  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
    private fb:FormBuilder,
    private _service: ServiceService
    ) { super(); }

    ngOnInit(): void {
      this.createForm();
      this.getCountries();
      this.loadLocalData();
  }

  loadLocalData(){
    const sender = this.getSender();
    if(!this.isEmpty(sender)){
      this.form.patchValue(
        {
          ...sender
        }
      );
    }
  }


  getCountries(){
    this._service.get_countries()
    .pipe(
      tap((res)=>this.countries = res)
    )
    .subscribe();
  }


  createForm(){
    this.form = this.fb.group(
      {
        shipperName: ["", [Validators.required]],
        shipperContact: [null, [Validators.required]],
        shipperEmail: [null, [Validators.required]],
        shipperAddress1: [null, [Validators.required]],
        shipperAddress2: [null],
        shipperCity: [null, [Validators.required]],
        shipperPostcode: [null, [Validators.required]],
        shipperState: [null],
        shipperCountryCode: [null, [Validators.required]],
      }
    );
  }

  toReceiver(){
    if(this.form.invalid){
      return this.form.markAllAsTouched();
    }
    const data = senderInfo(this.form.getRawValue());
    this.setSender(data);
    this.router.navigate(['../receiver'], {relativeTo: this.activateRouter})
  }
}
