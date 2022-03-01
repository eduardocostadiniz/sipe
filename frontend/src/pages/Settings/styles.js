import styled from "styled-components";

const SettingsContainer = styled.div`
  padding: 15px;
  background-color: white;

  .settingsFormContent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .colorLabel {
    font-weight: 700;
  }

`;

const SettingsColorContainer = styled.div`
  width: 40%;
  margin: 7px;

  & div {
    display: flex;
    align-items: center;
    margin-bottom: 15px ;

    & label {
      font-size: 14px;
      margin-right: 5px;
      min-width: 100px;
    }

    & input[type="color"] {
      width: 32px;
      height: 32px;
      border: 1px solid #333;
      border-radius: 2px;
      padding: 0px;
      margin: 0px;
      cursor: pointer;
      margin-right: 10px;
    }
  }

`;

const SettingsSpanColor = styled.span`
  padding: 2px 5px;
  min-width: 80px;
  font-size: 14px;
  text-align: center;
  border: 1px solid ${(props) => props.spanColor};
  border-radius: 50px;
  color: ${(props) => props.spanColor};
  text-shadow: 0.05em 0.05em 0.05em #333;
`;

const SettingsAvatarContainer = styled.div`
  width: 40%;
  margin: 7px;

  & div input[type="file"] {
    display: none;
  }

  & div label {
    padding: 10px;
    height: 26px;
    background-color: #333;
    color: #FFF;
    text-align: center;
    display: block;
    margin-top: 10px;
    cursor: pointer;
  }

  & div div {
    margin-top: 10px;

    & img {
      width: 128px;
      height: 128px;
      border-radius: 100%;
    }
  }

`;

export {
  SettingsContainer,
  SettingsColorContainer,
  SettingsSpanColor,
  SettingsAvatarContainer
};
