import { all } from "redux-saga/effects";
import { authenticationSagas } from './Authentication/AuthenticationSagas';


export default function* rootSaga() {
  yield all([
    ...authenticationSagas,
  ]);
}
