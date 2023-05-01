import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }

  getUserData(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/app/get')
  }

  addUserData(body: User): Observable<any> {
    return this.httpClient.post('http://localhost:8080/app/post', body)
  }

  removeUserData(id:number) : Observable<any>{
    return this.httpClient.delete('http://localhost:8080/app/delete/'+ id)
  }

  updateUserData(id: number, body: any): Observable<any> {
    return this.httpClient.put("http://localhost:8080/app/put/"+id, body);
  }

  private userSource = new BehaviorSubject(new User());
  currentUser = this.userSource.asObservable();

  changeUser(user: User) {
    this.userSource.next(user)
  }

 
}
