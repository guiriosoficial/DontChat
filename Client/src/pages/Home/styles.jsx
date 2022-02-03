import styled from 'styled-components'

const Title = styled.h1`
  margin-top: 60px;
  text-align: center;
  font-size: 60px;
`

const Form = styled.form`
  text-align: center;
  font-size: 21px;
  margin-block-end: 1em;

  input,
  button {
    font-size: 21px;
  }
`

const Texts = styled.section`
  padding-top: 40px;
  margin: 0 auto;
  width: 510px;
  font-size: 19px;
  line-height: 30px;
`

export {
  Title,
  Texts,
  Form
}
