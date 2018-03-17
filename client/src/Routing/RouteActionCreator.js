import keyMirror from 'keymirror';

export const RouteActions = keyMirror({
  CHANGE_ROUTE_PENDING: null,
});

export const changeRoute = (path) => {
  return {
    type: RouteActions.CHANGE_ROUTE_PENDING,
    payload: path,
  };
};
