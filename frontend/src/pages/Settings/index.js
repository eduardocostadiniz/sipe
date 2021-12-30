import React, { useContext, useEffect, useState } from "react";
import CustomThemeContext from "../../contexts/customThemeContext";

import UserContext from "../../contexts/userContext";
import userService from "../../services/userService";
import { convertTheme } from "../../utils";
import { SettingsContainer } from "./styles";


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
      const { theme: userDBTheme } = data.user;
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
      const { user: userInfo } = response.data;

      restoreToCurrentValues();
      setUser(userInfo);
      defineUserTheme(userInfo.theme);

    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <SettingsContainer>
      <h4>Configurações de {user && user.name}</h4>
      <form ref={formRef} encType='multipart/form-data' onSubmit={handleSubmit}>
        <div>
          <label>Tema: </label>
          <div>
            <p>
              Cor primária: &nbsp; [<strong>{userPrimaryColor}</strong>] &nbsp;
              <input type='color' value={userPrimaryColor} onChange={(e) => setUserPrimaryColor(e.target.value)} />
            </p>
            <p>
              Cor do texto: &nbsp; [<strong>{userTextColor}</strong>] &nbsp;
              <input type='color' value={userTextColor} onChange={(e) => setUserTextColor(e.target.value)} />
            </p>
          </div>
        </div>
        <div>
          <label>Avatar: </label>
          <div>
            <input type='file' ref={fileRef} onChange={(e) => onFileChange(e)} accept={ACCEPTED_FILE_TYPES} />
            <div>
              <span>{tempFilePreview}</span>
            </div>
            {
              tempFilePreview
                ? <div><img src={tempFilePreview} style={{ width: '64px', height: '64px' }} alt='Temp File' /></div>
                : <></>
            }

          </div>
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

      <hr />

      <div style={{ backgroundColor: 'teal' }}>
        <label>Tema atual na página: </label>
        <div>
          <p>Cor primária: {theme && theme.primary}</p>
          <p>Cor do texto: {theme && theme.text}</p>
        </div>
        {renderAvatarUploaded()}
      </div>

    </SettingsContainer >
  )
}

export { Settings };
