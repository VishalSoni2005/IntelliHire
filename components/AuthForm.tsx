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
        

        const idToken = await userCredential.user.getIdToken();
        console.log("idToken", idToken);

        if (!idToken) {
          toast.error("Something went wrong, please try again later");
          return;
        }

        await signIn({
          email: email,
          idToken: idToken,
        });

        console.log("sign-in", values);
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




//! TEST CODE

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormItem,
//   FormControl,
//   FormMessage,
//   FormField,
// } from "@/components/ui/form";
// import { toast } from "sonner";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth } from "@/firebase/client";
// import { signIn, signUp } from "@/lib/actions/auth.action";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { AtSign, Lock, User, ArrowRight, Github } from "lucide-react";
// import { cn } from "@/lib/utils";

// const AuthFormSchema = (type) => {
//   return z.object({
//     name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
//     email: z.string().email({ message: "Invalid email address" }),
//     password: z.string().min(3),
//   });
// };

// const AuthForm = ({ type }) => {
//   const isSignIn = type === "sign-in";
//   const router = useRouter();
//   const formSchema = AuthFormSchema(type);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (values) => {
//     try {
//       if (type === "sign-up") {
//         const { name, email, password } = values;

//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         console.log("userCredential", userCredential);

//         const result = await signUp({
//           uid: userCredential.user.uid,
//           name: name,
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

//         const idToken = await userCredential.user.getIdToken();
//         console.log("idToken", idToken);

//         if (!idToken) {
//           toast.error("Something went wrong, please try again later");
//           return;
//         }

//         await signIn({
//           email: email,
//           idToken: idToken,
//         });

//         console.log("sign-in", values);
//         toast.success("Sign in successful");
//         router.push("/");
//       }
//     } catch (error) {
//       console.log("Error from AuthForm ", error);
//       toast.error("Something went wrong");
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const userCredential = await signInWithPopup(auth, provider);

//       console.log("Google userCredential", userCredential);

//       const idToken = await userCredential.user.getIdToken();

//       if (!idToken) {
//         toast.error("Something went wrong with Google authentication");
//         return;
//       }

//       // If it's a sign-up, we need to create a user in our database
//       if (type === "sign-up") {
//         const result = await signUp({
//           uid: userCredential.user.uid,
//           name: userCredential.user.displayName || "Google User",
//           email: userCredential.user.email,
//           password: "", // Password is managed by Google
//         });

//         if (!result?.success) {
//           toast.error(result?.message);
//           return;
//         }
//       }

//       // Sign in the user
//       await signIn({
//         email: userCredential.user.email,
//         idToken: idToken,
//       });

//       toast.success(`Google ${isSignIn ? "sign in" : "sign up"} successful`);
//       router.push("/");
//     } catch (error) {
//       console.log("Error from Google Auth", error);
//       toast.error("Google authentication failed");
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="relative overflow-hidden rounded-2xl border border-slate-700/30 bg-transparent backdrop-blur-sm">
//         {/* Decorative elements - adjusted for dark background */}
//         <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl" />
//         <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-tr from-emerald-500/30 to-blue-500/30 blur-3xl" />

//         <div className="relative z-10 px-8 pt-10 pb-8">
//           {/* Header */}
//           <div className="flex flex-col items-center mb-8">
//             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-3 shadow-lg mb-4">
//               <Image
//                 src="/favicon.svg"
//                 width={38}
//                 height={32}
//                 alt="logo"
//                 className="rounded-full bg-white p-1"
//               />
//             </div>
//             <h2 className="text-2xl font-bold text-white">IntelliHire</h2>
//             <p className="text-sm text-slate-300 mt-1">
//               Practice Job Interview with AI
//             </p>
//           </div>

//           {/* Form */}
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-4">
//               {!isSignIn && (
//                 <div className="space-y-1.5">
//                   <Label
//                     htmlFor="name"
//                     className="text-sm font-medium text-slate-200">
//                     Full Name
//                   </Label>
//                   <div className="relative">
//                     <FormField
//                       control={form.control}
//                       name="name"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <div className="relative">
//                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//                                 <User size={18} />
//                               </div>
//                               <Input
//                                 {...field}
//                                 id="name"
//                                 placeholder="John Doe"
//                                 className="pl-10 h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus-visible:ring-blue-500"
//                               />
//                             </div>
//                           </FormControl>
//                           <FormMessage className="text-xs font-medium text-red-400 mt-1" />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div className="space-y-1.5">
//                 <Label
//                   htmlFor="email"
//                   className="text-sm font-medium text-slate-200">
//                   Email Address
//                 </Label>
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <div className="relative">
//                           <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//                             <AtSign size={18} />
//                           </div>
//                           <Input
//                             {...field}
//                             id="email"
//                             type="email"
//                             placeholder="you@example.com"
//                             className="pl-10 h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus-visible:ring-blue-500"
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage className="text-xs font-medium text-red-400 mt-1" />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <Label
//                   htmlFor="password"
//                   className="text-sm font-medium text-slate-200">
//                   Password
//                 </Label>
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <div className="relative">
//                           <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//                             <Lock size={18} />
//                           </div>
//                           <Input
//                             {...field}
//                             id="password"
//                             type="password"
//                             placeholder="••••••••"
//                             className="pl-10 h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus-visible:ring-blue-500"
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage className="text-xs font-medium text-red-400 mt-1" />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 className={cn(
//                   "w-full h-11 mt-2 text-white font-medium",
//                   "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
//                   "transition-all duration-200 shadow-md hover:shadow-lg"
//                 )}>
//                 <span>{isSignIn ? "Sign In" : "Create Account"}</span>
//                 <ArrowRight
//                   size={16}
//                   className="ml-2"
//                 />
//               </Button>
//             </form>
//           </Form>

//           {/* Divider */}
//           <div className="relative flex items-center mt-6 mb-5">
//             <div className="flex-grow border-t border-slate-700/30"></div>
//             <span className="flex-shrink mx-3 text-xs text-slate-400">
//               or continue with
//             </span>
//             <div className="flex-grow border-t border-slate-700/30"></div>
//           </div>

//           {/* Social Login */}
//           <div className="grid grid-cols-2 gap-3">
//             <Button
//               variant="outline"
//               onClick={handleGoogleSignIn}
//               className="h-11 bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50 text-white">
//               <svg
//                 className="w-5 h-5 mr-2"
//                 viewBox="0 0 24 24">
//                 <path
//                   fill="currentColor"
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                 />
//                 <path
//                   fill="none"
//                   d="M1 1h22v22H1z"
//                 />
//               </svg>
//               <span className="text-sm">Google</span>
//             </Button>
//             <Button
//               variant="outline"
//               className="h-11 bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50 text-white">
//               <Github
//                 size={18}
//                 className="mr-2"
//               />
//               <span className="text-sm">GitHub</span>
//             </Button>
//           </div>

//           {/* Footer */}
//           <div className="mt-6 text-center text-sm">
//             <p className="text-slate-300">
//               {isSignIn ? "New to IntelliHire?" : "Already have an account?"}
//               <Link
//                 href={!isSignIn ? "/sign-in" : "/sign-up"}
//                 className="ml-1 font-medium text-blue-400 hover:text-blue-300 transition-colors">
//                 {isSignIn ? "Create an account" : "Sign in"}
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
