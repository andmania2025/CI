import type React from "react";
import { useFormContext } from "react-hook-form";

interface FormErrorProps {
  name: string;
}

export const FormError: React.FC<FormErrorProps> = ({ name }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = name
    .split(".")
    .reduce((acc: unknown, key: string) => (acc as Record<string, unknown>)?.[key], errors) as
    | { message?: string }
    | undefined;

  if (!error?.message) return null;

  return <p className="text-sm text-red-500 mt-1">{error.message as string}</p>;
};
