import { Component, OnInit } from '@angular/core';
import { MockDataService, ActivityItem } from '../../services/mock-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  today = new Date();
  recentActivities: ActivityItem[] = [];

  stats = [
    { icon: 'list',     label: 'Lists',      value: 8,  color: '#1A4A7E' },
    { icon: 'cube',     label: 'Items',      value: 47, color: '#7C3AED' },
    { icon: 'time',     label: 'Activities', value: 6,  color: '#0891B2' },
    { icon: 'calendar', label: 'Upcoming',   value: 3,  color: '#059669' },
  ];

  quickActions = [
    { icon: 'flash',        label: 'Activity',    color: '#1A4A7E' },
    { icon: 'person',       label: 'Contact',     color: '#059669' },
    { icon: 'lock-closed',  label: 'Credentials', color: '#DC2626' },
    { icon: 'document-text',label: 'Document',    color: '#7C3AED' },
    { icon: 'create',       label: 'Note',        color: '#D97706' },
    { icon: 'cash',         label: 'Money',       color: '#0891B2' },
  ];

  workdayActions = [
    { icon: 'timer-outline',       label: 'Workday',      color: '#10b981', route: '/tabs/workday' },
    { icon: 'checkmark-done-outline', label: 'Attendance',   color: '#6366f1', route: '/tabs/attendance' },
    { icon: 'people-outline',      label: 'Workforce',    color: '#f59e0b', route: '/tabs/workforce' },
    { icon: 'eye-outline',         label: "Who's Doing What", color: '#0891B2', route: '/tabs/live-status' },
  ];

  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  }

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.dataService.getActivities().subscribe(a => this.recentActivities = a.slice(0, 4));
  }

  formatDuration(min: number): string {
    if (min < 60) return `${min}m`;
    const h = Math.floor(min / 60), m = min % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  }

  activityIcon(name: string | undefined): string {
    const m: Record<string, string> = {
      'Team Meeting': 'people', 'Phone Call': 'call',
      'Client Visit': 'business', 'Online Meeting': 'videocam',
      'Appointment': 'medkit', 'Emergency Call': 'alert-circle',
    };
    return m[name ?? ''] ?? 'time';
  }

  activityColor(name: string | undefined): string {
    const m: Record<string, string> = {
      'Team Meeting': '#1A4A7E', 'Phone Call': '#059669',
      'Client Visit': '#7C3AED', 'Online Meeting': '#0891B2',
      'Appointment':  '#DC2626', 'Emergency Call': '#D97706',
    };
    return m[name ?? ''] ?? '#6B7280';
  }
}
