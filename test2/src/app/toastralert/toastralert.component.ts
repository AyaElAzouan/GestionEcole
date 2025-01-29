import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-toastralert',
  standalone: true,
  imports: [MatCardModule,MatButtonModule ],
  templateUrl: './toastralert.component.html',
  styleUrl: './toastralert.component.css'
})
export class ToastralertComponent {
 constructor(private toastr: ToastrService ) {

 }
 showsuccess(message: string) {
this.toastr.success(message,'Success');
 }
 showerror(message: string) {
  this.toastr.error(message,'Failed');
   }
   showWarning(message: string) {
    this.toastr.warning(message,'Failed');
   
     }
}
