import React from 'react';

interface IInput {
  placeholder: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Input = (props: IInput) => {
  const hasValue = !!props.value;
  const inputClassName = `field ${hasValue ? 'field-active field-show-floating-label' : ''}`;
  return (
    <div className={inputClassName}>
      <div className="field-input-wrapper">
        <label className="field-label" htmlFor={`billing_address_${props.id}`}>
          {props.placeholder}
        </label>
        <input
          placeholder={props.placeholder}
          autoCapitalize="off"
          spellCheck="false"
          className="field-input"
          type="text"
          id={`billing_address_${props.id}`}
          name={`billing_address[${props.id}]`}
          autoComplete="off"
          onChange={props.onChange}
          value={props.value}
        />
      </div>
    </div>
  );
};
export default Input;
