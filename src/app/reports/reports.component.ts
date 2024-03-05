import {Component, ViewChild} from '@angular/core';
import {Reports} from "../reports";
import {ReportsService} from "../reports.service";
import {NgForm} from "@angular/forms";
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
  selectedReportForUpdate: Reports = {
    id: 0,
    name: '',
    country: '',
    city: '',
    hub: '',
    status: '',
    stops: 0,
    kilometers: "",
    date: 0
  };
  updateMessage: string = "";
  newReport: Reports = {id: 0, name: '', country: '', city: '', hub: '', status: '', stops: 0, kilometers: "", date: 0};
  isReportAdded: boolean = false;
  showReportsFlag: any;
  deleteMessage: String = "";
  reportId: number = 0;
  reportUpdate: Reports = {
    id: 0,
    name: '',
    country: '',
    city: '',
    hub: '',
    status: '',
    stops: 0,
    kilometers: "",
    date: 0
  };
  selectedReportForGetReports?: Reports;
  showReportsFlagForGetReports?: boolean;
  reportIdToUpdate: number = 0;
  date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  reportIdForDelete: any;
  isReportDeleted: any;
  filteredReport: any;
  reportName: any;
  reportCountry: any;
  reportCity: any;
  reportHub: any;
  reportStatus: any;
  reportDate: any;
  reportMultipleFields: any;

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
    const {id, name, country, city, hub, status, date} = this.newReport;

    if (!id || !name || !country || !city || !hub || !status || !date) {
      return;
    }
    this.newReport = {
      id: 0,
      name: name,
      country: country,
      city: city,
      hub: hub,
      status: status,
      stops: 0,
      kilometers: "0",
      date: new Date().getTime()
    };
    this.reportsService.addReport(this.newReport).subscribe();
    this.isReportAdded = true;
  }

  updateReport(report: Reports): void {
    this.reportsService.updateReport(report).subscribe(
      () => {
        this.updateMessage = 'Report updated successfully';
        this.reports = this.reports.map(r => (r.id === report.id ? report : r));
      },
      error => console.error('Error updating report:', error)
    );
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

  showUpdateForm(report: Reports) {
    this.showUpdate = true;
    this.selectedReportForUpdate = report;
    console.log(report);
  }

  filterReportsByStatus(status: string) {
    this.reports = this.reports.filter(r => r.status === status);
  }

  deleteReportById() {
    this.reportsService.deleteReport(this.reportId)
      .subscribe(() => {
        this.deleteMessage = "Report deleted successfully";
        this.getReports();
      });
  }

  filterReportsById(): void {
    if (this.reportId) {
      this.reports = this.reports.filter(r => r.id === this.reportId);

    } else {
      console.log("No id provided");
    }
  }


  filterReportsByName() {
    if (this.reportName) {
      this.reports = this.reports.filter(r => r.name === this.reportName);
    } else {
      // If no name is provided, show all reports
      this.getReports();
    }
  }


  filterReportsByCountry() {
    if (this.reportCountry) {
      this.reports = this.reports.filter(r => r.country === this.reportCountry);
    } else {
      // If no country is provided, show all reports
      this.getReports();
    }

  }

  filterReportsByCity() {
    if (this.reportCity) {
      this.reports = this.reports.filter(r => r.city === this.reportCity);
    } else {
      // If no city is provided, show all reports
      this.getReports();
    }
  }

  filterReportsByHub() {
    if (this.reportHub) {
      this.reports = this.reports.filter(r => r.hub === this.reportHub);
    } else {
      // If no hub is provided, show all reports
      this.getReports();
    }
  }

  filterReportsByMultipleFields() {
    if (this.reportMultipleFields) {
      const searchTerm = this.reportMultipleFields.toLowerCase();
      this.reports = this.reports.filter(
        r =>
          r.name.toLowerCase().includes(searchTerm) ||
          r.country.toLowerCase().includes(searchTerm) ||
          r.city.toLowerCase().includes(searchTerm) ||
          r.hub.toLowerCase().includes(searchTerm) ||
          r.status.toLowerCase().includes(searchTerm)
      );
    } else {
      // If no field is provided, show all reports
      this.getReports();
    }
  }

  filterOptions = {
    showId: false,
    showName: false,
    showCountry: false,
    showCity: false,
    showHub: false,
    showStatus: false,
  };
  selectedReport: any;
  searchReportId: any;


  applyFilters() {
    this.reports = this.reports.filter(r => {
      return (
        (this.filterOptions.showId ? r.id === this.reportId : true) &&
        (this.filterOptions.showName ? r.name === this.reportName : true) &&
        (this.filterOptions.showCountry ? r.country === this.reportCountry : true) &&
        (this.filterOptions.showCity ? r.city === this.reportCity : true) &&
        (this.filterOptions.showHub ? r.hub === this.reportHub : true) &&
        (this.filterOptions.showStatus ? r.status === this.reportStatus : true)
      );
    });
  }


  filterReports() {
    this.reports = this.reports.filter(r => r.id === this.reportId);
  }

  searchReport() {
    this.reports = this.reports.filter(r => r.id === this.reportId);
  }

  exportToExcel() {
    this.reportsService.ExportToExcel().subscribe((data) => {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const filename = `Reports_${dateString}.xlsx`;

      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Save the file with a specific name
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }


}



