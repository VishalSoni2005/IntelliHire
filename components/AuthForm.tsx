/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormFeild";

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = AuthFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        // console.log("sign-up", values);
        toast.success("Sign up successful");
        router.push("/sign-in");
      } else {
        // console.log("sign-in", values);
        toast.success("Sign in successful");
        router.push("/");
      }
    } catch (error) {
      console.log("Error from Auth form ", error);
      toast.error("Something went wrong");
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src="/favicon.svg"
            width={38}
            height={32}
            alt="logo"
          />
          <h2 className="text-primary">IntelliHire</h2>
        </div>
        <h3>Practice Job Interview with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form">
            {isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="name"
                placeholder="Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="email"
              type="email"
              placeholder="Your email address"
            />
            <FormField
              type="password"
              control={form.control}
              name="password"
              label="password"
              placeholder="password"
            />
            <Button
              className="btn"
              type="submit">
              {isSignIn ? "Sign In" : "Join Us"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1">
            {isSignIn ? "Sign Up" : "Join Us"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
