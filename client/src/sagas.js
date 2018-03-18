import { all } from "redux-saga/effects";
import { authenticationSagas } from './Authentication/AuthenticationSagas';
import { routeSagas } from './Routing/RouteSagas';
import { temperatureTakingSagas } from './TemperatureTaking/TemperatureSagas';


export default function* rootSaga() {
  yield all([
      ...authenticationSagas,
      ...routeSagas,
      ...temperatureTakingSagas,
  ]);
}
