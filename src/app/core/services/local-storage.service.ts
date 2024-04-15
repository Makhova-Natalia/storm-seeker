import { Injectable } from '@angular/core';
import { FavoriteLocation } from "../models/weather.model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  setData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }
  }

  isDataExist(key: string): boolean {
    return Boolean(localStorage.getItem(key));
  }

  getFavoritesListFromStorage(): FavoriteLocation[] {
    return this.getData('favorites')
  }
}
