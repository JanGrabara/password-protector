import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalCredentialsFormComponent } from './modals/modal-credentials-form/modal-credentials-form.component';
import { AppService } from './app.service';
import { Cipher } from './utilis/cipher';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  cipherValue = 'HELLOWORLD';

  constructor(public dialog: MatDialog, private app: AppService) { }


  openCredentialsAddModal() {
    const dialogRef = this.dialog.open(ModalCredentialsFormComponent, {
      width: '500px'
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(credentials => {


      if (credentials) {

        const encryptedPassword = Cipher.encryptPassword(credentials.password);

        console.log(encryptedPassword, 'passwrod');

        const encryptedCredential = { login: credentials.login, password: encryptedPassword, app: credentials.app };

        this.app.addCredential(encryptedCredential);
        console.log('The dialog was closed', encryptedCredential);
      }

    });
  }

}


