import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  test : Date = new Date();
  
  constructor() { }

  ngOnInit() {
  }

}
