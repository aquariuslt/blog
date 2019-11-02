import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import List from '@theme-react/views/List';
import { buildURLPath } from '@blog/common/utils/path.util';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';

// I must use Angular Style Routing for stupid react router philosophy
export const routes = [
  {
    path: '/',
    exact: true,
    component: List,
    apiPath: () => buildURLPath(RoutePathPrefix.HOME_ALIAS)
  },
  {
    path: '/posts/:year/:month/:date/:id',
    exact: true,
    component: loadable(() =>
      import(
        /* webpackChunkName: "detail" */
        './views/Detail'
      )
    ),
    apiPath: (match) =>
      buildURLPath(
        RoutePathPrefix.POSTS,
        match.params['year'],
        match.params['month'],
        match.params['date'],
        match.params['id']
      )
  },
  {
    path: '/posts',
    exact: true,
    component: List,
    apiPath: () => buildURLPath(RoutePathPrefix.POSTS)
  },
  {
    path: '/categories/:category',
    exact: true,
    component: List,
    apiPath: (match) => buildURLPath(RoutePathPrefix.CATEGORIES, match.params['category'])
  },
  {
    path: '/tags/:tag',
    exact: true,
    component: List,
    apiPath: (match) => buildURLPath(RoutePathPrefix.TAGS, match.params['tag'])
  }
];

export const RouterView: React.FC = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component {...props} apiPath={route.apiPath(props.match)} />}
          />
        ))}
      </Switch>
    </Router>
  );
};
