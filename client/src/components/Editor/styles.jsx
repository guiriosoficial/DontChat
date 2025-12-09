import styled from 'styled-components'

const EditorContainer = styled.section`
  display: flex;
  margin: 0 10px 10px;

  button {
    font-size: 21px;
  }

  textarea {
    font-size: 16px;
    max-height: 120px;
    flex: 1;
  }
`

export { EditorContainer }
