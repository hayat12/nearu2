import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
      this.form.get("fileData")?.patchValue(file);
      this.form.get("fileName")?.patchValue(fileName);
      this.form.get("fileFormat")?.patchValue(fileType);
    }
  }

  upload(){
    // const formData = new FormData();
    const data = this.form.getRawValue();
    this._service.post_uploadProof(data).subscribe();
  }

}
