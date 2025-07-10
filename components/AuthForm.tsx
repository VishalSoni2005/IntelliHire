"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import FormField from "./FormFeild";

type FormType = "sign-in" | "sign-up";

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const isSignIn = type === "sign-in";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formSchema = AuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email: email,
          password: password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Welcome to IntelliHire! 🎉");
        router.push("/");
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Something went wrong, please try again later");
          return;
        }

        await signIn({
          email: email,
          idToken: idToken,
        });

        toast.success("Welcome back! 👋");
        router.push("/");
      }
    } catch (error) {
      console.log("Error from AuthForm ", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-auto lg:min-w-[566px] min-w-full bg-gradient-to-br  flex items-center justify-center p-2 rounded-4xl">
      {/* Background decoration */}

      <div className="relative w-full max-w-md">
        {/* Main card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 animate-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div className="text-center mb-8 animate-in fade-in duration-1000 delay-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <Image
                  src="/favicon.svg"
                  width={40}
                  height={40}
                  alt="IntelliHire Logo"
                  className="rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 p-2"
                />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                IntelliHire
              </h1>
            </div>
            <p className="text-gray-400 text-sm">
              {isSignIn ? "Welcome back!" : "Practice Job Interview with AI"}
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {!isSignIn && (
                  <div className="group">
                    <FormField
                      control={form.control}
                      name="name"
                      label="Full Name"
                      placeholder="Enter your full name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-white/20"
                    />
                  </div>
                )}

                <div className="group">
                  <FormField
                    control={form.control}
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-white/20"
                  />
                </div>

                <div className="group relative">
                  <FormField
                    control={form.control}
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-white/20 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-12" />
                    ) : (
                      <Eye className="w-4 h-12" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <div className="animate-in slide-in-from-bottom duration-700 delay-500">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {isSignIn ? "Signing In..." : "Creating Account..."}
                      </span>
                    </div>
                  ) : (
                    <span>{isSignIn ? "Sign In" : "Create Account"}</span>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-8 text-center ">
            <p className="text-gray-400 text-sm">
              {isSignIn ? "New to IntelliHire?" : "Already have an account?"}
              <Link
                href={!isSignIn ? "/sign-in" : "/sign-up"}
                className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 hover:underline"
              >
                {isSignIn ? "Create Account" : "Sign In"}
              </Link>
            </p>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
          <div className="w-full h-full bg-gradient-to-b from-purple-500/5 to-transparent rounded-2xl blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { useRouter } from "next/navigation"; //? used for navigation in nextjs
// import { useForm } from "react-hook-form"; //? Hook to initialize the form

// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import { toast } from "sonner";

// import FormField from "./FormFeild";

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth"; //? official firebase client sdk for authentication

// import { auth } from "@/firebase/client";
// import { signIn, signUp } from "@/lib/actions/auth.action";

// const AuthFormSchema = (type: FormType) => {
//   return z.object({
//     name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
//     email: z.string().email({ message: "Invalid email address" }),
//     password: z.string().min(3),
//   });
// };

// const AuthForm = ({ type }: { type: FormType }) => {

//   const isSignIn = type === "sign-in";
//   const router = useRouter(); //? create a router to navigate
//   const formSchema = AuthFormSchema(type);

//   // 1. Define your form. similar to const [form, setForm] = useState({}) but different
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema), //?Connects Zod with RHF to run validation automatically
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   // 2. Define a submit handler.
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       if (type === "sign-up") {
//         const { name, email, password } = values;

//         const userCredential = await createUserWithEmailAndPassword( //* create a user with email and password
//           auth,
//           email,
//           password
//         );
//         console.log("userCredential", userCredential);

//         const result = await signUp({
//           uid: userCredential.user.uid,
//           name: name!,
//           email: email,
//           password: password,
//         });

//         console.log("result", result);
//         if (!result?.success) {
//           toast.error(result?.message);
//           return;
//         }

//         console.log("sign-up", values);
//         toast.success("Sign up successful");
//         router.push("/");
//       } else {
//         const { email, password } = values;
//         const userCredential = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         console.log("userCredential", userCredential);

//         const idToken = await userCredential.user.getIdToken(); // this is id token from firebase
//         console.log("idToken", idToken);

//         if (!idToken) {
//           toast.error("Something went wrong, please try again later");
//           return;
//         }

//         await signIn({
//           email: email,
//           idToken: idToken,
//         });

//         toast.success("Sign in successful");
//         router.push("/");
//       }
//     } catch (error) {
//       console.log("Error from AuthForm ", error);
//       toast.error("Something went wrong");
//     }
//   }

//   return (
//     <div className="card-border lg:min-w-[566px]">
//       <div className="flex flex-col gap-6 card py-14 px-10 align-center justify-center">
//         <div className="flex flex-row gap-4 justify-center items-center">
//           <Image
//             src="/favicon.svg"
//             width={38}
//             height={32}
//             alt="logo"
//             className="rounded-full shadow-sm bg-white"
//           />
//           <h2 className="text-primary">IntelliHire</h2>
//         </div>
//         <h3>Practice Job Interview with AI</h3>

//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="w-full space-y-6 mt-4 form">
//             {!isSignIn && (
//               <FormField
//                 control={form.control} // This connects the field to the form
//                 name="name"
//                 label="name"
//                 placeholder="Name"
//               />
//             )}
//             <FormField
//               control={form.control}
//               name="email"
//               label="email"
//               type="email"
//               placeholder="Your email address"
//             />
//             <FormField
//               type="password"
//               control={form.control}
//               name="password"
//               label="password"
//               placeholder="password"
//             />
//             <Button
//               className="btn"
//               type="submit">
//               {isSignIn ? "Sign In" : "Join Us"}
//             </Button>
//           </form>
//         </Form>

//         <p className="text-center">
//           {/* //todo: implement signup/signin with google */}
//           {isSignIn ? "New to IntelliHire?" : "Already have an account?"}
//           <Link
//             href={!isSignIn ? "/sign-in" : "/sign-up"}
//             className="font-bold text-user-primary ml-1">
//             {isSignIn ? "Sign Up" : "Sign In"}
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
