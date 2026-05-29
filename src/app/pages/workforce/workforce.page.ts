import { Component, OnInit } from '@angular/core';
import { MockDataService, AttendanceRecord, TeamMemberStatus } from '../../services/mock-data.service';

type Period = 'day' | 'week' | 'month';

@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.page.html',
  styleUrls: ['./workforce.page.scss'],
  standalone: false,
})
export class WorkforcePage implements OnInit {
  period: Period = 'day';
  viewDate = new Date();
  members: TeamMemberStatus[] = [];
  selectedMemberId: number | undefined;
  records: AttendanceRecord[] = [];

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.dataService.getTeamLiveStatus().subscribe(m => {
      this.members = m;
      this.loadAttendance();
    });
  }

  selectMember(id: number | undefined) {
    this.selectedMemberId = id;
    this.loadAttendance();
  }

  setPeriod(p: Period) { this.period = p; this.loadAttendance(); }
  prev() { this.viewDate = this.shift(-1); this.loadAttendance(); }
  next() { if (!this.isCurrent) { this.viewDate = this.shift(1); this.loadAttendance(); } }
  goNow() { this.viewDate = new Date(); this.loadAttendance(); }

  loadAttendance() {
    this.dataService.getTeamAttendance(this.period, this.viewDate, this.selectedMemberId)
      .subscribe(r => this.records = r);
  }

  get isCurrent(): boolean {
    const now = new Date();
    if (this.period === 'day') return this.sameDay(this.viewDate, now);
    if (this.period === 'week') return this.sameWeek(this.viewDate, now);
    return this.sameMonth(this.viewDate, now);
  }

  get periodLabel(): string {
    if (this.period === 'day')
      return this.viewDate.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
    if (this.period === 'week') {
      const mon = this.weekStart(this.viewDate);
      const sun = new Date(mon.getTime() + 6 * 86400000);
      return `${mon.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} – ${sun.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
    }
    return this.viewDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  }

  get selectedName(): string {
    if (!this.selectedMemberId) return 'All Members';
    return this.members.find(m => m.userId === this.selectedMemberId)?.displayName ?? 'Member';
  }

  get totalPresent(): number { return this.records.filter(r => r.status !== 'Absent').length; }
  get totalNet(): number { return this.records.reduce((s, r) => s + r.netTimeMins, 0); }
  get totalEarnings(): number { return this.records.reduce((s, r) => s + r.earnings, 0); }

  initials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
  }

  formatTime(iso?: string): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  formatDuration(mins: number): string {
    if (!mins) return '—';
    const h = Math.floor(mins / 60), m = mins % 60;
    return h > 0 ? `${h}h ${m > 0 ? m + 'm' : ''}` : `${m}m`;
  }

  formatEarnings(n: number): string { return '₹' + n.toLocaleString('en-IN'); }

  private shift(dir: number): Date {
    const d = new Date(this.viewDate);
    if (this.period === 'day') d.setDate(d.getDate() + dir);
    else if (this.period === 'week') d.setDate(d.getDate() + dir * 7);
    else d.setMonth(d.getMonth() + dir);
    return d;
  }

  private sameDay(a: Date, b: Date) { return a.toDateString() === b.toDateString(); }
  private sameWeek(a: Date, b: Date) { return this.weekStart(a).getTime() === this.weekStart(b).getTime(); }
  private sameMonth(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth(); }
  private weekStart(d: Date): Date {
    const r = new Date(d);
    const diff = r.getDay() === 0 ? -6 : 1 - r.getDay();
    r.setDate(r.getDate() + diff);
    r.setHours(0, 0, 0, 0);
    return r;
  }
}
