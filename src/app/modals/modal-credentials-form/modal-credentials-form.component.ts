import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData { }

@Component({
  selector: 'app-modal-credentials-form',
  templateUrl: './modal-credentials-form.component.html',
  styleUrls: ['./modal-credentials-form.component.scss']
})
export class ModalCredentialsFormComponent {


  credentials: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalCredentialsFormComponent>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.credentials = fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      app: ['', [Validators.required]],
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.credentials.valid) {
      this.dialogRef.close(this.credentials.value);
    }

  }

}
