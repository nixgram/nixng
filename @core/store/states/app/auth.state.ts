import { IUserInfo } from "@core/interfaces/IUserInfo";
import { ILoginResponse } from "@core/interfaces/ILoginResponse";

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: Error | null;
  userInfo: IUserInfo | null;
  credentials: ILoginResponse | null
}
