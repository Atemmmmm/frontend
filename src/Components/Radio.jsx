import { createContext } from "react";
import { useContext } from "react";
import styled from 'styled-components';

const RadioContext = createContext({});


const Input = styled.input`
  width: 3rem;
  fontSize: 20px,
`;

export default function Radio({ children, value, name, defaultChecked, disabled }) {
    const group = useContext(RadioContext);
  
    return (
      <label>
        <Input
          type="radio"
          value={value}
          name={name}
          disabled={disabled || group.disabled}
          checked={group.value !== undefined ? value === group.value : undefined}
        />
        {children}
      </label>
    );
  }