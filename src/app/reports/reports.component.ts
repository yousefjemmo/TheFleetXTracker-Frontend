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
  newReport: {id: number; date: number; country: string; hub: string; city: string; kilometers: string; name: string; stops: number; status: string } = {id: 0, name: '', country: '', city: '', hub: '', status: '', stops: 0, kilometers: "", date: 0};
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
  date = formatDate(new Date(), 'mm-dd-yyyy', 'en');
  reportIdForDelete: any;
  isReportDeleted: any;
  filteredReport: any;
  reportName: string = "";
  reportCountry: any;
  reportCity: any;
  reportHub: any;
  reportStatus: any;
  reportDate: any;
  reportMultipleFields: any;
  private router: any;



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
    if (this.reports === null) {
      this.updateMessage = "Invalid report ID.";
      return;
    }
    this.reportsService.getReportById(id)
      .subscribe(
        (report) => {
          this.selectedReportForGetReports = report;
          this.reportIdToUpdate = report.id;
        },
        (error) => {
          if (error.status === null) {
            this.updateMessage = "Report not found.";
          } else {
            this.updateMessage = "Error occurred while getting the report.";
          }
        }
      );
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
      const lowerCaseName = this.reportName.toLowerCase();
      this.reports = this.reports.filter(r => r.name.toLowerCase() === lowerCaseName);
    } else {
      console.log("No name provided");
    }
  }



  filterReportsByCountry() {
    if (this.reportCountry) {
      this.reports = this.reports.filter(r => r.country === this.reportCountry);
    } else {
      this.getReports();
    }

  }

  filterReportsByCity() {
    if (this.reportCity) {
      this.reports = this.reports.filter(r => r.city === this.reportCity);
    } else {
      this.getReports();
    }
  }

  filterReportsByDate() {
    if (this.reportDate) {
      // Convert reportDate to Date object
      const selectedDate = new Date(this.reportDate);

      // Format the date to 'MM-DD-YYYY'
      const formattedDate = this.formatDate(selectedDate);

      console.log('Selected Date:', selectedDate);
      console.log('Formatted Date:', formattedDate);

      // Filter reports based on the formatted date
      this.reports = this.reports.filter(r => {
        const reportDate = new Date(r.date);
        const formattedReportDate = this.formatDate(reportDate);

        console.log('Report Date:', reportDate);
        console.log('Formatted Report Date:', formattedReportDate);

        return formattedReportDate === formattedDate;
      });
    } else {
      this.getReports();
    }
  }


  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }








  filterReportsByHub() {
    if (this.reportHub) {
      this.reports = this.reports.filter(r => r.hub === this.reportHub);
    } else {
      this.getReports();
    }
  }

  filterReportsByMultipleFields() {
    if (this.reportMultipleFields) {
      const searchTerm = this.reportMultipleFields.toLowerCase();
      this.reports = this.reports.filter(
        r =>
          r.id.toString().includes(searchTerm) ||
          r.name.toLowerCase().includes(searchTerm) ||
          r.country.toLowerCase().includes(searchTerm) ||
          r.city.toLowerCase().includes(searchTerm) ||
          r.hub.toLowerCase().includes(searchTerm) ||
          r.status.toLowerCase().includes(searchTerm) ||
          r.date.toString().includes(searchTerm)
      );
    } else {
      this.getReports();
    }
  }

  filterReports() {
    this.reports = this.reports.filter(report => {
      return (
        (!this.filterOptions.showId || report.id === this.reportId) &&
        (!this.filterOptions.showName || report.name.toLowerCase().includes(this.reportName.toLowerCase())) &&
        (!this.filterOptions.showCountry || report.country.toLowerCase() === this.reportCountry.toLowerCase()) &&
        (!this.filterOptions.showCity || report.city.toLowerCase() === this.reportCity.toLowerCase()) &&
        (!this.filterOptions.showHub || report.hub.toLowerCase() === this.reportHub.toLowerCase()) &&
        (!this.filterOptions.showStatus || report.status.toLowerCase() === this.reportStatus.toLowerCase()) &&
        (!this.filterOptions.showDate || report.date === this.reportDate)


      );
    });
  }


  filterOptions = {
    showId: false,
    showName: false,
    showCountry: false,
    showCity: false,
    showHub: false,
    ShowDate: false,
    showStatus: false,
    showDate: false


  };
  selectedReport: any;
  searchReportId: any;
  newVehicle: any;
  showAddFormFlag: any;




  applyFilters() {
    this.reports = this.reports.filter(r => {
      return (
        (this.filterOptions.showId ? r.id === this.reportId : true) &&
        (this.filterOptions.showName ? r.name === this.reportName : true) &&
        (this.filterOptions.showCountry ? r.country === this.reportCountry : true) &&
        (this.filterOptions.showCity ? r.city === this.reportCity : true) &&
        (this.filterOptions.showHub ? r.hub === this.reportHub : true) &&
        (this.filterOptions.showStatus ? r.status === this.reportStatus : true) &&
        (this.filterOptions.showDate ? r.date === this.reportDate : true)
      );
    });
  }


  exportToExcel() {
    this.reportsService.ExportToExcel().subscribe((data) => {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      const filename = `Reports_${dateString}.xlsx`;

      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }


  isAlreadyExist(name: string) {
    return this.reports.some(r => r.name === name && r.id !== this.reportId && r.country === this.reportCountry && r.city === this.reportCity && r.hub === this.reportHub && r.status === this.reportStatus && r.date === this.reportDate && r.kilometers === this.reportMultipleFields && r.stops);
  }

  confirmDelete(id: number) {
    if (confirm("Are you sure to delete " + id + "?")) {
      this.deleteReport(id);
    }
  }

  showAddForm() {
   this.router.navigate(['/add-vehicle-form']);
  }

}



