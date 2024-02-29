import {Component, ViewChild} from '@angular/core';
import {Reports} from "../reports";
import {ReportsService} from "../reports.service";
import {NgForm} from "@angular/forms";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {formatDate} from "@angular/common";



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
@ViewChild('reportForm') form: NgForm | undefined;
reports: Reports[] = [];
SelectedReport?: Reports;
  showUpdate: any;
  selectedReportForUpdate: Reports = { id: 0, name: '', country: '', city: '', hub: '', status: '', date: 0 };
  updateMessage: string = "";
  newReport: Reports = { id: 0, name: '', country: '', city: '', hub: '', status: '', date: 0 };
  isReportAdded: boolean = false;
  showReportsFlag: any;
  deleteMessage: String = "";
  reportId: number = 0;
  reportUpdate: Reports = { id: 0, name: '', country: '', city: '', hub: '', status: '', date: 0 };
  selectedReportForGetReports?: Reports;
  showReportsFlagForGetReports?: boolean;
  reportIdToUpdate: number = 0;
  status = ['Pending', 'Approved', 'Rejected'];
  countries = ['USA', 'India', 'UK', 'Australia'];
  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  hubs = ['Hub1', 'Hub2', 'Hub3', 'Hub4'];
  date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  onselect(report: Reports): void {
    this.SelectedReport = report;

  }


 constructor(private reportsService: ReportsService) {
 }

  getReports(): void {
    this.reportsService.getReports()
    .subscribe(reports => this.reports = reports
    );
  }


  deleteReport(id: number): void {
    this.reportsService.deleteReport(id)
    .subscribe(() => {
      this.reports = this.reports.filter(r => r.id !== id);
    });
  }

  addReport(): void {
    if (this.form?.valid) {
      console.log("this is valid");

      this.reportsService.addReport(this.newReport).subscribe(() => {
       console.log("New Vechile Added");
      });

    }

  }

  updateReport(report: Reports): void {
    this.reportsService.updateReport(report)
    .subscribe(() => {
      this.getReports();
    });
  }

  getReportById(id: number): void {
    this.reportsService.getReportById(id)
    .subscribe(report => {
      this.reports.push(report);
    });
  }

  ngOnInit() {
    this.getReports();
  }

  showDetails(report: Reports) {
    this.SelectedReport = report;
    console.log(report);
  }

  showUpdateForm(report: Reports) {
    this.showUpdate = true;
    this.selectedReportForUpdate = report;
    console.log(report);
  }
}


