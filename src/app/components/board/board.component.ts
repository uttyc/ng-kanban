import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { List } from '../../models/list';
import { KanbanService } from '../../services/kanban.service';
import { Card } from "../../models/card";
import {ListComponent} from "../list/list.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  lists: List[] = []
  listDesc: string = ""
  @Output() changeEditMode: EventEmitter<boolean> = new EventEmitter();

  constructor(private kanbanService: KanbanService) { }

  editMode: boolean = false;

  ngOnInit(): void {
    this.initLists()
  }
  initLists() {
    this.kanbanService.getLists().subscribe(res => {
      this.lists = res
    })
  }
  saveList(event: any) {
    if (event.code == "Enter") {
      const list = <List>{
        description: this.listDesc
      }
      this.kanbanService.saveList(list).subscribe(res => {
        this.initLists()
        this.listDesc = ""
      })
    }
  }
  toggleMode(mode: boolean) {
    this.editMode = mode

  }
  changeMode(event: any) {
    this.changeEditMode.emit(this.editMode)
  }


}
