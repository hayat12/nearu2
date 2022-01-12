import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingHeader } from '../setting-header';
import { parcelDetails } from '../state/parcel/parcels';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.css']
})
export class ParcelDetailsComponent extends SettingHeader implements OnInit {

  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
    private fb:FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.loadLocalData();
  }

  loadLocalData(){
    const parcelDetails = this.getParcelDetails();
    if(!this.isEmpty(parcelDetails)){
      this.form.patchValue(
        {
          ...parcelDetails
        }
      );
    }
  }

  createForm(){
    this.form = this.fb.group(
      {
        width: [null, [Validators.required]],
        length: [null, [Validators.required]],
        height: [null, [Validators.required]],
        weight: [null, [Validators.required]],
      }
    );
  }

  toParceOptions(){
    if(this.form.invalid){
      return this.form.markAllAsTouched();
    }
    this.setParcelDetails(parcelDetails(this.form.getRawValue()));
    this.router.navigate(['../courier-service-options'], {relativeTo: this.activateRouter});
  }
  toReceiver(){
    this.router.navigate(['../receiver'], {relativeTo: this.activateRouter});
  }

}
