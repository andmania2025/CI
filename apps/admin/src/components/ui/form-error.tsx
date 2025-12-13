import type React from "react";
import { useFormContext } from "react-hook-form";

interface FormErrorProps {
  name: string;
}

export const FormError: React.FC<FormErrorProps> = ({ name }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = name.split(".").reduce((acc, key) => acc?.[key], errors as any);

  if (!error?.message) return null;

  return <p className="text-sm text-red-500 mt-1">{error.message as string}</p>;
};
