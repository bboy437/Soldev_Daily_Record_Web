import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import { BrokerAPIService } from '../../services/brokerapi.service';
import { Observable } from 'rxjs/Observable';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import { Router, ActivatedRoute, } from '@angular/router';
import 'rxjs/add/operator/map'
import { Project } from '../../interfaces/apisddrrecord';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.scss']
})
export class ProjectListingComponent implements OnInit {


  isLoadingResults = true;

  dataSource = new MatTableDataSource();
  displayedColumns = ['customerName','projectName' ,'inActivated'];
  objRowSelected: Project;
  filter:string="";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private UrlAPI_GetAll: string = "Project/GetAll";
  private Url_Detail: string = "/auth/master/project-detail";
  constructor( private brokerAPIService: BrokerAPIService,
    private router: Router,
    private route: ActivatedRoute,) { }

    ngOnInit() {
      this.isLoadingResults = true;
      let params = this.route.snapshot.paramMap;
      this.brokerAPIService.get(this.UrlAPI_GetAll).subscribe(
        data => {
          console.log("UrlAPI_GetAll");
          console.log(data);
          this.dataSource.data = data;
          this.isLoadingResults = false;
          if(params.get("filter") != null ){
            this.filter = params.get("filter");
          }
          this.dataSource.filter = this.filter.toLowerCase();
        }
      );
  
      }

      imageToShow: any;

      createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
           this.imageToShow = reader.result;
        }, false);
   
        
        if (image) {
         reader.readAsDataURL(image);
      }
   }
      
   btnNewClick() {
    this.router.navigate([this.Url_Detail, { id: "new", filter: this.filter }]);
  }
  rowClicked(row: any): void {
    console.log(row);
    this.objRowSelected = <Project>row;
    this.router.navigate([this.Url_Detail, { id: this.objRowSelected.id, filter: this.filter } ]);
     
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data: Project, filter: string): boolean {
      return (
        data.customer.customerName.toString().toLowerCase().includes(filter) ||
        data.projectName.toString().toLowerCase().includes(filter) ||
        data.inActivated.toString().replace("true","Inactive").replace("false","Active").toLowerCase().includes(filter)
      );
    };
  }

}
