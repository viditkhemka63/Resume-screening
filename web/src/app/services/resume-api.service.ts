import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface Config {
  skills: any[];
  result: any[];
  Experience: any[];
}


@Injectable({
  providedIn: 'root'
})
export class ResumeAPIService {

  uri = 'http://localhost:3000';
  uri2 = 'http://127.0.0.1:5000/'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.uri}/getAll`);
  }

  predict(data){
    return this.http.post<Config>(`${this.uri2}`, data)
  }
}
