"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation"; //? used for navigation in nextjs
import { useForm } from "react-hook-form"; //? Hook to initialize the form

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

import FormField from "./FormFeild";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; //? official firebase client sdk for authentication

import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {

  const isSignIn = type === "sign-in";
  const router = useRouter(); //? create a router to navigate
  const formSchema = AuthFormSchema(type);

  // 1. Define your form. similar to const [form, setForm] = useState({}) but different
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), //?Connects Zod with RHF to run validation automatically
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword( //* create a user with email and password
          auth,
          email,
          password
        );
        console.log("userCredential", userCredential);

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email: email,
          password: password,
        });
        
        console.log("result", result);
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        console.log("sign-up", values);
        toast.success("Sign up successful");
        router.push("/");
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log("userCredential", userCredential);
        

        const idToken = await userCredential.user.getIdToken(); // this is id token from firebase
        console.log("idToken", idToken);

        if (!idToken) {
          toast.error("Something went wrong, please try again later");
          return;
        }

        await signIn({
          email: email,
          idToken: idToken,
        });


        toast.success("Sign in successful");
        router.push("/");
      }
    } catch (error) {
      console.log("Error from AuthForm ", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10 align-center justify-center">
        <div className="flex flex-row gap-4 justify-center items-center">
          <Image
            src="/favicon.svg"
            width={38}
            height={32}
            alt="logo"
            className="rounded-full shadow-sm bg-white"
          />
          <h2 className="text-primary">IntelliHire</h2>
        </div>
        <h3>Practice Job Interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control} // This connects the field to the form
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
          {/* //todo: implement signup/signin with google */}
          {isSignIn ? "New to IntelliHire?" : "Already have an account?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1">
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;


