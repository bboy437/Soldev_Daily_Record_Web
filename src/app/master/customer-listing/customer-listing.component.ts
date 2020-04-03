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
import { Customer } from '../../interfaces/apisddrrecord';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss']
})
export class CustomerListingComponent implements OnInit {

  isLoadingResults = true;

  dataSource = new MatTableDataSource();
  displayedColumns = ['customerName','customerShortName','inActivated'];
  objRowSelected: Customer;
  filter:string="";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private UrlAPI_GetAll: string = "Customer/GetAll";
  private Url_Detail: string = "/auth/master/customer-detail";

  constructor(    private brokerAPIService: BrokerAPIService,
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

   btnNewClick() {
    this.router.navigate([this.Url_Detail, { id: "new", filter: this.filter }]);
  }
  
  rowClicked(row: any): void {
    console.log(row);
    this.objRowSelected = <Customer>row;
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
    this.dataSource.filterPredicate = function(data: Customer, filter: string): boolean {
      return (
        data.customerName.toString().toLowerCase().includes(filter) ||
        data.inActivated.toString().replace("true","Inactive").replace("false","Active").toLowerCase().includes(filter)
      );
    };
  }



}
