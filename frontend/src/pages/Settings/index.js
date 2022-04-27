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
  const [tempFilePreview, setTempFilePreview] = useState('');
  const { user, setUser } = useContext(UserContext);
  const { theme, defineUserTheme } = useContext(CustomThemeContext);
  const formRef = React.createRef();
  const fileRef = React.createRef();
  const ACCEPTED_FILE_TYPES = 'image/png, image/jpg, image/jpeg'

  useEffect(() => {
    async function getSettings() {
      const { data } = await userService.getSettings();
      const { theme: userDBTheme } = data;
      const convertedTheme = convertTheme(userDBTheme);
      setUserPrimaryColor(convertedTheme.primary || '');
      setUserTextColor(convertedTheme.text || '');
    }
    getSettings();

  }, [user]);

  function isSameData() {
    const isSamePrimary = (userPrimaryColor && theme && theme.primary && userPrimaryColor == theme.primary);
    const isSameText = (userTextColor && theme && theme.primary && userTextColor == theme.text);
    return isSamePrimary && isSameText && !tempFilePreview;
  }

  function restoreToCurrentValues() {
    if (formRef.current) {
      formRef.current.reset();
    }
    setUserPrimaryColor(theme.primary);
    setUserTextColor(theme.text);
    setTempFilePreview(null);
  }

  function renderAvatarUploaded() {
    return user && user.avatar
      ? (
        <div>
          <span>{user.avatar}</span>
          <div>
            <img src={user.avatar} style={{ width: '64px', height: '64px' }} alt='User Avatar' />
          </div>
        </div>
      )
      : <></>
  }

  function onFileChange(e) {
    setTempFilePreview(URL.createObjectURL(e.target.files[0]));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTheme = { primary: userPrimaryColor, text: userTextColor };

    const formdata = new FormData();
    formdata.append('theme', JSON.stringify(newTheme));
    formdata.append("userAvatar", fileRef.current.files[0], fileRef.current.files[0].name);

    userService.saveSettings(formdata).then(response => {
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
          <label htmlFor='uploadFile'>Selecionar avatar</label>
          <input id='uploadFile' type='file' ref={fileRef} onChange={(e) => onFileChange(e)} accept={ACCEPTED_FILE_TYPES} />
          {
            tempFilePreview
              ? (
                <div>
                  <img src={tempFilePreview} style={{ width: '64px', height: '64px' }} alt='Temp File' />
                </div>
              )
              : <></>
          }

        </div>
      </SettingsAvatarContainer>
    );
  }

  return (
    <SettingsContainer>
      <form ref={formRef} encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className='settingsFormContent'>
          {renderThemeColors()}
          {renderAvataSelector()}
        </div>
        {
          isSameData()
            ? <></>
            : (
              <div>
                <button type='submit'>Salvar</button> &nbsp;
                <button onClick={restoreToCurrentValues}>Cancelar</button>
              </div>
            )
        }
      </form>

    </SettingsContainer >
  )
}

export { Settings };
