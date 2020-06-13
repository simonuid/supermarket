import styled from 'styled-components';

export default styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 36px 24px;
  padding: 24px;
  width: 240px;
  > h2 {
    font-size: 24px;
    margin: 0 0 12px;
    text-align: center;
  }
  > ul {
    list-style: none;
    padding-left: 0;
    > li {
      > .item-total {
        display: flex;
        justify-content: space-between;
        &.weight {
          flex-direction: column;
          > .item-price {
            text-align: end;
          }
        }
        > .item-price {
          font-weight: 700;
        }
      }
    }
    &.savings {
      margin-top: 20px;
      border-top: 1px solid darkkhaki;
      padding-top: 10px;
    }
  }
  > hr {
    border-style: dashed;
  }
  > .sub-total {
    display: flex;
    justify-content: space-between;
  }
`;