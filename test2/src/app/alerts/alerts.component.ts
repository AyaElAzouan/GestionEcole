import { Component} from '@angular/core';
import { cilCheck } from '@coreui/icons';
import { AlertComponent, AlertModule } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [AlertComponent,IconDirective,RouterModule],
  providers:[AlertComponent,AlertModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
  icons = { cilCheck };
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';
  visible: boolean = false;

  showSuccess(message: string) {
    console.log('showSuccess called with message:', message);
    this.alertMessage= message;
    this.alertType = 'success';
    this.visible = true;
  }

  showError(message: string) {
    this.alertType = 'danger';
    this.alertMessage = message;
    setTimeout(() => this.alertMessage = null, 5000); // Hide the alert after 5 seconds
  }
}
