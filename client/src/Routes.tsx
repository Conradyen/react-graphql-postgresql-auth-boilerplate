import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Me } from "./modules/users/me";
import { Login } from "./modules/users/login";
import { Register } from "./modules/users/register";
import { Header } from "./components/Header";

export default function Routes() {
  return (
    <BrowserRouter>
      <>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/"
              render={() => (
                <div>
                  <Header />
                  <Route path="/register" component={Register} />
                  <Route path="/me" component={Me} />
                  <Route
                    exact={true}
                    path="/"
                    render={() => <div>home page</div>}
                  />
                </div>
              )}
            />
          </Switch>
        </div>
      </>
    </BrowserRouter>
  );
}
