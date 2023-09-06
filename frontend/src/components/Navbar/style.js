import styled from 'styled-components';

 

export const Nav = styled.nav`
  background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0db3bd81-988e-4ea7-a818-65d844597eba/d1t1ysy-821a8956-6f2c-4b6d-be56-e5f21624d3c3.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkYjNiZDgxLTk4OGUtNGVhNy1hODE4LTY1ZDg0NDU5N2ViYVwvZDF0MXlzeS04MjFhODk1Ni02ZjJjLTRiNmQtYmU1Ni1lNWYyMTYyNGQzYzMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.U-5lj5cszRUW1z-fcasYhp0UAJM4Ef18C8lryi5SJpA');
  width: 100%;
  

  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
 

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;  // Certifique-se de que os itens estejam alinhados à esquerda por padrão
  }
`;

 

export const NavItems = styled.div`
  display: flex;
  gap: 20px;

 

  @media (max-width: 768px) {
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    gap: 10px;
  }
`;

 

export const ToggleButton = styled.button`
  display: none;

 

  @media (max-width: 768px) {
    display: block;
    align-self: flex-end;  // Alinha o botão à direita
  }
`;