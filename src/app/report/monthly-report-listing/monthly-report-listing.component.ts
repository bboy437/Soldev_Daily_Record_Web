import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { BrokerAPIService } from "../../services/brokerapi.service";
import "rxjs/add/operator/map";
import { Customer, Project, Activity, DailyRecord, GetAllActive } from '../../interfaces/apisddrrecord';
import { Observable } from "rxjs/Observable";
import { ConfirmDeleteDialogComponent } from "../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import { MessageDialogComponent } from "../../dialogs/message-dialog/message-dialog.component";

import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog
} from "@angular/material";
import { Router } from "@angular/router";
import { IAPIResponse } from '../../interfaces/apiResponse';

@Component({
  selector: 'app-monthly-report-listing',
  templateUrl: './monthly-report-listing.component.html',
  styleUrls: ['./monthly-report-listing.component.scss']
})
export class MonthlyReportListingComponent implements OnInit {

  isLoadingResults = true;
  objarrProductionOrderListing: any = {};
  objarrYear: any = [];
  objarrMonth: any = [];

  numYearSelected: number;
  numMonthSelected: number;
  dataSource = new MatTableDataSource();
  resourcesLoaded: boolean = true;
  displayedColumns = [
    "employeeName",
    "totalWorkingDay",
    "undifineWorkingDay"
,
  ];

  objRowSelected: DailyRecord;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty("detailRow");
  expandedElement: any;

  private UrlAPI_ProductGetAll: string = "Product/GetAll";
  // private UrlAPI_GetAllMonthlyReport: string =
  //   "Report/GetAllMonthlyReport/";
    private UrlAPI_GetAllMonthlyReport: string =
    "Report/GetWorkingDayOnMonthly/";
  private Url_Detail: string = "/auth/report/monthly-report-detail";
  arrobjDailyRecord: any = [];
  private UrlAPI_Delete: string = "DailyRecord/Delete";
  objRow: any = {};
  objAPIResponse: any = {};


  constructor(
    private brokerAPIService: BrokerAPIService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.showdata();
  }

  private showdata() {
    this.setYear();
    this.setMonth();
    this.getDailyRecord();

    // console.log("numMonthSelected", this.numMonthSelected);
    // console.log("numYearSelected", this.numYearSelected);

  }

  setYear() {
    var year = new Date();
    this.numYearSelected = year.getFullYear();
    for (let index = 0; index < 11; index++) {
      if (index != 0) {
        year.setFullYear(year.getFullYear() - 1);
      }

      this.objarrYear.push({ year: year.getFullYear() });
    }
    //console.log(this.objarrYear);
  }

  setMonth() {
    var month = new Date();
    this.numMonthSelected = month.getMonth() + 1;
    for (let index = 0; index < 12; index++) {
      month.setMonth(index, 15);
      this.objarrMonth.push({ month: month.getMonth() + 1 });
    }
    //console.log(this.objarrMonth);
  }

  MonthChange(monthdata) {
    this.numMonthSelected = monthdata;
    this.getDailyRecord();
  }

  YearChange(yeardata) {
    this.numYearSelected = yeardata;
    this.getDailyRecord();
  }


  private getDailyRecord() {
    this.isLoadingResults = true;
    this.brokerAPIService
      .get(this.UrlAPI_GetAllMonthlyReport + this.numYearSelected + "," + this.numMonthSelected).subscribe(
        data => {
          this.dataSource.data = data;
          this.arrobjDailyRecord = data;
          console.log("data", data);
          console.log("this.arrobjDailyRecord", this.arrobjDailyRecord);
          this.isLoadingResults = false;
        });
  }

  btnPrintClick() {
    this.router.navigate([this.Url_Detail, {
      numMonthSelected: this.numMonthSelected,
      numYearSelected: this.numYearSelected
    }]);

    // console.log("numMonthSelected", this.numMonthSelected);
    // console.log("numYearSelected", this.numYearSelected);
    console.log("arrobjDailyRecord", { id: this.arrobjDailyRecord })


  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}