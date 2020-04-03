import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { BrokerAPIService } from "../../services/brokerapi.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { IAPIResponse } from "../../interfaces/apiResponse";
import { Activity } from "../../interfaces/apisddrrecord"
import { ConfirmDeleteDialogComponent } from "../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import { MessageDialogComponent } from "../../dialogs/message-dialog/message-dialog.component";
import { Observable } from "rxjs/Observable";


import {
  MatDialog,
  MatSort,
  MatPaginator,
  MatTableDataSource,MatDialogRef, VERSION, MatSnackBar, 
} from "@angular/material";

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  
  version = VERSION;
  isLoadingResults = true;
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  private UrlAPI_GetSingleRow: string = "Activity/Get/";
  private UrlAPI_Update: string = "Activity/Update";
  private UrlAPI_Create: string = "Activity/Create";
  private Url_Listing: string = "/auth/master/activity-listing";
  dialogRef: MatDialogRef<MessageDialogComponent>;
  filter:string;

  constructor(private brokerAPIService: BrokerAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

    ngOnInit() {
      this.isLoadingResults = true;
      let params = this.route.snapshot.paramMap;
      if (params.has("id")) {
        console.log(params.get("id"));
        this.RowID = params.get("id");
        this.filter = params.get("filter");
        this.isLoadingResults = false;
        if (this.RowID == "new") {
        } else {
          this.brokerAPIService
            .get(this.UrlAPI_GetSingleRow + this.RowID)
            .subscribe(data => {
              this.objRow = <Activity>data;
              console.log(this.objRow);
            });
        }
      }
      
    }
  
  
  
    btnSaveClick() {
      if (this.validate()) {
        this.save();
      }
    }
  
    btnCloseClick() {
      this.router.navigate([this.Url_Listing,{ filter: this.filter }]);
    }
  
    save() {
      if (this.RowID == "new") {
        //Create
  
        this.objRow.createBy = "admin";
        this.objRow.updateBy = "admin";
  
        this.brokerAPIService.post(this.UrlAPI_Create, this.objRow).subscribe(
          data => {
            this.objAPIResponse = <IAPIResponse>data;
            if (this.objAPIResponse.success) {
              this.showSnackBar("Save Complete");
              this.router.navigate([this.Url_Listing]);
            } else {
              console.log(
                "this.objAPIResponse.success :" + this.objAPIResponse.success
              );
            }
          },
          err => {
            // กรณี error
            console.log("Something went wrong!");
          }
        );
      } else {
        //Update
        this.brokerAPIService
        .post(this.UrlAPI_Update, <Activity>this.objRow)
        .subscribe(
          data => {
            this.objAPIResponse = <IAPIResponse>data;
            if (this.objAPIResponse.success) {
              this.showSnackBar("Save Complete");
              this.router.navigate([this.Url_Listing]);
            }
            else {
              console.log('this.objAPIResponse.success :' + this.objAPIResponse.success);
            }
          },
          err => {
            // กรณี error
            console.log('Something went wrong!');
          });
      }
    }
      
    validate() {
      console.log(this.objRow.activityName);
      let strValidate: string = "";
    
      if (this.objRow.activityName == undefined || this.objRow.activityName == "") {
        strValidate = "Activity Name";
      }
    
      if (strValidate != "") {
        this.showDialog("error", "Error", strValidate);
        return false;
        
      } 
     
      else {
        return true;
      }
    }
  
    showSnackBar(message: string) {
      this.snackBar.open(message, "", {
        duration: 2000
      });
    }
    
    showDialog(type: string, title: string, body: string) {
      this.dialogRef=this.dialog.open(MessageDialogComponent, {
        width:'300px',height:'200px',
       data: {
         Messagetype: type,
         Messagetitle: title,
         Messagebody: body
       },
       disableClose: true
     });
   }


}
