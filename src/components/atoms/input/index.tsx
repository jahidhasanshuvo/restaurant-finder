import { Input, InputProps } from "antd";
import React from "react";
import "./index.scss";

interface TextInputProps extends InputProps {
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({ error, ...props }) => {
  return (
    <div className="a-text-input">
      <Input type="text" {...props} />
      {error && <span className="a-text-input__error">{error}</span>}
    </div>
  );
};

export default TextInput;
