import { ICustomer } from "./../../models/customer";
import { CustomerDetailDialogComponent } from "./../customer-detail-dialog/customer-detail-dialog.component";
import { states } from "./../../constants/customer.data";
import { take, takeUntil } from "rxjs/operators";
import { CustomerService } from "./../../services/customer.service";
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import * as _moment from "moment";
import { AlertComponent } from "ngx-bootstrap/alert";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { IfStmt } from "@angular/compiler";
import { Subject } from "rxjs";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerListComponent implements OnInit {
  rows: any[] = [];
  columns: any[] = [];
  alerts: any[] = [];
  states = states;
  bsModalRef: BsModalRef;
  private _unsubscribeAll: Subject<any>;

  @ViewChild("headerTemplate", { static: true })
  public headerTemplate: TemplateRef<any>;
  constructor(
    private translateService: TranslateService,
    private customerService: CustomerService,
    private modalService: BsModalService
  ) {
    // translate.setDefaultLang("en");
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.subscribeToLangChange();
    this.getCustomers();
    this.columns = [
      {
        prop: "id",
        name: "ID",
        width: 100,
        headerTemplate: this.headerTemplate,
      },
      {
        prop: "name",
        name: "FIRST_NAME",
        width: 150,
        headerTemplate: this.headerTemplate,
      },
      {
        prop: "name",
        name: "LAST_NAME",
        width: 150,
        headerTemplate: this.headerTemplate,
      },
      {
        prop: "location",
        name: "LOCATION",
        width: 150,
        headerTemplate: this.headerTemplate,
      },
      {
        prop: "stateName",
        name: "STATE",
        width: 150,
        headerTemplate: this.headerTemplate,
      },
      {
        prop: "active",
        name: "ACTIVE",
        width: 100,
        headerTemplate: this.headerTemplate,
      },
    ];
  }
  subscribeToLangChange() {
    this.customerService.lang$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((lang) => {
        this.translateService.use(lang);
      });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(
      (resp) => {
        if (resp && Array.isArray(resp)) {
          resp = resp.map((d) => {
            d.firstName = d.name.split(" ")[0];
            d.lastName = d.name.split(" ")[1];
            d.stateName = this.states.find((s) => s.abb == d.location).full;
            return d;
          });
        }
        this.rows = resp;
      },
      (err) => {
        this.alerts.push({
          type: "danger",
          msg: `Customer Load Failed. This alert will be closed in 5 seconds.`,
          timeout: 5000,
        });
      }
    );
  }

  postCustomer() {
    let customerObj = {
      firstcustomer: btoa(JSON.stringify(this.rows[0])),
      timestamp: _moment().toISOString(),
    };
    this.customerService
      .postCustomer(customerObj)
      .pipe(take(1))
      .subscribe(
        (resp) => {
          debugger;
          this.alerts.push({
            type: "success",
            msg: `Successfully posted. This alert will be closed in 5 seconds`,
            timeout: 5000,
          });
        },
        (err) => {
          this.alerts.push({
            type: "danger",
            msg: `Something went wrong. This alert will be closed in 5 seconds.`,
            timeout: 5000,
          });
        }
      );
  }
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
  onSelect(event) {
    this.openModalWithComponent(event.selected[0]);
  }
  openModalWithComponent(customer: ICustomer) {
    if (customer.active) {
      const initialState = {
        customer: customer,
      };
      this.bsModalRef = this.modalService.show(CustomerDetailDialogComponent, {
        initialState,
      });
      this.bsModalRef.content.closeBtnName = "Close";
    }
  }
  onActivate(event) {}
  getRowClass = (row) => {
    debugger;
    return {
      disabled: !row.active ? true : false,
    };
  };
}
