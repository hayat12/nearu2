import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { SettingHeader } from '../setting-header';
import { UploadProofENUM } from '../state/shipping.enum';
import { UploadProofInterface } from '../state/upload/upload-proof.interface';

@Component({
  selector: 'app-upload-proof',
  templateUrl: './upload-proof.component.html',
  styleUrls: ['./upload-proof.component.css']
})
export class UploadProofComponent extends SettingHeader implements OnInit {
  selectedFile :FileList;
  fileToUpload: File | null = null;
  id:string = "";
  invalidLinke:boolean = false;
  uploadResult = {
    success: true,
    message: "",
    alertType: ""
  }
  constructor(
    private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    private router:Router,
    private _service:ServiceService) {
    super();
  }

  createForm(){
    this.form = this.fb.group(
      {
        fileFormat: [null, [Validators.required]],
        fileName: [null, [Validators.required]],
        fileData: [null, [Validators.required]],
        uploadType: [UploadProofENUM.PROOF]
      }
    );
    const fileName = this.activateRoute.snapshot.queryParams.filename;
    if (this.isEmpty(fileName)) {
      this.invalidLinke = true;
    }
    this.id = this.activateRoute.snapshot.queryParams.id;
    this.form.get("fileName")?.patchValue(fileName);
  }

  ngOnInit(): void {this.createForm();}

  handleFileInput(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let fileType = file.type;
      if(!this.isEmpty(fileType)){
        fileType = fileType.split("/") as [];
        if(fileType.length > 0){
          fileType = fileType.at(-1);
        }
      }
      this.form.get("fileFormat")?.patchValue(fileType);
      let fileData;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (){
        fileData = reader.result;
      };
      setTimeout(() => {
        var bs64img:any = reader.result;
        bs64img = bs64img.split(",");
        bs64img = bs64img[1];
        this.form.get("fileData")?.patchValue(bs64img);
        if (this.form.valid) {
          this.uploadResult.success = true;
        }
      }, 100);

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  upload(){
    const data = this.form.getRawValue();
    if (this.form.invalid) {
      this.uploadResult.success = false;
      this.uploadResult.message = "Please select the file before upload";
      this.uploadResult.alertType = "alert alert-danger";
      return this.form.markAllAsTouched();
    }
    this._service.post_uploadProof(data)
    .pipe(
      tap((res)=>console.log()),
      tap((res)=>this.router.navigate(['../completed'], {relativeTo: this.activateRoute, queryParams:{
        message: "Photo successfully uploaded."
      }}))
    )
    .subscribe();
  }

}
