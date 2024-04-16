import { FavoriteLocationStub } from "./favoriteLocationStub";

export class LocalStorageServiceStub {
  setData = (key: string, value: any) => {}
  getData = (key: string) => ''
  isDataExist = (key: string) => true
  getFavoritesListFromStorage = () => [FavoriteLocationStub, FavoriteLocationStub]
}
