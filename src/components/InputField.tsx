import {
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const MyTextInput = ({
  label,
  textarea,
  size: _,
  ...props
}: InputFieldProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [field, { error }] = useField(props);
  let InputOrTextarea = Input;
  if (textarea) InputOrTextarea = Textarea as any;
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
