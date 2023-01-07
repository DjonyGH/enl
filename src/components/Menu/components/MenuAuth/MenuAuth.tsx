import React from "react";
import { useHistory } from "react-router-dom";
import { EAuthState } from "types/user.types";
import { tools } from "utils/tools";
import userStore from "stores/userStore";

interface IProps {
  name: string;
  isMenuCollapsed: boolean;
  title: string;
  image: string;
}

const ProtoMenuAuth: React.FC<IProps> = (props) => {
  const { name, isMenuCollapsed, title, image } = props;

  const history = useHistory();

  const fnRedirect = () => {
    history.push("/login");
  };

  const fnLogout = () => {
    userStore.userLogout().then(() => {
      if (userStore.authState === EAuthState.Logout) {
        fnRedirect();
      }
    });
  };

  return (
    <div className="aside-param user-block" title="Пользователь">
      <div className="aside-param-min">
        <div className="btn-ico btn-ico_56">
          <span className="btn-ico__ico">
            <img src={image} alt="Изображение пользователя" />
          </span>
        </div>
      </div>

      {isMenuCollapsed ? (
        <div className="aside-param-max">
          <div className="user-block__title pl-4 pr-4">
            <div className="user-block__name">
              {name}
              {tools.isEkp() ? (
                <></>
              ) : (
                <a
                  href="#"
                  className="noundeline"
                  style={{ paddingLeft: "10px", color: "gray" }}
                  onClick={() => fnLogout()}
                  title="Выход из системы"
                >
                  Выход
                </a>
              )}
            </div>
            <div className="user-block__notice">{title}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProtoMenuAuth;
