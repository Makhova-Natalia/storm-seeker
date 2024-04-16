import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading$$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoading(loading: boolean): void {
    this.loading$$.next(loading);
  }

  getLoading(): Observable<boolean> {
    return this.loading$$.asObservable();
  }
}
