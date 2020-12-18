import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { IModelUser } from '../interfaces/i-user-model';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private http: HttpClient) { }
  uploadForm = new FormGroup({
    file: new FormControl(''),
    fileSource: new FormControl('')
  });

  srcImage:string = "";

  ngOnInit(): void {
  }

  onFileChange(event: any){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      console.log(file);
      this.uploadForm.patchValue({
        fileSource:file
      });
      console.log(this.uploadForm.controls.fileSource);
    }
  }

  onSubmitUploadImage(){
    const formData: any = new FormData();
    formData.append("file", this.uploadForm.controls.fileSource.value);

    this.http.post<IModelUser>('http://localhost:8080/user/upload', formData).subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(error);
     }
    )
  }
}
