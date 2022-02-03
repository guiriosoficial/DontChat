import styled from 'styled-components'

const ChatContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;

  & > span {
    font-size: 14px;
    margin: 0 10px;

    a {
      color: #1B699F;
      text-decoration: none;
    }

    input {
      height: 19px;
      width: 38px;
    }
  }
`

const ErrorMessage = styled.div`
  background-color: red;
  color: white;
  margin: 0 auto;
  width: 100%;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  font-weight: bold;
`

export {
  ChatContainer,
  ErrorMessage
}
