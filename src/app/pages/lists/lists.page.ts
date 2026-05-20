import { Component, OnInit } from '@angular/core';
import { MockDataService, ListItem } from '../../services/mock-data.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
  standalone: false,
})
export class ListsPage implements OnInit {
  lists: ListItem[] = [];
  showToast = false;

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.dataService.getLists().subscribe(l => (this.lists = l));
  }

  onAdd() {
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2500);
  }
}
