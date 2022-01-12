import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingHeader } from '../setting-header';
import { senderInfo } from '../state/sender/sender';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent extends SettingHeader implements OnInit {
  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
    private fb:FormBuilder
    ) { super(); }

    ngOnInit(): void {
      this.createForm();
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
