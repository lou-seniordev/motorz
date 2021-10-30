import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<any, HTMLInputElement>,//
    FormFieldProps {}

const FileInput: React.FC<IProps> = ({
  input,
  width,
  type,
  // file,
  placeholder,
  meta: { touched, error },
}) => {
  return (//touched && // 
    <Form.Field error={!!error} width={width}>
      <input {...input} type={'file'} placeholder={placeholder} onChange={input.onChange}
      />

      {error && (//touched && 
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default FileInput;
