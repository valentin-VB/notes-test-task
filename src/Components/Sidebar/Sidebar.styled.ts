import styled from "@emotion/styled";

export const List = styled.ul`
  background-color: #ecf5f0;
  @media (min-width: 600px) {
    height: 100vh;
    overflow-y: scroll;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #94d2b1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f3f3f3;
  }
`;
