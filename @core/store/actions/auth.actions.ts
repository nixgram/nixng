import { createAction, props } from "@ngrx/store";
import { AuthActionTypes } from "@core/store/types/AuthActionTypes";
import { ILoginRequest } from "@core/interfaces";
import { IUserInfo } from "@core/interfaces/IUserInfo";
import { ILoginResponse } from "@core/interfaces/ILoginResponse";

export const LoadingLoginAction = createAction(AuthActionTypes.LOADING_LOGIN, props<{ payload: ILoginRequest }>());
export const LoadingLoginSuccessAction = createAction(AuthActionTypes.LOADING_LOGIN_SUCCESS, props<{ payload: IUserInfo }>());
export const LoadingLoginFailedAction = createAction(AuthActionTypes.LOADING_LOGIN_FAILED, props<{ payload: any }>());
export const LoadingLogoutAction = createAction(AuthActionTypes.LOADING_LOGOUT);
export const LoadingLogoutSuccessAction = createAction(AuthActionTypes.LOADING_LOGOUT_SUCCESS);
export const LoadingLogoutFailedAction = createAction(AuthActionTypes.LOADING_LOGOUT_FAILED, props<{ payload: any }>());
export const StoreTokenAction = createAction(AuthActionTypes.STORE_TOKEN, props<{ payload: ILoginResponse }>());
export const RemoveTokenAction = createAction(AuthActionTypes.REMOVE_TOKEN);
