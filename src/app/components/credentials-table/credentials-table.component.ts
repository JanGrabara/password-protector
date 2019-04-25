import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { map } from 'rxjs/operators';
import { Cipher } from 'src/app/utilis/cipher';

export interface Credential {
  login: string;
  password: string;
}

@Component({
  selector: 'app-credentials-table',
  templateUrl: './credentials-table.component.html',
  styleUrls: ['./credentials-table.component.scss']
})
export class CredentialsTableComponent {

  dataSource: Credential[] = [];
  displayedColumns = ['login', 'password', 'decryptedPassword', 'editAction', 'removeAction'];

  constructor(private appService: AppService) {
    this.appService.currentCredentials
      .pipe(
        map(credentials => {
          credentials = credentials
            .map(c => ({ ...c, decryptedPassword: Cipher.decryptPassword(c.password) }));

          return credentials;
        }))
      .subscribe(credentialsArr => this.dataSource = credentialsArr);
  }

  deleteCredential(credential: Credential) {
    this.appService.removeCredential(credential.password);
  }



  showPassword(credential) {
    alert(credential.password);
   }

  copyCredential(credential: Credential) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = credential.password;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
