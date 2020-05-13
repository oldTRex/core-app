import React, { Component, Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import { userContext } from "contexts/user/user.context";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";

// routes config
import routes from "../../routes";
import Loading from "components/Loading/Default";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

export default function DefaultLayout(props) {
  function signOut(e) {
    localStorage.clear();
    e.preventDefault();
    props.history.push("/login");
  }

  useEffect(() => {
    const keydown = event => {
      if (event.keyCode === 27) {
        props.history.push("/dev");
      }
    };

    document.addEventListener("keydown", keydown, false);

  }, [])
  const { user } = React.useContext(userContext);
  const perms = user.perms

  console.log(navigation)
  console.log(perms)

  return (
    <div className="app">

      <AppHeader fixed>
        <Suspense fallback={"loading..."}>
          <DefaultHeader
            onLogout={e => signOut(e)}
            history={props.history}
          />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense fallback={"loading..."}>
            <AppSidebarNav
              navConfig={perms}
              {...props}
              router={router}
            />
          </Suspense>
          {/* <AppSidebarFooter />
          <AppSidebarMinimizer /> */}
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router} />
          <Container fluid>
            <Suspense fallback={Loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard/dashboard_markets" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        {/* <AppAside fixed>
          <Suspense fallback={this.loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside> */}
      </div>
      <AppFooter>
        <Suspense fallback={<div className="ltr">loading...</div>}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
}


// class DefaultLayout extends Component {


//   static contextType = userContext

//   // loading = () => <div className="w-100 d-flex justify-content-center"><BounceLoader /></div>

//   keydown = event => {
//     if (event.keyCode === 27) {
//       this.props.history.push("/dev");
//     }
//   };
//   componentDidMount() {
//     const user = this.context

//       user.user.perms;

//     document.addEventListener("keydown", this.keydown, false);
//   }
//   signOut(e) {
//     e.preventDefault();
//     this.props.history.push("/login");
//   }

//   render() {
//     return (
//       <div className="app">
//         <AppHeader fixed>
//           <Suspense fallback={"loading..."}>
//             <DefaultHeader
//               onLogout={e => this.signOut(e)}
//               history={this.props.history}
//             />
//           </Suspense>
//         </AppHeader>
//         <div className="app-body">
//           <AppSidebar fixed display="lg">
//             <AppSidebarHeader />
//             <AppSidebarForm />
//             <Suspense fallback={"loading..."}>
//               <AppSidebarNav
//                 navConfig={this.props}
//                 {...this.props}
//                 router={router}
//               />
//             </Suspense>
//             {/* <AppSidebarFooter />
//             <AppSidebarMinimizer /> */}
//           </AppSidebar>
//           <main className="main">
//             <AppBreadcrumb appRoutes={routes} router={router} />
//             <Container fluid>
//               <Suspense fallback={Loading()}>
//                 <Switch>
//                   {routes.map((route, idx) => {
//                     return route.component ? (
//                       <Route
//                         key={idx}
//                         path={route.path}
//                         exact={route.exact}
//                         name={route.name}
//                         render={props => <route.component {...props} />}
//                       />
//                     ) : null;
//                   })}
//                   <Redirect from="/" to="/dashboard/dashboard_markets" />
//                 </Switch>
//               </Suspense>
//             </Container>
//           </main>
//           {/* <AppAside fixed>
//             <Suspense fallback={this.loading()}>
//               <DefaultAside />
//             </Suspense>
//           </AppAside> */}
//         </div>
//         <AppFooter>
//           <Suspense fallback={<div className="ltr">loading...</div>}>
//             <DefaultFooter />
//           </Suspense>
//         </AppFooter>
//       </div>
//     );
//   }
// }

// export default DefaultLayout;
