import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerListComponent } from "./components/customer-list/customer-list.component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AlertModule } from "ngx-bootstrap/alert";
import { CustomerDetailDialogComponent } from "./components/customer-detail-dialog/customer-detail-dialog.component";
import { ModalModule } from "ngx-bootstrap/modal";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [CustomerListComponent, CustomerDetailDialogComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgxDatatableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
  ],
  entryComponents: [CustomerDetailDialogComponent],
})
export class CustomerModule {}
