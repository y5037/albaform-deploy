import styled, { css } from "styled-components";

type ButtonProps = {
    $active?:boolean
}

export const PaginationWrapper = styled.ul`
  -webkit-display: flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 40px 0 50px;
`

export const PaginationButton = styled.li<ButtonProps>`
  position: relative;
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: 0 2.5px;
  border: 1px solid var(--gray-10);
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  font-size: 1.6em;
  color: var(--gray-800);

  ${({$active}) => $active && css`
    border: 1px solid var(--primary-active);
    background: var(--primary-active);
    // color: var(--white);
  `}
`