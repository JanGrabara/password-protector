import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Credential } from './components/credentials-table/credentials-table.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  credentialsSubject = new BehaviorSubject<Credential[]>([]);

  constructor() {


    const credentials = localStorage.getItem('credentialsArr');
    console.log(localStorage.getItem('credentialsArr'), 'before');

    if (credentials) {
      const credentialsArr = JSON.parse(credentials);
      console.log(credentialsArr, 'ARR');
      this.credentialsSubject.next(credentialsArr);
    } else {
      localStorage.setItem('credentialsArr', '[]');
      console.log(localStorage.getItem('credentialsArr'), 'after');
      this.credentialsSubject.next([]);
    }

  }


  get currentCredentials() {
    return this.credentialsSubject.asObservable();
  }

  get credentialsArr(): Credential[] {
    return JSON.parse(localStorage.getItem('credentialsArr'));
  }

  updateCredentials(credentialsArr) {
    this.credentialsSubject.next(credentialsArr);
  }

  removeCredential(passwd: string) {
    console.log(this.credentialsArr, 'arr');
    const updatedCredentials = this.credentialsArr.filter(c => c.password !== passwd);
    localStorage.setItem('credentialsArr', JSON.stringify(updatedCredentials));
    this.updateCredentials(updatedCredentials);
  }

  addCredential(credential: Credential) {
    console.log(this.credentialsArr, 'arr');
    const updatedCredentials = [...this.credentialsArr, credential];
    localStorage.setItem('credentialsArr', JSON.stringify(updatedCredentials));
    this.updateCredentials(updatedCredentials);
  }

}
