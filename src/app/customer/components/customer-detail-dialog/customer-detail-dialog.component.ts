import { ICustomer } from "./../../models/customer";
import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-customer-detail-dialog",
  templateUrl: "./customer-detail-dialog.component.html",
  styleUrls: ["./customer-detail-dialog.component.scss"],
})
export class CustomerDetailDialogComponent implements OnInit {
  customer: ICustomer = null;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    debugger;
  }
}
