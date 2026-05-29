import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// ─── Workday Interfaces ───────────────────────────────────────────────────────

export interface WorkdaySession {
  sessionId: number;
  status: 'Active' | 'Completed';
  loginTime: string;
  logoutTime?: string;
  location: 'Office' | 'Home';
}

export interface WorkActivity {
  activityId: number;
  activityType: 'SystemWork' | 'LunchBreak' | 'CoffeeBreak' | 'PersonalBreak' | 'ScreenLock';
  startTime: string;
  endTime?: string;
  durationMinutes?: number;
  location: string;
  taskName?: string;
}

export interface AttendanceRecord {
  sessionDate: string;
  loginTime: string;
  logoutTime?: string;
  totalDurationMins: number;
  breakDurationMins: number;
  netTimeMins: number;
  earnings: number;
  status: 'Active' | 'Completed' | 'Absent';
  location: string;
  userName: string;
  userId: number;
}

export interface TeamMemberStatus {
  userId: number;
  displayName: string;
  role: string;
  sessionStatus: 'Active' | 'Completed' | 'NotStarted';
  location?: string;
  loginTime?: string;
  logoutTime?: string;
  netTimeMins?: number;
  breakDurationMins?: number;
  earnings?: number;
  currentActivity?: string;
  activityStartTime?: string;
}

// ─── Workday Mock Data ────────────────────────────────────────────────────────

const TODAY = '2026-05-29';
const NOW_ISO = new Date().toISOString();

const MOCK_SESSION: WorkdaySession = {
  sessionId: 1001,
  status: 'Active',
  loginTime: `${TODAY}T09:03:00`,
  location: 'Office',
};

const MOCK_WORK_HISTORY: WorkActivity[] = [
  { activityId: 1, activityType: 'SystemWork',   startTime: `${TODAY}T09:03:00`, endTime: `${TODAY}T10:45:00`, durationMinutes: 102, location: 'Office', taskName: 'DClutter Mobile – workday pages' },
  { activityId: 2, activityType: 'CoffeeBreak',  startTime: `${TODAY}T10:45:00`, endTime: `${TODAY}T11:00:00`, durationMinutes: 15,  location: 'Office' },
  { activityId: 3, activityType: 'SystemWork',   startTime: `${TODAY}T11:00:00`, endTime: `${TODAY}T13:00:00`, durationMinutes: 120, location: 'Office', taskName: 'DClutter Mobile – workday pages' },
  { activityId: 4, activityType: 'LunchBreak',   startTime: `${TODAY}T13:00:00`, endTime: `${TODAY}T13:45:00`, durationMinutes: 45,  location: 'Office' },
  { activityId: 5, activityType: 'SystemWork',   startTime: `${TODAY}T13:45:00`, endTime: undefined,           durationMinutes: undefined, location: 'Office', taskName: 'Routing & mock data' },
];

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { sessionDate: TODAY,         loginTime: `${TODAY}T09:03:00`,         logoutTime: undefined,              totalDurationMins: 0,   breakDurationMins: 60,  netTimeMins: 0,   earnings: 0,     status: 'Active',    location: 'Office', userName: 'Demo User', userId: 1 },
  { sessionDate: '2026-05-28',  loginTime: '2026-05-28T08:58:00',       logoutTime: '2026-05-28T17:10:00',  totalDurationMins: 492, breakDurationMins: 55,  netTimeMins: 437, earnings: 875,   status: 'Completed', location: 'Office', userName: 'Demo User', userId: 1 },
  { sessionDate: '2026-05-27',  loginTime: '2026-05-27T09:12:00',       logoutTime: '2026-05-27T17:00:00',  totalDurationMins: 468, breakDurationMins: 65,  netTimeMins: 403, earnings: 806,   status: 'Completed', location: 'Home',   userName: 'Demo User', userId: 1 },
  { sessionDate: '2026-05-26',  loginTime: '2026-05-26T09:00:00',       logoutTime: '2026-05-26T17:30:00',  totalDurationMins: 510, breakDurationMins: 50,  netTimeMins: 460, earnings: 920,   status: 'Completed', location: 'Office', userName: 'Demo User', userId: 1 },
  { sessionDate: '2026-05-23',  loginTime: '2026-05-23T09:05:00',       logoutTime: '2026-05-23T17:15:00',  totalDurationMins: 490, breakDurationMins: 70,  netTimeMins: 420, earnings: 840,   status: 'Completed', location: 'Office', userName: 'Demo User', userId: 1 },
  { sessionDate: '2026-05-22',  loginTime: '2026-05-22T09:00:00',       logoutTime: '2026-05-22T17:00:00',  totalDurationMins: 480, breakDurationMins: 60,  netTimeMins: 420, earnings: 840,   status: 'Completed', location: 'Home',   userName: 'Demo User', userId: 1 },
  { sessionDate: '2026-05-21',  loginTime: '2026-05-21T08:55:00',       logoutTime: '2026-05-21T17:05:00',  totalDurationMins: 490, breakDurationMins: 45,  netTimeMins: 445, earnings: 890,   status: 'Completed', location: 'Office', userName: 'Demo User', userId: 1 },
  { sessionDate: '2026-05-20',  loginTime: '2026-05-20T09:10:00',       logoutTime: '2026-05-20T17:10:00',  totalDurationMins: 480, breakDurationMins: 60,  netTimeMins: 420, earnings: 840,   status: 'Completed', location: 'Office', userName: 'Demo User', userId: 1 },
  { sessionDate: '2026-05-19',  loginTime: '2026-05-19T09:00:00',       logoutTime: '2026-05-19T17:00:00',  totalDurationMins: 480, breakDurationMins: 55,  netTimeMins: 425, earnings: 850,   status: 'Completed', location: 'Home',   userName: 'Demo User', userId: 1 },
];

