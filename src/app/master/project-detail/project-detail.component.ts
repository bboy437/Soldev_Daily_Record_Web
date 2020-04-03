import {
  Component,
  OnInit,
 
} from "@angular/core";
import { BrokerAPIService } from "../../services/brokerapi.service";
import { Router, ActivatedRoute,  } from "@angular/router";
import { IAPIResponse } from "../../interfaces/apiResponse";
import { Project } from "../../interfaces/apisddrrecord"
import { ConfirmDeleteDialogComponent } from "../../dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import { MessageDialogComponent } from "../../dialogs/message-dialog/message-dialog.component";
import { Observable } from "rxjs/Observable";


import {
  MatDialog,
  MatSort,
  MatPaginator,
  MatTableDataSource,MatDialogRef, VERSION, MatSnackBar, 
} from "@angular/material";
;

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  version = VERSION;
  isLoadingResults = true;
  private RowID: string;
  objRow: any = {};
  objAPIResponse: any = {};
  objCustomer: any = [];
  CustomerID:number;
  private UrlAPI_GetSingleRow: string = "Project/Get/";
  private UrlAPI_Update: string = "Project/Update";
  private UrlAPI_Create: string = "Project/Create";
  private UrlAPI_GetAllCustomer: string = "Customer/GetAll";
  private Url_Listing: string = "/auth/master/project-listing";
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
  
        
        this.brokerAPIService
          .get(this.UrlAPI_GetAllCustomer)
          .subscribe(data => {
            this.objCustomer = data;
                console.log(data);
                this.isLoadingResults = false;
              });
  
        if (this.RowID == "new") {
          this.isLoadingResults = false;
        } else {
          this.brokerAPIService
            .get(this.UrlAPI_GetSingleRow + this.RowID)
            .subscribe(data => {
              this.objRow  = <Project>data;
              this.CustomerID = this.objRow.customerId;
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
    this.objRow.customerId = this.CustomerID;
    if (this.RowID == "new") {
      //Create
      
      this.objRow.createBy = "admin";
      this.objRow.updateBy = "admin";
      this.objRow.inActivated = false;
  
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
  
      let arrobjCustomerfilter: any = [];
      arrobjCustomerfilter = this.objCustomer.filter(
        obj => obj.id === this.CustomerID
      );
      if (arrobjCustomerfilter.length == 1) {
        this.objRow.customer = arrobjCustomerfilter[0];
      }
      this.brokerAPIService
        .post(this.UrlAPI_Update, <Project>this.objRow)
        .subscribe(   
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
    }
  
    // return Observable.of(false);
  }
  
  validate() {
    console.log(this.objRow.projectName);
    let strValidate: string = "";
  
    if (this.objRow.projectName == undefined || this.objRow.projectName == "") {
      strValidate = "Project Name";
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
