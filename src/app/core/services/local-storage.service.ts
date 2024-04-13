import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

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

  clearData(key: string): void {
    localStorage.removeItem(key);
  }
}
