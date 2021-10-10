import { AuthState } from "@core/store/states/app/auth.state";

export interface AppState {
  readonly auth: AuthState
}
