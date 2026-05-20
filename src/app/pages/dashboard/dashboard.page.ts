import { Component, OnInit } from '@angular/core';
import { MockDataService, DashboardStats, ActivityItem } from '../../services/mock-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  stats: DashboardStats = { totalLists: 0, totalItems: 0, recentActivities: 0, upcomingSchedules: 0 };
  recentActivities: ActivityItem[] = [];
  today = new Date();

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.dataService.getStats().subscribe(s => (this.stats = s));
    this.dataService.getActivities().subscribe(a => (this.recentActivities = a.slice(0, 3)));
  }

  formatDuration(min: number): string {
    if (min < 60) return `${min}m`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  }
}
