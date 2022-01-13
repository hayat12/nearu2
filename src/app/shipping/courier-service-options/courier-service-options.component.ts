import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingHeader } from '../setting-header';
import { courierServiceData } from '../state/  courier/courier-service';
import { CourierInterface } from '../state/  courier/courier.interface';

@Component({
  selector: 'app-courier-service-options',
  templateUrl: './courier-service-options.component.html',
  styleUrls: ['./courier-service-options.component.css']
})
export class CourierServiceOptionsComponent extends SettingHeader implements OnInit {
  _selectedCourier: any = "";
  courierServiceList = [
    {
      "businessId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "businessName": "eFMX",
      "businessLogo": "assets/images/logo.png",
      "amount": 10,
      "taxAmount": 4
    },
    {
      "businessId": "3fa85f64-5717-4562-bsewwdcas-23f66afa6",
      "businessName": "FEDX",
      "businessLogo": "assets/images/logo.png",
      "amount": 101,
      "taxAmount": 41
    },
    {
      "businessId": "asdadaf3-5717-4562-b3fc-2c963f66afa6",
      "businessName": "Ninja",
      "businessLogo": "assets/images/logo.png",
      "amount": 21,
      "taxAmount": 5
    }
  ];
  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private fb: FormBuilder
  ) { super() }

  ngOnInit(): void {
    this.createFrom();
    this.loadCourierData();
  }

  loadCourierData(){
    const courier = this.getCourierDetails();
    if(!this.isEmpty(courier)){
      this.form.patchValue(
        {
          ...courier
        }
      );
      this._selectedCourier = courier?.businessId;
    }
  }

  createFrom() {
    this.form = this.fb.group(
      {
        "businessId": [null, [Validators.required]],
        "businessName": [null, [Validators.required]],
        "businessLogo": [null],
        "amount": [null ],
        "taxAmount": [null ]
      }
    );
  }

  toParceDetails() {
    this.router.navigate(['../parcel-details'], { relativeTo: this.activateRouter });
  }

  async confrim(){
    if (this.isEmpty(this._selectedCourier)) {
      return;
    }
    const courier = courierServiceData(this.form.getRawValue());
    await this.setCourierDetails(courier);
    await this.setCart();
    this.router.navigate(['../'], { relativeTo: this.activateRouter });
  }

  selectedCourier(courier: CourierInterface) {
    this._selectedCourier = courier.businessId;
    this.form.patchValue(
      {
        ...courier
      }
    )
  }
}
