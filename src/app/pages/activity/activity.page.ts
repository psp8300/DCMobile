import { Component, OnInit } from '@angular/core';
import { MockDataService, ActivityItem } from '../../services/mock-data.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
  standalone: false,
})
export class ActivityPage implements OnInit {
  activities: ActivityItem[] = [];

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.dataService.getActivities().subscribe(a => (this.activities = a));
  }

  formatDuration(min: number): string {
    if (min < 60) return `${min} min`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  }

  activityIcon(name: string | undefined): string {
    const map: Record<string, string> = {
      'Team Meeting': 'people-outline',
      'Phone Call': 'call-outline',
      'Client Visit': 'business-outline',
      'Online Meeting': 'videocam-outline',
      'Appointment': 'medkit-outline',
      'Emergency Call': 'alert-circle-outline',
    };
    return map[name ?? ''] ?? 'ellipse-outline';
  }
}
