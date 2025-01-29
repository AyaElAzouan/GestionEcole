import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { BrowserModule } from '@angular/platform-browser';
import * as Chartist from 'chartist';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatTooltipModule,BrowserModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit {
 
  highestModule: { module: string; students: number; percentage: number } | null = null;
  lowestModule: { module: string; students: number; percentage: number } | null = null;

  modulesData: { module: string; students: number; percentage: number }[] = [
    { module: 'Module 1', students: 50, percentage: 0 },
    { module: 'Module 2', students: 120, percentage: 0 },
    { module: 'Module 3', students: 80, percentage: 0 },
    { module: 'Module 4', students: 200, percentage: 0 },
    { module: 'Module 5', students: 90, percentage: 0 },
    { module: 'Module 6', students: 60, percentage: 0 },
    { module: 'Module 7', students: 110, percentage: 0 }
  ];

  maxModule: { module: string; students: number; percentage: number };
  minModule: { module: string; students: number; percentage: number };

  constructor() {
    this.maxModule = { module: '', students: 0, percentage: 0 };
    this.minModule = { module: '', students: 0, percentage: 0 };
    this.calculatePercentages();
  }

  getChartWidth(): number {
    return Math.min(this.modulesData.length * 80, 500);
  }

  ngOnInit() {
    this.findMaxModule();
    this.findMinModule();
  }

  calculatePercentages(): void {
    const totalStudents = this.modulesData.reduce((total, module) => total + module.students, 0);

    this.modulesData = this.modulesData.map(module => ({
      ...module,
      percentage: parseFloat(((module.students / totalStudents) * 100).toFixed(2)),
    }));

    this.highestModule = this.modulesData.reduce(
      (max, module) => (module.percentage > max.percentage ? module : max),
      this.modulesData[0]
    );

    this.lowestModule = this.modulesData.reduce(
      (min, module) => (module.percentage < min.percentage ? module : min),
      this.modulesData[0]
    );
  }

  findMaxModule(): void {
    this.maxModule = this.modulesData.reduce(
      (prev, current) => (prev.students > current.students ? prev : current),
      this.modulesData[0]
    );
  }
  findMinModule(): void {
    this.minModule = this.modulesData.reduce(
      (prev, current) => (prev.students < current.students ? prev : current),
      this.modulesData[0]
    );
  }

} 

  

