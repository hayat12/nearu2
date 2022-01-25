import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  uploadResult = {
    success: true,
    message: "",
    alertType: ""
  }
  constructor(
    private fb:FormBuilder,
    private _service:ServiceService) {
    super();
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group(
      {
        fileFormat: [""],
        fileName: [""],
        fileData: [""],
        uploadType: [UploadProofENUM.PROOF],
        x1: 20,
        y1: 20,
        x2: 20,
        y2: 20
      }
    );
  }

  ngOnInit(): void {}

  handleFileInput(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let fileName = file.name;
      let fileType = file.type;
      if(!this.isEmpty(fileType)){
        fileType = fileType.split("/") as [];
        if(fileType.length > 0){
          fileType = fileType.at(-1);
        }
      }
      if(!this.isEmpty(fileName)){
        fileName = fileName.split(".") as [];
        if(fileName.length > 0){
          fileName = fileName.at(0);
        }
      }
      this.form.get("fileName")?.patchValue(fileName);
      this.form.get("fileFormat")?.patchValue(fileType);
      let fileData;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (){
        fileData = reader.result;
      };
      setTimeout(() => {
        // console.log(reader.result);
        this.form.get("fileData")?.patchValue(reader.result);
      }, 100);

      // reader.onerror = function (error) {
      //   console.log('Error: ', error);
      // };
    }
  }

  upload(){
    const data = this.form.getRawValue();
    if (this.form.invalid) {
      this.uploadResult.success = false;
      this.uploadResult.message = "Please select the file before upload";
      this.uploadResult.alertType = "alert alert-danger";
    }
    console.log(data);
    this._service.post_uploadProof(data)
    .pipe(
      tap((res)=>console.log()),
      tap((res)=>console.log())
    )
    .subscribe();
  }

}
