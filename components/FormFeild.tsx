"use client";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className,
}: FormFieldProps<T>) => {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-sm font-medium text-gray-300 transition-colors duration-200">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={cn(
                "h-12 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-offset-0",
                fieldState.error
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : "",
                className
              )}
            />
          </FormControl>
          <FormMessage className="text-red-400 text-xs animate-in slide-in-from-top-1 duration-300" />
        </FormItem>
      )}
    />
  );
};

export default FormField;

// import React from "react";
// import { Control, Controller, FieldValues, Path } from "react-hook-form";
// import {
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// interface FormFieldProps<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   placeholder: string;
//   type?: "text" | "password" | "email" | "file";
// }

// const FormField = <T extends FieldValues>({
//   control,
//   name,
//   label,
//   placeholder,
//   type = "text",
// }: FormFieldProps<T>) => (

//   <Controller
//     name={name}
//     control={control}

//     render={({ field }) => (
//       <FormItem>
//         <FormLabel className="lable">{label}</FormLabel>
//         <FormControl>
//           <Input
//             className="input"
//             type={type}
//             placeholder={placeholder}
//             {...field}
//           />
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}

//   />

// );

// export default FormField;
