import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

let STORAGE_KEY = 'cgw_storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  timeSnapshotJson = {}

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  public storeOnCgwLocalStorage(key?: string, value?: string): void {
    if (key != 'cgw_storage') {
      this.timeSnapshotJson = this.getFromCgwLocalStorage();
      this.timeSnapshotJson[key] = value;
      this.storage.set(STORAGE_KEY, this.timeSnapshotJson);
    } else {
      this.storage.set('cgw_storage', value);
    }
    
  }

  public getFromCgwLocalStorage(key?: string) {
    if (this.storage.has(STORAGE_KEY)) {
      if (key != undefined) {
        return this.storage.get(STORAGE_KEY)[key];
      }
      return this.storage.get(STORAGE_KEY)
    };
    return {};
  }

  public keyExists(key: string): boolean {
    if (this.storage.has(STORAGE_KEY)) {
      if (Object.keys(this.storage.get(STORAGE_KEY)).indexOf(key) > -1) {
        return true;
      };
    };
    return false;
  }

  public deleteCgwLocalStorage(): void {
    this.storage.remove(STORAGE_KEY);
  }

}
