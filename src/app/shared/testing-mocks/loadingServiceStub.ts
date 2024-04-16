import { of } from "rxjs";

export class LoadingServiceStub {
  setLoading = (loading: boolean) => {}
  getLoading = () => of(true)
}
