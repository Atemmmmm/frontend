import { createContext } from "react";

const RadioContext = createContext({});

export default function RadioGroup({ label, children, ...rest }) {
    return (
      <fieldset>
        <legend>{label}</legend>
        <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
      </fieldset>
    );
  }