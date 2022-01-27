import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceService } from 'src/app/services/service.service';
import { UploadProofENUM } from '../state/upload/shipping.enum';

@Component({
  selector: 'app-upload-proof',
  templateUrl: './upload-proof.component.html',
  styleUrls: ['./upload-proof.component.css']
})
export class UploadProofComponent implements OnInit {
  form:FormGroup;
  selectedFile :FileList;
  fileToUpload: File | null = null;
  id:string = "";
  message = "";
  invalidLinke:boolean = false;
  isLoading:boolean=false;
  uploadResult = {
    success: true,
    message: "",
    alertType: ""
  }
  constructor(
    private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    private router:Router,
    private _service:ServiceService) {}

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
      this.message = JSON.stringify(this.form.getRawValue());
      return this.form.markAllAsTouched();
    }
    this.isLoading = true;
    this._service.post_uploadProof(data)
    .pipe(
      tap((res)=>this.isLoading = false),
      tap((res)=>this.router.navigate(['../success'], {relativeTo: this.activateRoute, queryParams:{
        message: "Photo successfully uploaded."
      }})),
      catchError((e)=>{
        return (
          this.uploadResult.success = false,
          this.uploadResult.message = "Upload failed",
          this.isLoading = false,
          EMPTY);
      })
    )
    .subscribe();
  }

  isEmpty(value:any):boolean{
    if (value==null)return true;
    if (value==undefined)return true;
    if (value=="")return true;
    if (value instanceof Array && value.length < 1)return true;
    return false;
  }
}
