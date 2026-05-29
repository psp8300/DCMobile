import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockDataService, TeamMemberStatus } from '../../services/mock-data.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-live-status',
  templateUrl: './live-status.page.html',
  styleUrls: ['./live-status.page.scss'],
  standalone: false,
})
export class LiveStatusPage implements OnInit, OnDestroy {
  members: TeamMemberStatus[] = [];
  lastRefreshed = new Date();
  now = new Date();
  private timerSub?: Subscription;

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.load();
    this.timerSub = interval(1000).subscribe(() => this.now = new Date());
  }

  ngOnDestroy() { this.timerSub?.unsubscribe(); }

  load() {
    this.dataService.getTeamLiveStatus().subscribe(m => {
      this.members = m;
      this.lastRefreshed = new Date();
    });
  }

  statusColor(status: string): string {
    if (status === 'Active') return '#10b981';
    if (status === 'Completed') return '#6366f1';
    return '#d1d5db';
  }

  activityLabel(type?: string): string {
    if (!type) return '';
    const m: Record<string, string> = {
      SystemWork: 'System Work', LunchBreak: 'Lunch Break',
      CoffeeBreak: 'Coffee Break', ScreenLock: 'Screen Locked', PersonalBreak: 'Personal Break',
    };
    return m[type] ?? type;
  }

  activityIcon(type?: string): string {
    const m: Record<string, string> = {
      SystemWork: 'laptop-outline', LunchBreak: 'restaurant-outline',
      CoffeeBreak: 'cafe-outline', ScreenLock: 'lock-closed-outline', PersonalBreak: 'person-outline',
    };
    return (type && m[type]) ? m[type] : 'ellipse-outline';
  }

  activityColor(type?: string): string {
    const m: Record<string, string> = {
      SystemWork: '#10b981', LunchBreak: '#f59e0b',
      CoffeeBreak: '#8b5cf6', ScreenLock: '#ef4444', PersonalBreak: '#6366f1',
    };
    return (type && m[type]) ? m[type] : '#6b7280';
  }

  elapsed(startTime?: string): string {
    if (!startTime) return '';
    const secs = Math.floor((this.now.getTime() - new Date(startTime).getTime()) / 1000);
    if (secs < 0) return '0s';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m ${String(s).padStart(2, '0')}s`;
  }

  formatTime(iso?: string): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  formatDuration(mins?: number): string {
    if (mins == null) return '—';
    const h = Math.floor(mins / 60), m = mins % 60;
    return h > 0 ? `${h}h:${String(m).padStart(2, '0')}m` : `${m}m`;
  }

  formatEarnings(val?: number): string {
    if (val == null) return '—';
    return '₹' + val.toLocaleString('en-IN');
  }

  initials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
