import { useMatch, NavLink } from "react-router-dom";
import classNames from "classnames";
import { Tab } from "../types/Tab";

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames({
    "is-active": isActive,
  });
};

type Props = {
  tab: Tab;
};

export const TabLink: React.FC<Props> = ({ tab }) => {
  const match = useMatch(`/${tab.path}`);
  return (
    <li key={tab.id} className={getLinkClass({ isActive: !!match })}>
      <NavLink to={`/${tab.path}`}>{tab.title}</NavLink>
    </li>
  );
};
