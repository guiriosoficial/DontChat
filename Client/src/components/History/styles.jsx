import styled from 'styled-components'

const HistryContainer = styled.section`
  padding: 10px;
  overflow: auto;
  flex: 1;

  ul {
    overflow: auto;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 16px;

    li {
      white-space: pre-wrap;
      margin-top: 8px;
      &:first-child {
        margin-top: 0;
      }
    }
  }
`

const MessageHeaders = styled.span`
  color: ${(props) => props.color};
`

export {
  HistryContainer,
  MessageHeaders
}
