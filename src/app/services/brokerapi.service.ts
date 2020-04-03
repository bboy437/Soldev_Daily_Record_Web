import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient } from '@angular/common/http';
import { GlobalsValue } from '../globals.value';
import { IAPIResponse } from '../interfaces/apiResponse';


@Injectable()
export class BrokerAPIService {
 

    constructor(private http: HttpClient, private globalsvalue: GlobalsValue) {

    }

    getHeaderContentTypeJson() {
        const headerDict = {
            'authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
        return headerDict;
    }



    getHeader() {
        const headerDict = {
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }
        return headerDict;
    }

    get(strUrl: string): Observable<any> {
        return this.http.get<any>(this.globalsvalue.ServerApiUrl + strUrl, { headers: this.getHeaderContentTypeJson() });
    }

    post(strUrl: string, objbody: any): Observable<IAPIResponse> {
        return this.http.post<IAPIResponse>(this.globalsvalue.ServerApiUrl + strUrl, objbody, { headers: this.getHeaderContentTypeJson() });
    }


   
}

