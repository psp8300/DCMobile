import { Component, OnInit } from '@angular/core';
import { MockDataService, ScheduleEvent } from '../../services/mock-data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
  standalone: false,
})
export class SchedulePage implements OnInit {
  events: ScheduleEvent[] = [];
  groupedEvents: { month: string; items: ScheduleEvent[] }[] = [];
  showToast = false;

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.dataService.getSchedule().subscribe(events => {
      this.events = events;
      this.buildGroups(events);
    });
  }

  private buildGroups(events: ScheduleEvent[]) {
    const map = new Map<string, ScheduleEvent[]>();
    for (const e of events) {
      const d = new Date(e.date);
      const key = d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    this.groupedEvents = Array.from(map.entries()).map(([month, items]) => ({ month, items }));
  }

  typeIcon(type: string): string {
    const map: Record<string, string> = {
      meeting:     'people-outline',
      appointment: 'medkit-outline',
      task:        'checkmark-circle-outline',
      reminder:    'notifications-outline',
    };
    return map[type] ?? 'calendar-outline';
  }

  typeColor(type: string): string {
    const map: Record<string, string> = {
      meeting:     'primary',
      appointment: 'danger',
      task:        'success',
      reminder:    'warning',
    };
    return map[type] ?? 'medium';
  }

  dayLabel(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' });
  }

  onAdd() {
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2500);
  }
}
