
import { WebDataRocksPivot } from "../webdatarocks/webdatarocks.angular4";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Chivamember } from '../../interfaces/sysrecord';
import { HttpClient } from '@angular/common/http';
import { GlobalsValue } from '../../globals.value';
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

@Component({
  selector: 'app-monthly-report-detail',
  templateUrl: './monthly-report-detail.component.html',
  styleUrls: ['./monthly-report-detail.component.scss']
})
export class MonthlyReportDetailComponent {

  cobjRow: any = {};
  arrobjDailyRecord: any = [];
  private Url_listing: string = "/auth/report/monthly-report-listing";
  @ViewChild('pivot1') child: WebDataRocksPivot;
  numMonthSelected: String;
  numYearSelected: String;
  private UrlAPI_GetAllMonthlyReport: string =
    "Report/GetAllMonthlyReport/";


  constructor(private brokerAPIService: BrokerAPIService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private globalsvalue: GlobalsValue) {

  }
  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    if (params.has('numMonthSelected')) {
      this.numMonthSelected = params.get('numMonthSelected')

    }
    if (params.has('numYearSelected')) {
      this.numYearSelected = params.get('numYearSelected')

    }

    console.log("numMonthSelected", params.get('numMonthSelected'));
    console.log("numYearSelected", params.get('numYearSelected'));

    this.brokerAPIService
      .get(this.UrlAPI_GetAllMonthlyReport + this.numYearSelected + "," + this.numMonthSelected).subscribe(
        data => {
          this.arrobjDailyRecord = data;

          this.arrobjDailyRecord.forEach(element => {
            element.projectName = element.project.projectName;
            element.activityName = element.activity.activityName;
            element.customerName = element.project.customer.customerName;
          });
          console.log("data", data);


        });
  }


  onPivotReady(pivot: WebDataRocks.Pivot): void {
    // console.log("[ready] WebDataRocksPivot", this.child);
  }

  onCustomizeCell(cell: WebDataRocks.CellBuilder, data: WebDataRocks.Cell): void {
    // console.log("[customizeCell] WebDataRocksPivot");
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }



  customizeToolbar(toolbar) {
    // get all tabs
    // var tabs = toolbar.getTabs();
    // toolbar.getTabs = function () {
    //   delete tabs[0];
    //   delete tabs[1];
    //   delete tabs[4];
    //   // delete tabs[5];
    //   delete tabs[6];
    //   return tabs;
    // }

  }


  onReportComplete(): void {

    this.arrobjDailyRecord.unshift(
      {
        employeeName: { "type": "string", "caption": "Employee Name" },
        wokingDate: { "type": "date string", "caption": "Working Date" },
        customerName: { "type": "string", "caption": "Customer Name" },
        projectName: { "type": "string", "caption": "Project Name" },
        activityName: { "type": "string", "caption": "Activity Name" },
        workingDuration: { "type": "string", "caption": "Working Duration" },

      }

    );
    console.log(this.arrobjDailyRecord);

    this.child.webDataRocks.off("reportcomplete");
    this.child.webDataRocks.setReport({


      "dataSource": {
        "dataSourceType": "json",
        "data": this.arrobjDailyRecord,
      },
      "slice": {
        "rows": [
          {
            "uniqueName": "employeeName",
          },
          {
            "uniqueName": "wokingDate"
          },
          {
            "uniqueName": "customerName"
          },
          {
            "uniqueName": "projectName"
          },
          {
            "uniqueName": "activityName"
          },
          {
            "uniqueName": "workingDuration"
          },

        ],
        "columns": [
          {
            "uniqueName": "Measures",
          },

        ]
      },


      "options": {
        "grid": {
          "type": "flat",
          "showGrandTotals": "off",
          "title": 'Monthly Report <br> ssssss',


        },

        "datePattern": "dd/MM/yyyy",
        "dateTimePattern": "dd/MM/yyyy HH:mm:ss",

      },

      "conditions": [
        {
          "format": {
            "backgroundColor": "#FFCCFF",
            "fontFamily": "Arial",
            "fontSize": "5px",

          }
        }
      ],

      "formats": [
        {
          // "textAlign": "right",
        },
        
      ],

      "localization": {
        "grid": {
          "blankMember": "(blank)"
        },

      }

    });

  }



  btnCloseClick() {
    this.router.navigate([this.Url_listing]);
  }


}
