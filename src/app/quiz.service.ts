import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getData(set){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get("http://localhost/codeigniter/ci-php-webapi/index.php/pages/fetchQuiz/"+set,{responseType: 'text'})
  }

  getSet(){
    return this.http.get("http://localhost/codeigniter/ci-php-webapi/index.php/pages/fetchSet", {responseType: 'text'})
  }
  
}
