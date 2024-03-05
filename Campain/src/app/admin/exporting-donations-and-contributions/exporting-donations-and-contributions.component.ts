import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exporting-donations-and-contributions',
  templateUrl: './exporting-donations-and-contributions.component.html',
  styleUrls: ['./exporting-donations-and-contributions.component.css']
})
export class ExportingDonationsAndContributionsComponent {

  // @Input() iconText:string;
  @Input() text:string | undefined;

}
