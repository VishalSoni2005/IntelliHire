/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import CardTechIcon from './CardTechIcon';

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const formatDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MM DD, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>

          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-5 mt-3">
              <Image
                src="/calender.svg"
                width={22}
                height={22}
                alt="calender"></Image>
              <p>{formatDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/star.svg"
                width={22}
                height={22}
                alt="star"
              />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || "No feedback yet. Take an interview!"}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <CardTechIcon techStack={techstack} />

          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}/${userId}`
              }>
              {feedback ? "View Feedback" : "Take Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;


// import dayjs from "dayjs";
// import Image from "next/image";
// import Link from "next/link";
// import { getRandomInterviewCover } from "@/lib/utils";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { Calendar, Star, ArrowRight, Clock } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface InterviewCardProps {
//   interviewId?: string;
//   userId?: string;
//   role: string;
//   type: string;
//   techstack: string[];
//   createdAt?: string;
//   feedback?: Feedback | null;
// }

// interface Feedback {
//   createdAt?: string;
//   totalScore?: number;
//   finalAssessment?: string;
// }

// const InterviewCard = ({
//   interviewId,
//   userId,
//   role,
//   type,
//   techstack,
//   createdAt,
//   feedback,
// }: InterviewCardProps) => {
//   const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
//   const formatDate = dayjs(
//     feedback?.createdAt || createdAt || Date.now()
//   ).format("MMM DD, YYYY");

//   // Determine badge color based on interview type
//   const getBadgeColor = (type: string) => {
//     switch (type.toLowerCase()) {
//       case "behavioral":
//         return "bg-emerald-100 text-emerald-800 border-emerald-200";
//       case "technical":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       case "mixed":
//         return "bg-purple-100 text-purple-800 border-purple-200";
//       default:
//         return "bg-slate-100 text-slate-800 border-slate-200";
//     }
//   };

//   return (
//     <div className="group relative w-[360px] max-sm:w-full overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
//       {/* Card background with gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10"></div>

//       {/* Background image */}
//       <div className="absolute inset-0 bg-slate-100 overflow-hidden">
//         <Image
//           src={getRandomInterviewCover() || "/placeholder.svg"}
//           alt="cover image"
//           fill
//           className="object-cover opacity-20 transition-transform duration-500 group-hover:scale-105"
//         />
//       </div>

//       {/* Card content */}
//       <div className="relative z-20 p-6 flex flex-col h-full min-h-[380px]">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center gap-3">
//             <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
//               <Image
//                 src={getRandomInterviewCover() || "/placeholder.svg"}
//                 alt="cover image"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold capitalize text-slate-800">
//                 {role}
//               </h3>
//               <p className="text-sm text-slate-500">Interview</p>
//             </div>
//           </div>

//           <Badge className={cn("font-medium", getBadgeColor(normalizedType))}>
//             {normalizedType}
//           </Badge>
//         </div>

//         {/* Info section */}
//         <div className="flex flex-col gap-4 mb-6">
//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-2 text-sm text-slate-600">
//               <Calendar
//                 size={16}
//                 className="text-slate-400"
//               />
//               <span>{formatDate}</span>
//             </div>

//             <div className="flex items-center gap-2 text-sm">
//               <Star
//                 size={16}
//                 className="text-amber-500 fill-amber-500"
//               />
//               <span className="font-medium">
//                 {feedback?.totalScore ? (
//                   <span className="text-slate-800">
//                     {feedback.totalScore}
//                     <span className="text-slate-500">/100</span>
//                   </span>
//                 ) : (
//                   <span className="text-slate-500">Not rated</span>
//                 )}
//               </span>
//             </div>
//           </div>

//           {/* Tech stack */}
//           <div className="flex flex-wrap gap-2">
//             {techstack.map((tech, index) => (
//               <Badge
//                 key={index}
//                 variant="outline"
//                 className="bg-white/80 text-slate-700 border-slate-200 backdrop-blur-sm">
//                 {tech}
//               </Badge>
//             ))}
//           </div>
//         </div>

//         {/* Feedback section */}
//         <div className="flex-grow">
//           <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-200">
//             <div className="flex items-center gap-2 mb-2">
//               <Clock
//                 size={16}
//                 className="text-slate-400"
//               />
//               <h4 className="font-medium text-slate-700">Feedback</h4>
//             </div>
//             <p className="text-sm text-slate-600 line-clamp-3">
//               {feedback?.finalAssessment ||
//                 "No feedback yet. Take this interview to receive a detailed assessment of your performance."}
//             </p>
//           </div>
//         </div>

//         {/* Action button */}
//         <div className="mt-6">
//           <Button
//             className={cn(
//               "w-full group relative overflow-hidden",
//               "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
//               "text-white font-medium shadow-md"
//             )}>
//             <Link
//               href={
//                 feedback
//                   ? `/interview/${interviewId}/feedback`
//                   : `/interview/${interviewId}/${userId}`
//               }
//               className="flex items-center justify-center w-full">
//               <span>{feedback ? "View Feedback" : "Take Interview"}</span>
//               <ArrowRight
//                 size={16}
//                 className="ml-2 transition-transform group-hover:translate-x-1"
//               />
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewCard;