const MOCK_TEAM: TeamMemberStatus[] = [
  {
    userId: 1, displayName: 'Demo User', role: 'Employee',
    sessionStatus: 'Active', location: 'Office',
    loginTime: `${TODAY}T09:03:00`, netTimeMins: 330, breakDurationMins: 60,
    earnings: 660, currentActivity: 'SystemWork', activityStartTime: `${TODAY}T13:45:00`,
  },
  {
    userId: 2, displayName: 'Priya Sharma', role: 'Manager',
    sessionStatus: 'Active', location: 'Office',
    loginTime: `${TODAY}T08:50:00`, netTimeMins: 355, breakDurationMins: 45,
    earnings: 1065, currentActivity: 'SystemWork', activityStartTime: `${TODAY}T14:00:00`,
  },
  {
    userId: 3, displayName: 'Arjun Mehta', role: 'Employee',
    sessionStatus: 'Active', location: 'Home',
    loginTime: `${TODAY}T09:30:00`, netTimeMins: 285, breakDurationMins: 30,
    earnings: 570, currentActivity: 'LunchBreak', activityStartTime: `${TODAY}T13:30:00`,
  },
  {
    userId: 4, displayName: 'Kavya Reddy', role: 'Employee',
    sessionStatus: 'Completed', location: 'Office',
    loginTime: `${TODAY}T08:45:00`, logoutTime: `${TODAY}T14:30:00`,
    netTimeMins: 300, breakDurationMins: 45, earnings: 600,
  },
  {
    userId: 5, displayName: 'Ravi Nair', role: 'Employee',
    sessionStatus: 'NotStarted', location: 'Office',
  },
];

