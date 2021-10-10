import { Action, createReducer, on } from "@ngrx/store";
import { AuthState } from "@core/store/states/app/auth.state";
import {
  LoadingLoginAction,
  LoadingLoginFailedAction,
  LoadingLoginSuccessAction,
  LoadingLogoutAction,
  LoadingLogoutFailedAction,
  LoadingLogoutSuccessAction,
  RemoveTokenAction,
  StoreTokenAction
} from "@core/store/actions/auth.actions";


const initialState: AuthState = {
  error: null,
  isLoggedIn: false,
  loading: false,
  userInfo: null,
  credentials: null
}

const _authReducer = createReducer(initialState,
  on(LoadingLoginAction, (state: AuthState) => ({...state, loading: true})),
  on(LoadingLoginSuccessAction, (state: AuthState, {payload}) => ({
    ...state,
    loading: false,
    isLoggedIn: true,
    userInfo: payload,
    error: null
  })),
  on(LoadingLoginFailedAction, (state: AuthState, {payload}) => ({
    ...state,
    loading: false,
    error: payload,
    userInfo: null,
    isLoggedIn: false
  })),
  on(LoadingLogoutAction, (state: AuthState) => ({...state, loading: true})),
  on(LoadingLogoutSuccessAction, (state: AuthState) => ({
    ...state,
    loading: false,
    error: null,
    isLoggedIn: false,
    userInfo: null
  })),
  on(LoadingLogoutFailedAction, (state: AuthState, {payload}) => ({
    ...state,
    loading: false,
    isLoggedIn: false,
    error: payload
  })),
  on(StoreTokenAction, (state: AuthState, {payload}) => ({
    ...state,
    credentials: payload
  })),
  on(RemoveTokenAction, (state: AuthState) => ({...state, credentials: null}))
)

export const AuthReducer = (state = initialState, action: Action) => _authReducer(state, action);
