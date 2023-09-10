import React, { useContext, useEffect, useState } from "react";
import CustomThemeContext from "../../contexts/customThemeContext";

import UserContext from "../../contexts/userContext";
import userService from "../../services/userService";
import { convertTheme } from "../../utils";
import {
  SettingsContainer,
  SettingsColorContainer,
  SettingsSpanColor,
  SettingsAvatarContainer
} from "./styles";


function Settings() {

  const [userPrimaryColor, setUserPrimaryColor] = useState('');
  const [userTextColor, setUserTextColor] = useState('');
  const [userImageLink, setUserImageLink] = useState('');
  const { user, setUser } = useContext(UserContext);
  const { theme, defineUserTheme } = useContext(CustomThemeContext);
  const formRef = React.createRef();

  useEffect(() => {
    async function getSettings() {
      const { data } = await userService.getSettings();
      const { theme: userDBTheme } = data;
      const convertedTheme = convertTheme(userDBTheme);
      setUserPrimaryColor(convertedTheme.primary || '');
      setUserTextColor(convertedTheme.text || '');
      setUserImageLink(data.avatar)
    }
    getSettings();

  }, [user]);

  function restoreToCurrentValues() {
    setUserPrimaryColor(theme.primary);
    setUserTextColor(theme.text);
    setUserImageLink(userImageLink);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      theme: JSON.stringify({ primary: userPrimaryColor, text: userTextColor }),
      avatar: userImageLink
    }

    userService.saveSettings(data).then(response => {
      const { email, name, avatar, theme } = response.data;

      restoreToCurrentValues();
      setUser({ email, name, avatar });
      defineUserTheme(theme);

    }).catch(error => {
      console.error(error);
    });
  }

  function renderThemeColors() {
    return (
      <SettingsColorContainer>
        <label className='colorLabel'>Tema: </label>
        <div>
          <label>Cor primária:</label>
          <input type='color' value={userPrimaryColor} onChange={(e) => setUserPrimaryColor(e.target.value)} />
          <SettingsSpanColor title={userPrimaryColor} spanColor={userPrimaryColor}>
            {userPrimaryColor}
          </SettingsSpanColor>
        </div>
        <div>
          <label>Cor do texto:</label>
          <input type='color' value={userTextColor} onChange={(e) => setUserTextColor(e.target.value)} />
          <SettingsSpanColor title={userTextColor} spanColor={userTextColor}>
            {userTextColor}
          </SettingsSpanColor>
        </div>
      </SettingsColorContainer>
    );
  }

  function renderAvataSelector() {
    return (
      <SettingsAvatarContainer>
        <label className='colorLabel'>Avatar: </label>
        <div>
          <input id='imageLink' type='url' value={userImageLink} onChange={(e) => setUserImageLink(e.target.value)} />
        </div>
        <label className='colorLabel'>Pré-visualização: </label>
        {
          userImageLink
            ? (
              <div>
                <img src={userImageLink} style={{ width: '64px', height: '64px' }} alt='Temp File' />
              </div>
            )
            : <></>
        }

      </SettingsAvatarContainer>
    );
  }

  return (
    <SettingsContainer>
      <form onSubmit={handleSubmit}>
        <div className='settingsFormContent'>
          {renderThemeColors()}
          {renderAvataSelector()}
        </div>
        <div>
          <button type='submit'>Salvar</button> &nbsp;
          <button onClick={restoreToCurrentValues}>Cancelar</button>
        </div>
      </form>

    </SettingsContainer >
  )
}

export { Settings };
