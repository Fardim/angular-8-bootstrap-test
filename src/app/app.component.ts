import { CustomerService } from "./customer/services/customer.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "angular-bootstrap-test";
  languages: any[] = [
    {
      key: "en",
      language: "English",
    },
    { key: "de", language: "German" },
  ];

  constructor(private customerService: CustomerService) {}
  setLang(lang) {
    if (lang) {
      this.customerService.changeLang(lang);
    }
  }
}
