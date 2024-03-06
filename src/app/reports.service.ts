import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Reports} from "./reports";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getReports(): Observable<Reports[]> {
    return this.http.get<Reports[]>('api/TheFleetXTracker');
  }

  getReportById(id: number): Observable<Reports> {
    const url = `api/TheFleetXTracker/${id}`;
    return this.http.get<Reports>(url);
  }



  deleteReport(id: number): Observable<Reports> {
    const url = `api/TheFleetXTracker/${id}`;
    return this.http.delete<Reports>(url, httpOptions);
  }

  addReport(report: Reports): Observable<Reports> {
    const url = 'api/TheFleetXTracker/';

    return this.http.post<Reports>(url, JSON.stringify(report), httpOptions);
  }

  updateReport(report: Reports): Observable<Reports> {
    const url = `api/TheFleetXTracker/${report.id}`;
    return this.http.put<Reports>(url, JSON.stringify(report), httpOptions);
  }


  ExportToExcel(): Observable<any> {
    return this.http.get('api/TheFleetXTracker/ExportToExcel', { responseType: 'blob' });
  }









}
