import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { authPages, pages } from "./routes";
import { storage } from "services";
import { useSelector } from "react-redux";
import { get } from "lodash";
// import { useTranslation } from "react-i18next";
import Layout from "components/layout";
import NotFound from 'components/not-found'
import Loader from "components/loader";
// import { useSelector } from "react-redux";
// import { get } from "lodash";

const appRoutes = (routes) => {
  return routes.map((route, key) => (
    
    <React.Fragment key={key}>
      <Route
        path={route.path}
        element={<Suspense fallback={<Loader/>}>{route.component}</Suspense>}
      />
      {route.children && appRoutes(route.children)}
    </React.Fragment>
  ));
};

const routesWrapper = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => get(state, "auth"));
  // const isAuthenticated = true;
  // const { i18n } = useTranslation();
  // if (i18n.language == "ru-RU") {
  //   i18n.changeLanguage("ru");
  // }
  
  const {role} = useSelector((state) => state.auth.data);
  // const role = "manager";

  return (
		<Routes>
			<Route
				path='*'
				element={
					<h2>
						<NotFound />
					</h2>
				}
			/>
			{isAuthenticated ? (
				<Route path='/' element={<Layout />}>
					{appRoutes(pages[role])}
				</Route>
			) : (
				appRoutes(authPages)
			)}
		</Routes>
	)
  // return <Routes>{appRoutes(privateRoutes)}</Routes>;
};

export default routesWrapper;
