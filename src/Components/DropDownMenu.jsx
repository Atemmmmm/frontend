import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DropdownMenuContainer = styled.ul`
  font-weight: bold;
  position: absolute;
  color: white;
  background-color: #333232;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const DropdownMenuItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #444444;
  }
`;

const LinktoEdit = styled(Link)`
  text-decoration-line: none;
  color: white;
`;

const DropdownMenu = ( ) => {
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    return (
        <DropdownMenuContainer style={{ top: menuPosition.y, left: menuPosition.x }}>
             <LinktoEdit to="/Edit">
                <DropdownMenuItem > Edit </DropdownMenuItem> 
            </LinktoEdit>
                <DropdownMenuItem > Delete </DropdownMenuItem>
        </DropdownMenuContainer>
      )}

export default DropdownMenu;
