import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockDataService, WorkdaySession, WorkActivity } from '../../services/mock-data.service';
import { Subscription, interval } from 'rxjs';

type ActivityType = 'SystemWork' | 'LunchBreak' | 'CoffeeBreak' | 'PersonalBreak' | 'ScreenLock';

@Component({
  selector: 'app-workday',
  templateUrl: './workday.page.html',
  styleUrls: ['./workday.page.scss'],
  standalone: false,
})
export class WorkdayPage implements OnInit, OnDestroy {
  session: WorkdaySession | null = null;
  workHistory: WorkActivity[] = [];
  elapsedSeconds = 0;
  private timerSub?: Subscription;

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.dataService.getWorkdaySession().subscribe(s => {
      this.session = s;
      if (s?.status === 'Active') {
        this.startTimer();
      }
    });
    this.dataService.getWorkHistory().subscribe(h => this.workHistory = h);
  }

  ngOnDestroy() { this.timerSub?.unsubscribe(); }

  private startTimer() {
    if (!this.session) return;
    const start = new Date(this.session.loginTime).getTime();
    this.elapsedSeconds = Math.floor((Date.now() - start) / 1000);
    this.timerSub = interval(1000).subscribe(() => this.elapsedSeconds++);
  }

  get elapsed(): string {
    const h = Math.floor(this.elapsedSeconds / 3600);
    const m = Math.floor((this.elapsedSeconds % 3600) / 60);
    const s = this.elapsedSeconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  get workActivities(): WorkActivity[] {
    return this.workHistory.filter(a => a.activityType === 'SystemWork');
  }

  get breakActivities(): WorkActivity[] {
    return this.workHistory.filter(a => a.activityType !== 'SystemWork');
  }

  get currentActivity(): WorkActivity | undefined {
    return this.workHistory.find(a => !a.endTime);
  }

  activityLabel(type: string): string {
    const m: Record<string, string> = {
      SystemWork: 'System Work', LunchBreak: 'Lunch Break',
      CoffeeBreak: 'Coffee Break', ScreenLock: 'Screen Locked', PersonalBreak: 'Personal Break',
    };
    return m[type] ?? type;
  }

  activityIcon(type: string): string {
    const m: Record<string, string> = {
      SystemWork: 'laptop-outline', LunchBreak: 'restaurant-outline',
      CoffeeBreak: 'cafe-outline', ScreenLock: 'lock-closed-outline', PersonalBreak: 'person-outline',
    };
    return m[type] ?? 'ellipse-outline';
  }

  activityColor(type: string): string {
    const m: Record<string, string> = {
      SystemWork: '#10b981', LunchBreak: '#f59e0b',
      CoffeeBreak: '#6366f1', ScreenLock: '#ef4444', PersonalBreak: '#8b5cf6',
    };
    return m[type] ?? '#6b7280';
  }

  formatTime(iso?: string): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  formatDuration(mins?: number): string {
    if (mins == null) return '—';
    const h = Math.floor(mins / 60), m = mins % 60;
    return h > 0 ? `${h}h ${m > 0 ? m + 'm' : ''}` : `${m}m`;
  }

  formatEarnings(n: number): string {
    return '₹' + n.toLocaleString('en-IN');
  }
}
