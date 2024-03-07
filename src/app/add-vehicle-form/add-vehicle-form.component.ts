import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Reports} from "../reports";

@Component({
  selector: 'app-add-vehicle-form',
  templateUrl: './add-vehicle-form.component.html',
  styleUrls: ['./add-vehicle-form.component.css']
})
export class AddVehicleFormComponent {
  reports: Reports[] = [];
  showAddFormFlag: boolean = true; // Initialize with false
  newReport: any = {}; // Initialize as an empty object
  private reportsService: any;
  @ViewChild('reportForm') form: NgForm | undefined;
reportId: any;
  reportName: any;
  reportCountry: any;
  reportCity: any;
  reportHub: any;
  reportStatus: any;
  reportDate: any;

  addReport(): void {
    if (this.form?.valid) {
      console.log('Form data:', this.form.value);

      this.reportsService.addReport(this.form.value).subscribe(
        () => {
          console.log('Report added successfully');
        },
        (error: any) => {
          console.error('Error adding report:', error);
        }
      );
    }
  }

  isAlreadyExist(name: string) {
    return this.reports.some(r => r.name === name && r.id !== this.reportId );
  }
}
