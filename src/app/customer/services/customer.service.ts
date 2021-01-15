import { customers } from "./../constants/customer.data";
import { ICustomer } from "./../models/customer";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { take, map, catchError } from "rxjs/operators";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  endpoint = environment.api;
  customers = customers;
  private language = new BehaviorSubject<string>("en");
  lang$ = this.language.asObservable();
  constructor(private http: HttpClient) {}

  changeLang(lang: string) {
    this.language.next(lang);
  }
  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(`${this.endpoint}/customers`).pipe(
      take(1),
      map((resp) => resp),
      catchError((err) => of(this.customers))
    );
  }

  postCustomer(customer: { firstcustomer: string; timestamp: string }) {
    let headers = new HttpHeaders();
    headers = headers
      .set("Content-Type", "application/json; charset=utf-8")
      .set("x-client-id", "12345");
    return this.http.post(`${this.endpoint}/customer`, customer, {
      headers: headers,
    });
  }
}
