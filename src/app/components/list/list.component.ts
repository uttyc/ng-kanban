import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../models/card';
import {List} from '../../models/list';
import {KanbanService} from '../../services/kanban.service';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, CDK_DROP_LIST_GROUP} from '@angular/cdk/drag-drop';
import {MoveCard} from "../../models/movecard";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cards: Card[] = []
  lists: List[] = []
  cardDesc: string = ""
  droppedCard: Card = <Card>{};
  isHidden: boolean = true
  editMode: boolean = false;
  visible: boolean = false;
  draggedCard: Card = <Card>{};
  emptyGuid: string = '00000000-0000-0000-0000-000000000000'
  @Input() listId: string = ""
  @Input() listName: string = ""
  @Output() onReload: EventEmitter<string> = new EventEmitter();
  @Output() changeMode: EventEmitter<boolean> = new EventEmitter();

  constructor(private kanbanService: KanbanService) {
  }

  ngOnInit(): void {
    this.initCards()
    this.initLists()
  }
  initLists() {
    this.kanbanService.getLists().subscribe(res => {
      this.lists = res
    })
  }
  initCards() {
    this.kanbanService.getCards(this.listId).subscribe(res => {
      const {listId, listName, cards} = res;
      this.cards = cards
      this.listId = listId
      this.listName = listName
    })
  }

  saveCard(event: any) {
    if (event.code == "Enter") {
      const card = <Card>{
        listId: this.listId,
        description: this.cardDesc
      }
      this.kanbanService.saveCard(card).subscribe(res => {
        this.initCards()
        this.cardDesc = ""
      })
    }
  }

  saveList(event: any) {
    if (event.code == "Enter" || event.code == "NumpadEnter") {
      const list = <List>{
        id: this.listId,
        description: this.listName
      }
      this.kanbanService.updateList(list).subscribe(res => {
        this.editMode = false
      })
    }
  }

  deleteList(listId: string) {
    this.kanbanService.deleteList(listId).subscribe(res => {
      location.reload();
    })

  }

  reloadList(event: any) {
    this.onReload.emit(this.listId)
    this.initCards()

  }
  toggleMode(mode: boolean) {
    this.editMode = mode
    this.changeMode.emit(this.editMode)
  }
  toggleVisibility() {
    this.visible = !this.visible
  }
  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      let moveCardModel = <MoveCard>{
        cardToMove: event.item.data,
        targetListId: this.listId
      }
      this.kanbanService.moveCard(moveCardModel).subscribe(res => {
        this.initCards()
      })

    }
  }




}
