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
  form: FormGroup;
  selectedFile: FileList;
  fileToUpload: File | null = null;
  id: string = "";
  message = "";
  invalidLinke: boolean = false;
  isLoading: boolean = false;
  uploadResult = {
    success: true,
    message: "",
    alertType: ""
  }

  width = 100;
  height = 100;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _service: ServiceService) { }

  createForm() {
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

  ngOnInit(): void { this.createForm(); }

  handleFileInput(event: any) {
    const img = new Image();

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      let fileType = file.type;
      if (!this.isEmpty(fileType)) {
        fileType = fileType.split("/") as [];
        if (fileType.length > 0) {
          fileType = fileType[1]
        }
      }

      this.form.get("fileFormat")?.patchValue(fileType);
      let fileData: any;
      let resizedFileData: any;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (event) {
        fileData = reader.result;
        const imgElement: any = document.createElement("img");
        imgElement.src = event.target?.result;

        imgElement.onload = function (e: any) {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1280;
          const MAX_HIDTH = 1280;
          console.log("------ Original Dimensions --------");
          console.log("H:", e.target.height, "X W:", e.target.width);
          console.log("------ end --------");
          if (e.target.width > MAX_WIDTH || e.target.height > MAX_HIDTH) {
            if (e.target.width >= e.target.height) {
              const scaleSize = MAX_WIDTH / e.target.width;
              canvas.width = MAX_WIDTH;
              canvas.height = e.target.height * scaleSize;
            } else {
              const scaleSize = MAX_HIDTH / e.target.height;
              canvas.height = MAX_HIDTH;
              canvas.width = e.target.width * scaleSize;
            }
            console.log("------ Resized Dimensions --------");
            console.log(canvas.height, "X", canvas.width);
            console.log("------ end --------");
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(e.target, 0, 0, canvas.width, canvas.height);
            const srcEncoded = ctx?.canvas.toDataURL(e.target, "image/jpeg");
            resizedFileData = srcEncoded;
          } else {
            resizedFileData = fileData;
          }
          var demo_img: any = document.querySelector("#demo-img");
          demo_img.src = resizedFileData;
        }
      };

      setTimeout(() => {
        var bs64img: any = resizedFileData;
        bs64img = bs64img.split(",");
        bs64img = bs64img[1];
        this.form.get("fileData")?.patchValue(bs64img);
        if (this.form.valid) {
          this.uploadResult.success = true;
        }
      }, 200);

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  upload() {
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
        tap((res) => this.isLoading = false),
        tap((res) => this.router.navigate(['../success'], {
          relativeTo: this.activateRoute, queryParams: {
            message: "Photo successfully uploaded."
          }
        })),
        catchError((e) => {
          return (
            this.uploadResult.success = false,
            this.uploadResult.message = "Upload failed",
            this.isLoading = false,
            EMPTY);
        })
      )
      .subscribe();
  }

  isEmpty(value: any): boolean {
    if (value == null) return true;
    if (value == undefined) return true;
    if (value == "") return true;
    if (value instanceof Array && value.length < 1) return true;
    return false;
  }
}
