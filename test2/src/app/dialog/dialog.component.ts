import {ChangeDetectionStrategy, Component, Inject,inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { RouterOutlet,Router, RouterModule  } from '@angular/router';



@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,RouterModule],
  providers: [Router],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { idT: number },private dialogRef: MatDialogRef<DialogComponent>, private router: Router) {}
  delete() {
   
  }
  refreshPage() {
    this.router.navigateByUrl('/list-produit', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/list-produit'])
    );
  }

}
