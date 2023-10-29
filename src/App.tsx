import React, { Suspense, useState, lazy } from "react";
// eslint-disable-next-line prettier/prettier
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import tabsFromServer from "./api/tabs.json";
import { TabLink } from "./components/TabLink";
import { Tab } from "./types/Tab";
import "./App.css";

const orderTabs = (tabs: Tab[]) =>
  tabs.sort((a: Tab, b: Tab) => a.order - b.order);

const App: React.FC = () => {
  const [tabs] = useState<Tab[]>(tabsFromServer);

  const orderedTabs = orderTabs(tabs);

  // useEffect(() => {
  //   fetch('./api/tabs.json')
  //     .then(response => response.json())
  //     .then(data => setTabs(data.sort((a: Tab, b: Tab) => a.order - b.order)));
  // }, []);

  return (
    <Router>
      <div className="section all-height">
        <div className="tabs is-boxed">
          <ul className="tab-links">
            {orderedTabs.map((tab) => (
              <TabLink key={tab.id} tab={tab} />
            ))}
          </ul>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={`/${tabs[0].path}`} replace />}
              />

              {orderedTabs.map((tab) => {
                const TabComponent = lazy(
                  () => import(`./components/${tab.path}`)
                );

                return (
                  <Route
                    key={tab.id}
                    path={`/${tab.path}`}
                    element={<TabComponent />}
                  />
                );
              })}
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;
