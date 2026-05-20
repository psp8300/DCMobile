import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalLists: number;
  totalItems: number;
  recentActivities: number;
  upcomingSchedules: number;
}

export interface ListItem {
  listId: number;
  listName: string;
  description?: string;
  itemCount: number;
  createdAt: string;
  color?: string;
}

export interface Item {
  itemId: number;
  itemName: string;
  variantName?: string;
  listName?: string;
  value1?: string;
  value2?: string;
  notes?: string;
  createdAt: string;
}

export interface ActivityItem {
  logId: number;
  activityId: number;
  activityName?: string;
  date?: string;
  durationMinutes?: number;
  notes?: string;
  createdAt?: string;
}

export interface ScheduleEvent {
  id: number;
  title: string;
  date: string;
  time?: string;
  type: 'meeting' | 'appointment' | 'task' | 'reminder';
  notes?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_STATS: DashboardStats = {
  totalLists: 8,
  totalItems: 47,
  recentActivities: 6,
  upcomingSchedules: 3,
};

const MOCK_LISTS: ListItem[] = [
  { listId: 1, listName: 'Work Contacts',       description: 'Professional contacts and colleagues',  itemCount: 12, createdAt: '2026-01-10', color: '#3f51b5' },
  { listId: 2, listName: 'Personal Documents',  description: 'IDs, passports and official docs',      itemCount: 8,  createdAt: '2026-01-15', color: '#e91e63' },
  { listId: 3, listName: 'App Credentials',     description: 'App logins and web services',            itemCount: 15, createdAt: '2026-02-01', color: '#009688' },
  { listId: 4, listName: 'Bank Accounts',       description: 'Banking and financial accounts',         itemCount: 4,  createdAt: '2026-02-10', color: '#ff9800' },
  { listId: 5, listName: 'Home Inventory',      description: 'Household items and appliances',         itemCount: 6,  createdAt: '2026-03-05', color: '#9c27b0' },
  { listId: 6, listName: 'Project Ideas',       description: 'Side projects and future plans',         itemCount: 2,  createdAt: '2026-04-01', color: '#4caf50' },
];

const MOCK_ITEMS: Item[] = [
  { itemId: 1,  itemName: 'John Smith',          variantName: 'Phone Call',    listName: 'Work Contacts',      value1: '+44 7700 900001', createdAt: '2026-01-12' },
  { itemId: 2,  itemName: 'Sarah Johnson',        variantName: 'Phone Call',    listName: 'Work Contacts',      value1: '+44 7700 900002', createdAt: '2026-01-13' },
  { itemId: 3,  itemName: 'UK Passport',          variantName: 'ID Document',   listName: 'Personal Documents', value1: '12345678', value2: 'Expires 2030', createdAt: '2026-01-16' },
  { itemId: 4,  itemName: 'Driving Licence',      variantName: 'ID Document',   listName: 'Personal Documents', value1: 'SMITH123456AB', createdAt: '2026-01-17' },
  { itemId: 5,  itemName: 'Gmail',                variantName: 'App/Web',       listName: 'App Credentials',    value1: 'user@gmail.com', createdAt: '2026-02-02' },
  { itemId: 6,  itemName: 'GitHub',               variantName: 'App/Web',       listName: 'App Credentials',    value1: 'github.com/psp8300', createdAt: '2026-02-03' },
  { itemId: 7,  itemName: 'Barclays Current',     variantName: 'Bank Credentials', listName: 'Bank Accounts',   value1: '20-00-00', value2: '12345678', createdAt: '2026-02-11' },
  { itemId: 8,  itemName: 'HSBC Savings',         variantName: 'Bank Credentials', listName: 'Bank Accounts',   value1: '40-00-00', value2: '87654321', createdAt: '2026-02-12' },
  { itemId: 9,  itemName: 'Fix kitchen light',    variantName: 'Task',          listName: 'Home Inventory',     notes: 'Replace bulb in kitchen ceiling', createdAt: '2026-03-06' },
  { itemId: 10, itemName: 'DClutter Mobile App',  variantName: 'Idea',          listName: 'Project Ideas',      notes: 'Ionic + Capacitor APK demo', createdAt: '2026-04-02' },
];

const MOCK_ACTIVITIES: ActivityItem[] = [
  { logId: 1, activityId: 13, activityName: 'Team Meeting',     date: '2026-05-15', durationMinutes: 30,  notes: 'Daily standup – discussed sprint blockers and deployment status.',     createdAt: '2026-05-15T09:00:00' },
  { logId: 2, activityId: 1,  activityName: 'Phone Call',       date: '2026-05-13', durationMinutes: 15,  notes: 'Phone call with John Smith about project timeline updates.',           createdAt: '2026-05-13T14:30:00' },
  { logId: 3, activityId: 3,  activityName: 'Client Visit',     date: '2026-05-10', durationMinutes: 60,  notes: 'Client visit at Tech Solutions office for requirement gathering.',    createdAt: '2026-05-10T11:00:00' },
  { logId: 4, activityId: 5,  activityName: 'Online Meeting',   date: '2026-05-08', durationMinutes: 45,  notes: 'Online meeting with remote team via Google Meet.',                    createdAt: '2026-05-08T16:00:00' },
  { logId: 5, activityId: 7,  activityName: 'Appointment',      date: '2026-05-05', durationMinutes: 90,  notes: 'Appointment at clinic for annual health check-up.',                   createdAt: '2026-05-05T10:00:00' },
  { logId: 6, activityId: 9,  activityName: 'Emergency Call',   date: '2026-04-30', durationMinutes: 20,  notes: 'Quick call with Sarah Johnson regarding emergency contact update.',   createdAt: '2026-04-30T17:15:00' },
];

const MOCK_SCHEDULE: ScheduleEvent[] = [
  { id: 1, title: 'Team Sprint Review',   date: '2026-05-22', time: '10:00', type: 'meeting',     notes: 'Q2 sprint review with stakeholders' },
  { id: 2, title: 'Doctor Appointment',   date: '2026-05-23', time: '14:30', type: 'appointment', notes: 'Annual check-up at city clinic' },
  { id: 3, title: 'Deploy v2.0',          date: '2026-05-26', time: '09:00', type: 'task',        notes: 'Production deployment of new release' },
  { id: 4, title: 'Client Demo',          date: '2026-05-28', time: '11:00', type: 'meeting',     notes: 'Show DCMobile prototype to client' },
  { id: 5, title: 'Pay rent',             date: '2026-06-01', time: '09:00', type: 'reminder',    notes: 'Bank transfer due on 1st' },
  { id: 6, title: 'Tech Conference',      date: '2026-06-05', time: '09:00', type: 'meeting',     notes: 'Angular Conf London 2026' },
];

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class MockDataService {

  // Mutable copy so create/rename/delete survive for the session
  private lists: ListItem[] = MOCK_LISTS.map(l => ({ ...l }));

  getStats(): Observable<DashboardStats> {
    return of(MOCK_STATS);
  }

  getLists(): Observable<ListItem[]> {
    return of([...this.lists]);
  }

  addList(name: string): ListItem {
    const palette = ['#3f51b5','#e91e63','#009688','#ff9800','#9c27b0','#4caf50','#f44336','#2196f3'];
    const list: ListItem = {
      listId:      Date.now(),
      listName:    name.trim(),
      description: '',
      itemCount:   0,
      createdAt:   new Date().toISOString().split('T')[0],
      color:       palette[Math.floor(Math.random() * palette.length)],
    };
    this.lists.push(list);
    return list;
  }

  deleteList(listId: number): void {
    this.lists = this.lists.filter(l => l.listId !== listId);
  }

  renameList(listId: number, name: string): void {
    const l = this.lists.find(l => l.listId === listId);
    if (l) l.listName = name.trim();
  }

  getListItems(listId: number): Item[] {
    const list = this.lists.find(l => l.listId === listId);
    if (!list) return [];
    return MOCK_ITEMS.filter(i => i.listName === list.listName);
  }

  getItems(): Observable<Item[]> {
    return of(MOCK_ITEMS);
  }

  getActivities(): Observable<ActivityItem[]> {
    return of(MOCK_ACTIVITIES);
  }

  getSchedule(): Observable<ScheduleEvent[]> {
    return of(MOCK_SCHEDULE);
  }
}
