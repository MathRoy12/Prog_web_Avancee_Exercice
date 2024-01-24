import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {LoginDTO, RegisterDTO} from "./DTO";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Anular';
  domain:string = "https://localhost:7235/api"

  constructor(private http:HttpClient) {
  }

  async Register(){
    let res  = await lastValueFrom(this.http.post<any>(this.domain + "/Users/Register",new RegisterDTO()))
    console.log(res)
  }

  async Login(){
    let res  = await lastValueFrom(this.http.post<any>(this.domain + "/Users/Login",new LoginDTO()))
    console.log(res)
  }

  async Logout(){
    let res  = await lastValueFrom(this.http.get<any>(this.domain + "/Users/Logout"))
    console.log(res)
  }

  async PublicRequest(){
    let res  = await lastValueFrom(this.http.get<any>(this.domain + "/Users/PublicData"))
    console.log(res)
  }

  async PrivateRequest(){
    console.log("TEST");
    let url = this.domain + "/Users/PrivateData";
    console.log(url);
    let res  = await lastValueFrom(this.http.get<any>(url))
    console.log(res)
  }
}