const ALL_TEAM_ATTENDANCE: AttendanceRecord[] = [
  // Demo User - recent days
  { sessionDate: TODAY,         loginTime: `${TODAY}T09:03:00`,         logoutTime: undefined,              totalDurationMins: 0,   breakDurationMins: 60,  netTimeMins: 0,   earnings: 0,    status: 'Active',    location: 'Office', userName: 'Demo User',   userId: 1 },
  { sessionDate: '2026-05-28',  loginTime: '2026-05-28T08:58:00',       logoutTime: '2026-05-28T17:10:00',  totalDurationMins: 492, breakDurationMins: 55,  netTimeMins: 437, earnings: 875,  status: 'Completed', location: 'Office', userName: 'Demo User',   userId: 1 },
  { sessionDate: '2026-05-27',  loginTime: '2026-05-27T09:12:00',       logoutTime: '2026-05-27T17:00:00',  totalDurationMins: 468, breakDurationMins: 65,  netTimeMins: 403, earnings: 806,  status: 'Completed', location: 'Home',   userName: 'Demo User',   userId: 1 },
  // Priya Sharma
  { sessionDate: TODAY,         loginTime: `${TODAY}T08:50:00`,         logoutTime: undefined,              totalDurationMins: 0,   breakDurationMins: 45,  netTimeMins: 355, earnings: 1065, status: 'Active',    location: 'Office', userName: 'Priya Sharma', userId: 2 },
  { sessionDate: '2026-05-28',  loginTime: '2026-05-28T09:00:00',       logoutTime: '2026-05-28T18:00:00',  totalDurationMins: 540, breakDurationMins: 60,  netTimeMins: 480, earnings: 1440, status: 'Completed', location: 'Office', userName: 'Priya Sharma', userId: 2 },
  { sessionDate: '2026-05-27',  loginTime: '2026-05-27T09:05:00',       logoutTime: '2026-05-27T17:30:00',  totalDurationMins: 505, breakDurationMins: 55,  netTimeMins: 450, earnings: 1350, status: 'Completed', location: 'Office', userName: 'Priya Sharma', userId: 2 },
  // Arjun Mehta
  { sessionDate: TODAY,         loginTime: `${TODAY}T09:30:00`,         logoutTime: undefined,              totalDurationMins: 0,   breakDurationMins: 30,  netTimeMins: 285, earnings: 570,  status: 'Active',    location: 'Home',   userName: 'Arjun Mehta',  userId: 3 },
  { sessionDate: '2026-05-28',  loginTime: '2026-05-28T09:15:00',       logoutTime: '2026-05-28T17:00:00',  totalDurationMins: 465, breakDurationMins: 50,  netTimeMins: 415, earnings: 830,  status: 'Completed', location: 'Home',   userName: 'Arjun Mehta',  userId: 3 },
  // Kavya Reddy
  { sessionDate: TODAY,         loginTime: `${TODAY}T08:45:00`,         logoutTime: `${TODAY}T14:30:00`,    totalDurationMins: 345, breakDurationMins: 45,  netTimeMins: 300, earnings: 600,  status: 'Completed', location: 'Office', userName: 'Kavya Reddy',  userId: 4 },
  { sessionDate: '2026-05-28',  loginTime: '2026-05-28T08:55:00',       logoutTime: '2026-05-28T17:05:00',  totalDurationMins: 490, breakDurationMins: 55,  netTimeMins: 435, earnings: 870,  status: 'Completed', location: 'Office', userName: 'Kavya Reddy',  userId: 4 },
];

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

  // ─── Workday Methods ─────────────────────────────────────────────────────────

  getWorkdaySession(): Observable<WorkdaySession | null> {
    return of(MOCK_SESSION);
  }

  getWorkHistory(): Observable<WorkActivity[]> {
    return of(MOCK_WORK_HISTORY);
  }

  getAttendance(period: 'day' | 'week' | 'month', viewDate: Date): Observable<AttendanceRecord[]> {
    const filtered = MOCK_ATTENDANCE.filter(r => {
      const d = new Date(r.sessionDate);
      if (period === 'day') return r.sessionDate === viewDate.toISOString().split('T')[0];
      if (period === 'week') {
        const ws = this.weekStart(viewDate);
        const we = new Date(ws.getTime() + 6 * 86400000);
        return d >= ws && d <= we;
      }
      return d.getFullYear() === viewDate.getFullYear() && d.getMonth() === viewDate.getMonth();
    });
    return of(filtered);
  }

  getTeamLiveStatus(): Observable<TeamMemberStatus[]> {
    return of(MOCK_TEAM);
  }

  getTeamAttendance(period: 'day' | 'week' | 'month', viewDate: Date, userId?: number): Observable<AttendanceRecord[]> {
    let records = userId ? ALL_TEAM_ATTENDANCE.filter(r => r.userId === userId) : ALL_TEAM_ATTENDANCE;
    records = records.filter(r => {
      const d = new Date(r.sessionDate);
      if (period === 'day') return r.sessionDate === viewDate.toISOString().split('T')[0];
      if (period === 'week') {
        const ws = this.weekStart(viewDate);
        const we = new Date(ws.getTime() + 6 * 86400000);
        return d >= ws && d <= we;
      }
      return d.getFullYear() === viewDate.getFullYear() && d.getMonth() === viewDate.getMonth();
    });
    return of(records);
  }

  private weekStart(d: Date): Date {
    const r = new Date(d);
    const diff = r.getDay() === 0 ? -6 : 1 - r.getDay();
    r.setDate(r.getDate() + diff);
    r.setHours(0, 0, 0, 0);
    return r;
  }
}
