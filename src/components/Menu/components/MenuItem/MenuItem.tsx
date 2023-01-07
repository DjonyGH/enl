import React from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import appStore from "stores/appStore";
import { observer } from "mobx-react";

interface IProps {
  isActive: boolean;
  image: string;
  title: string;
  path: string;
  disabled?: boolean;
  iconStyle?: React.CSSProperties;
}

const MenuItem: React.FC<IProps> = (props) => {
  const { isActive, image, title, path, disabled, iconStyle } = props;

  const cnActive = cn(
    "aside-param",
    "menu-main__item",
    "menu-main__item_active"
  );
  const cnInactive = cn("aside-param", "menu-main__item");

  return (
    <NavLink to={disabled ? "" : path}>
      <button
        type="button"
        className={isActive ? cnActive : cnInactive}
        title={title}
      >
        <div className="aside-param-min">
          <div className="menu-main__item-ico btn-ico btn-ico_56">
            <span className="btn-ico__ico" style={iconStyle}>
              <img src={image} alt={title} />
            </span>
          </div>
        </div>

        {!appStore.isMenuCollapsed ? (
          <div className="aside-param-max">
            <div className="menu-main__item-title pl-4 pr-4">
              <div className="menu-main__item-name">{title}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </button>
    </NavLink>
  );
};

export default observer(MenuItem);
