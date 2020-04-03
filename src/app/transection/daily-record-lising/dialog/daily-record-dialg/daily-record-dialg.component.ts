import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, ElementRef, Renderer2 } from '@angular/core';

import { BrokerAPIService } from '../../../../services/brokerapi.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IAPIResponse } from '../../../../interfaces/apiResponse';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, mixinDisabled, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Customer, Project, GetAllActive, DailyRecord, Activity } from '../../../../interfaces/apisddrrecord';
import { getLocaleDateTimeFormat } from '@angular/common';
import { DATEPICKER_HELPERS } from '../../../../material-widgets/datepicker/helpers.data';
import { isDate } from '@swimlane/ngx-charts/release/utils';
import { MatSnackBar, MatDialog, MatDialogRef, VERSION, MAT_DIALOG_DATA, } from "@angular/material";
import { MessageDialogComponent } from '../../../../dialogs/message-dialog/message-dialog.component';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { Moment } from "moment";


export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-daily-record-dialg',
  templateUrl: './daily-record-dialg.component.html',
  styleUrls: ['./daily-record-dialg.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DailyRecordDialgComponent implements OnInit {
  date = new FormControl(new Date());
  version = VERSION;
  dialogRef1: MatDialogRef<MessageDialogComponent>;
  private RowID: Number;
  objRow: any = {};
  objAPIResponse: any = {};
  arrobjProject: any = [];
  arrobjActivity: any = [];
  arrobjDailyRecord: any = [];
  wokingDate: Moment = moment();

  private UrlAPI_Create: string = "DailyRecord/Create";
  private UrlAPI_Update: string = "DailyRecord/Update";
  private UrlAPI_Delete: string = "DailyRecord/Delete";
  private UrlAPI_GetAllProject: string = "Project/GetAll";
  private UrlAPI_GetAllActivity: string = "Activity/GetAll";
  private UrlAPI_GetSingleRow: string = "DailyRecord/Get/";


  constructor(
    public dialogRef: MatDialogRef<DailyRecordDialgComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDailyRecord: DailyRecord,
    // @Inject(MAT_DIALOG_DATA) private data: { id: string }, 
    private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private el: ElementRef,
    private renderer: Renderer2
  ) {

  }


  ngOnInit() {

    // this.el.nativeElement.value = parseFloat(this.el.nativeElement.value).toFixed(2)
    this.objRow.workingDuration = parseFloat(this.objRow.workingDuration).toFixed(2)
    this.GetProject();
    this.GetActivity();
    // this.objRow.wokingDate = new Date().toISOString().substring(0, 10);
    this.objRow.wokingDate = this.wokingDate.format("YYYY-MM-DDTHH:mm:ss");
    this.wokingDate = moment(this.objRow.wokingDate);
    // this.RowID = this.dataDailyRecord.id;

    if (this.dataDailyRecord == null) {

    }
    else {
      this.brokerAPIService.get(this.UrlAPI_GetSingleRow + this.dataDailyRecord.id).subscribe(
        data => {
          this.objRow = <DailyRecord>data;
          this.wokingDate = moment(this.objRow.wokingDate);

          console.log("dataDailyRecord", this.dataDailyRecord.id);
          console.log("this.objRow", this.objRow);
        }
      );
    }



  }


  GetProject() {
    this.brokerAPIService.get(this.UrlAPI_GetAllProject).subscribe(
      data => {
        this.arrobjProject = <Project>data;
        console.log(" this.arrobjProject", this.arrobjProject);
      }
    );
  }

  GetActivity() {
    this.brokerAPIService.get(this.UrlAPI_GetAllActivity).subscribe(
      data => {
        this.arrobjActivity = <Activity>data;
        console.log(" this.arrobjActivity", this.arrobjActivity);

      }
    );
  }


  setTwoNumberDecimal($event) {
    $event.target.value = parseFloat($event.target.value).toFixed(2);
    this.objRow.workingDuration = $event.target.value
  }

  vilidate() {

    let strValidate: string = "";
    // if (this.objRow.wokingDate != this.wokingDate.format("YYYY-MM-DDTHH:mm:ss") || this.objRow.wokingDate== undefined || this.objRow.wokingDate == null) {
    //   strValidate = "Woking Date";
    // }
    // if (strValidate != "") {
    //   this.showDialog("error", "Error", strValidate);
    //   return false;
    // }


    if (this.objRow.projectId == undefined || this.objRow.projectId == null) {
      strValidate = "Project Name";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    }

    if (this.objRow.activityId == undefined || this.objRow.activityId == null) {
      strValidate = "Activity Name";
    }
    if (strValidate != "") {
      this.showDialog("error", "Error", strValidate);
      return false;
    }

    // if (this.objAPIResponse.success == false 
    //  ) {
    //   strValidate = "Working Duration";
    // }
    // if (strValidate != "") {
    //   this.showDialog("error", "Error", strValidate);
    //   return false;
    // }
     {
      return true;
    }

  }



  btnSaveClick() {
    if (this.vilidate()) {
      this.Save();
    }

  }


  btnSaveNewClick() {

    if (this.vilidate()) {
      this.saveNew();
    }


  }

  Save() {

    console.log("save");
    console.log(this.objRow);
    this.objRow.wokingDate = this.wokingDate.format("YYYY-MM-DDTHH:mm:ss");
    this.objRow.createBy = localStorage.getItem('userName');
    this.objRow.updateBy  = localStorage.getItem('userName');


    if (this.dataDailyRecord == null) {
      //Create

      this.brokerAPIService.post(this.UrlAPI_Create, this.objRow).subscribe(
        data => {
          console.log(this.UrlAPI_Create, this.objRow);
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {
            this.showSnackBar("Save Complete");
            this.dialogRef.close();
          }
          else {
            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
            this.dialogRef1 = this.dialog.open(MessageDialogComponent, {
              width: '300px', height: '200px',
              data: {
                Messagetype: "error",
                Messagetitle: "Error",
                Messagebody: "Working Duration"
              },
              disableClose: true
            });
          }
        },
        err => {
          // กรณี error
          console.log('Something went wrong!');
        });
    }
    else {

      this.brokerAPIService.post(this.UrlAPI_Update, this.objRow).subscribe(
        data => {
          console.log(this.UrlAPI_Create, this.objRow);
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {

            this.showSnackBar("Save Complete");
            this.dialogRef.close();
          }
          else {
            this.dialogRef1 = this.dialog.open(MessageDialogComponent, {
              width: '300px', height: '200px',
              data: {
                Messagetype: "error",
                Messagetitle: "Error",
                Messagebody: "Working Duration"
              },
              disableClose: true
            });

          }
        },
        err => {
          // กรณี error
          console.log('Something went wrong!');
        });
    }

  }


  saveNew() {

    console.log("save");
    console.log(this.objRow);
    this.objRow.wokingDate = this.wokingDate.format("YYYY-MM-DDTHH:mm:ss");
    this.objRow.createBy = localStorage.getItem('userName');
    this.objRow.updateBy  = localStorage.getItem('userName');

    if (this.dataDailyRecord == null) {
      //Create

      this.brokerAPIService.post(this.UrlAPI_Create, this.objRow).subscribe(
        data => {
          console.log(this.UrlAPI_Create, this.objRow);
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {

            this.showSnackBar("Save Complete");

            // this.objRow.projectId = "";
            // this.objRow.activityId = "";
            this.objRow.wokingDate = this.wokingDate.format("YYYY-MM-DDTHH:mm:ss");
            // this.objRow.workingDuration = "";
            this.objRow.createBy = "";
            this.objRow.updateBy = "";
            // this.objRow.id = "";
          }
          else {
            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
            this.dialogRef1 = this.dialog.open(MessageDialogComponent, {
              width: '300px', height: '200px',
              data: {
                Messagetype: "error",
                Messagetitle: "Error",
                Messagebody: "Working Duration"
              },
              disableClose: true
            });
          }
        },
        err => {
          // กรณี error
          console.log('Something went wrong!');
        });
    }
    else {

      this.brokerAPIService.post(this.UrlAPI_Update, this.objRow).subscribe(
        data => {
          this.objAPIResponse = <IAPIResponse>data;
          if (this.objAPIResponse.success) {

            this.showSnackBar("Save Complete");

          }
          else {
            console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
            this.dialogRef1 = this.dialog.open(MessageDialogComponent, {
              width: '300px', height: '200px',
              data: {
                Messagetype: "error",
                Messagetitle: "Error",
                Messagebody: "Working Duration"
              },
              disableClose: true
            });
          }
        },
        err => {
          // กรณี error
          console.log('Something went wrong!');
        });
    }

  }




  onNoClick() {
    this.dialogRef.close();

  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }

  showDialog(type: string, title: string, body: string) {
    this.dialogRef1 = this.dialog.open(MessageDialogComponent, {
      width: '300px', height: '200px',
      data: {
        Messagetype: type,
        Messagetitle: title,
        Messagebody: body
      },
      disableClose: true
    });
  }

}
