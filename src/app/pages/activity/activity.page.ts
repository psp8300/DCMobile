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
  ngOnInit() { this.dataService.getActivities().subscribe(a => this.activities = a); }

  formatDuration(min: number): string {
    if (min < 60) return `${min}m`;
    const h = Math.floor(min / 60), m = min % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  }

  activityIcon(name: string | undefined): string {
    const m: Record<string, string> = {
      'Team Meeting':   'people',
      'Phone Call':     'call',
      'Client Visit':   'business',
      'Online Meeting': 'videocam',
      'Appointment':    'medkit',
      'Emergency Call': 'alert-circle',
    };
    return m[name ?? ''] ?? 'time';
  }

  activityColor(name: string | undefined): string {
    const m: Record<string, string> = {
      'Team Meeting':   '#1A4A7E',
      'Phone Call':     '#059669',
      'Client Visit':   '#7C3AED',
      'Online Meeting': '#0891B2',
      'Appointment':    '#DC2626',
      'Emergency Call': '#D97706',
    };
    return m[name ?? ''] ?? '#6B7280';
  }
}
