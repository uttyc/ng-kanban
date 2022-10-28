import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment'
import { Card } from '../models/card'
import { List } from '../models/list'
import {MoveCard} from "../models/movecard";
@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor(private http: HttpClient) { }

  getCards(listId: string): Observable<any> {
    const url = environment.kanbanApiBaseUrl + 'Cards/CardsByList/' + listId;
    return this.http.get(url).pipe(
      map((res: any) => res),
      catchError((err) => throwError(err))
    );
  }
  deleteCard(cardId: string): Observable<any> {
    const url = environment.kanbanApiBaseUrl + 'Cards/' + cardId;
    return this.http.delete(url).pipe(
      map((res: any) => res),
      catchError((err) => throwError(err))
    );
  }
  moveCard(moveCard: MoveCard): Observable<any> {
    const url = environment.kanbanApiBaseUrl + 'Cards/MoveCard'
    console.log("Move card model")
    console.log(moveCard)
    return this.http.post(url, moveCard).pipe(
      map((res: any) => res),
      catchError((err) => throwError(err))
    );
  }
  getLists(): Observable<List[]> {
    const url = environment.kanbanApiBaseUrl + 'Lists';
    return this.http.get(url).pipe(
      map((res: any) => res),
      catchError((err) => throwError(err))
    );
  }
  saveCard(card: Card): Observable<any> {
    const url = environment.kanbanApiBaseUrl + 'Cards';
    return this.http.post(url, card).pipe(
      map((res: any) => res),
      catchError((err) => throwError(err))
    )
  }
  saveList(list: List): Observable<any> {
    const url = environment.kanbanApiBaseUrl + 'Lists';
    return this.http.post(url, list).pipe(
      map((res: any) => res),
      catchError((err) => throwError(err))
    )
  }
  updateList(list: List): Observable<any> {
    const url = environment.kanbanApiBaseUrl + `Lists/${list.id}`;
    return this.http.put(url, list).pipe(
      map((res: any) => res),
      catchError((err) => throwError(err))
    )
  }
  deleteList(listId: string): Observable<any> {
    const url = environment.kanbanApiBaseUrl + `Lists/${listId}`;
    return this.http.delete(url).pipe(
      map((res: any) => res),
      catchError((err) => throwError(err))
    )
  }
}
