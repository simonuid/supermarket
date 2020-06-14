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
      padding-top: 5px;
      padding-bottom: 5px;
      > .item-total {
        display: flex;
        justify-content: space-between;
        &.weight {
          flex-direction: column;
          > .item-price {
            text-align: end;
          }
          .byWeight {
            font-size: 12px;
          }
        }
        > .item-price {
          font-weight: 700;
        }
      }
    }
    &.total {
      margin-top: 20px;
      padding-top: 10px;
      > li.title {
        font-weight: 600;
        margin: 10px auto;
      }
    }
  }
  hr {
    border-style: dashed;
    &.savings-bottom {
      width: 50%;
      margin: 15px auto 15px 0;
    }
    &.total-top {
      border-style: solid;
      color: darkkhaki;
      margin: 20px auto;
    }
  }
  > .sub-total {
    display: flex;
    justify-content: space-between;
  }
  > .btn-checkout {
    color: white;
    border-radius: 4px;
    border: none;
    padding: 10px 20px;
    background-color: cornflowerblue;
  }
`;
