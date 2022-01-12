import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingHeader } from '../setting-header';
import { receiverInfo } from '../state/receiver/receiver';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent extends SettingHeader implements OnInit {
  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
    private fb:FormBuilder
  ) { super()}

  ngOnInit(): void {
    this.createForm();
    this.loadLocalData();
}

loadLocalData(){
  const receiver = this.getReceiver();
  if(!this.isEmpty(receiver)){
    this.form.patchValue(
      {
        ...receiver
      }
    );
  }
}

createForm(){
  this.form = this.fb.group(
    {
      receiverName: [null, [Validators.required]],
      receiverContact: [null, [Validators.required]],
      receiverEmail: [null, [Validators.required]],
      receiverAddress1: [null, [Validators.required]],
      receiverAddress2: [null],
      receiverCity: [null, [Validators.required]],
      receiverPostcode: [null, [Validators.required]],
      receiverState: [null],
      receiverCountryCode: [null, [Validators.required]],
    }
  );
}

  toParceDetials(){
    if(this.form.invalid){
      return this.form.markAllAsTouched();
    }
    this.setreceiver(receiverInfo(this.form.getRawValue()));
    this.router.navigate(['../parcel-details'], {relativeTo:this.activateRouter})
  }

  toSender(){
    this.router.navigate(['../sender'], {relativeTo:this.activateRouter})
  }
}
