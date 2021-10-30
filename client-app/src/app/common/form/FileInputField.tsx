import type { InputHTMLAttributes } from "react";
import React from "react";
import { Field } from "react-final-form";
// import { Input } from "semantic-ui-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const FileInputField = ({ name, ...props }: Props) => (
    // <FileList></FileList>
  <Field name={name}>
    {({ input: { value, onChange, ...input } }) => (
     <input
        {...input}
        // style="visibility:hidden;"
        type="file"
        onChange={({ target }) => onChange(target.files)} // instead of the default target.value
        {...props}
      />
      )}
  </Field>
);

export default FileInputField;



// <Input 
//     {...input}
//     type="file"
//     onChange={({ target }) => onChange(target.files)} // instead of the default target.value
//     {...props}
// />



// interface IProps extends FieldRenderProps<string, HTMLInputElement>, FormFieldProps {}

// const FileInput: React.FC<IProps>  = ({ name, ...props }: IProps) => (
//     return (
//         <div>

//         </div>
//     )
// );