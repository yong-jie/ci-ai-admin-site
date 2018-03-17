import { all } from "redux-saga/effects";
import { authenticationSagas } from './Authentication/AuthenticationSagas';
import { routeSagas } from './Routing/RouteSagas';


export default function* rootSaga() {
  yield all([
      ...authenticationSagas,
      ...routeSagas,
  ]);
}
