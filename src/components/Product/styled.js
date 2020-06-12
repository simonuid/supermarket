import styled from 'styled-components';

export default styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 36px 24px;
  width: 240px;
  > h4 {
    font-size: 20px;
    font-weight: normal;
    margin: 20px auto 12px;
    text-align: center;
    background-color: palegoldenrod;
  }
  > img {
    width: 100%;
    height: auto;
  }
  > .middle-div {
    height: 30px;
    > .discount {
      text-align: center;
      color: darkorange;
      background-color: lightgoldenrodyellow;
      border-radius: 15px;
      width: max-content;
      margin: 0 auto;
      padding: 5px 15px;
    }
  }
  > .unitPrice {
    text-align: right;
    padding-right: 10px;
    margin-top: 2px;
  }
  > .bottom-div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    button {
      height: 25px;
      width: 40px;
      
      border-radius: 4px;
      border: none;
      &:first-child {
        margin-right: 10px;
        background-color: steelblue;
      }
      &:nth-child(2) {
        background-color: lightsteelblue;
      }
    }
  }
`;