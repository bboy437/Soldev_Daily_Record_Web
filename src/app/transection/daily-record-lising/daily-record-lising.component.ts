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
import { DailyRecordDialgComponent } from "./dialog/daily-record-dialg/daily-record-dialg.component";
import { IAPIResponse } from '../../interfaces/apiResponse';

@Component({
  selector: 'app-daily-record-lising',
  templateUrl: './daily-record-lising.component.html',
  styleUrls: ['./daily-record-lising.component.scss']
})
export class DailyRecordLisingComponent implements OnInit {

  isLoadingResults = true;
  objarrProductionOrderListing: any = {};
  objarrYear: any = [];
  objarrMonth: any = [];

  numYearSelected: number;
  numMonthSelected: number;
  dataSource = new MatTableDataSource();
  resourcesLoaded: boolean = true;
  displayedColumns = [
    "wokingDate",
    "customerName",
    "projectName",
    "activityName",
    "workingDuration",
    "actions"
  ];

  objRowSelected: DailyRecord;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty("detailRow");
  expandedElement: any;

  private UrlAPI_ProductGetAll: string = "Product/GetAll";
  private UrlAPI_GetListByMonth: string =
    "DailyRecord/GetListByMonth/";
  private Url_Detail: string = "/auth/transaction/daily-record-lising";
  arrobjDailyRecord: any = {};
  private UrlAPI_Delete: string = "DailyRecord/Delete";
  objRow: any = {};
  objAPIResponse: any = {};


  constructor(
    private brokerAPIService: BrokerAPIService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.dataSource.filterPredicate = function (data: DailyRecord, filter): boolean {
      return data.project.projectName.toLowerCase().includes(filter)
        || data.activity.activityName.toLowerCase().includes(filter)
        || data.wokingDate.toString().includes(filter)
        || data.workingDuration.toString().includes(filter);

    };

    this.showdata();
  }

  private showdata() {
    this.setYear();
    this.setMonth();
    this.getDailyRecord();

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
      .get(this.UrlAPI_GetListByMonth +
        this.numYearSelected +
        "," +
        this.numMonthSelected)
      .subscribe(data => {
        console.log(data);
        this.dataSource.data = data;
        this.arrobjDailyRecord = data;
        this.isLoadingResults = false;
      });
  }

  btnNewClick() {
    const dialogRef = this.dialog.open(DailyRecordDialgComponent, {
      // this.router.navigate([this.Url_Detail, { id: "new"}]);
      // data: null,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDailyRecord();
      if (result != undefined) {
        if (result.process != undefined) {
        }
      }
    });
  }


  rowClicked(row: any): void {

    //  this.objorderItems = this.arrobjDailyRecord.id.find(x => x.id === row);
    const dialogRef = this.dialog.open(DailyRecordDialgComponent, {

      data: this.objRowSelected = <DailyRecord>row,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDailyRecord();
      if (result != undefined) {
        if (result.process != undefined) {
        }
      }
    });
  }


  deleteItem(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      // data: {id: id, title: title, state: state, url: url}
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        console.log("this.arrobjPrivilege",this.arrobjDailyRecord);
        console.log("id",id);

        let objdelete = this.arrobjDailyRecord.find(
          x => x.id === id
        );
   
        console.log("objdelete",objdelete);

        this.brokerAPIService.post(this.UrlAPI_Delete, objdelete).subscribe(
          data => {
            this.objAPIResponse = <IAPIResponse>data;
            if (this.objAPIResponse.success) {
              this.router.navigate(['/auth/transection/daily-record-lising']);
              this.showdata();
            }
            else {
              console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);

            }
          });
      }
    });
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
