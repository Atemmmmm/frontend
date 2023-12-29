import { createContext } from "react";
import { useContext } from "react";

const RadioContext = createContext({});

export default function Radio({ children, value, name, defaultChecked, disabled }) {
    const group = useContext(RadioContext);
  
    return (
      <label>
        <input
          type="radio"
          value={value}
          name={name}
          disabled={disabled || group.disabled}
          checked={group.value !== undefined ? value === group.value : undefined}
          onChange={(e) => group.onChange && group.onChange(e.target.value)}
        />
        {children}
      </label>
    );
  }