import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import AnimatedBot from "@/components/AnimatedBot";

const page = async () => {
  
  const user = await getCurrentUser();
  console.log("user id", user?.id);

  //! parallel data fetching
  const [userInterviews, latestInterviews] = await Promise.all([
    user?.id ? getInterviewsByUserId(user.id) : [],
    user?.id ? getLatestInterviews({ userId: user.id }) : null,
  ]);
  const hasGivenInterviews = userInterviews && userInterviews.length > 0;

  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;
  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto p-8">
        {/* Text Content */}
        <AnimatedBot/>
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
            Get Interview Ready With Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Powered
            </span>{" "}
            Interview Bot
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            Practice on{" "}
            <span className="text-white font-medium">
              real interview questions
            </span>{" "}
            and get{" "}
            <span className="text-purple-400 font-medium">
              instant feedback
            </span>{" "}
            on your performance.
          </p>

          <Button
            asChild
            className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 max-sm:w-full overflow-hidden"
          >
            <Link
              href="/interview"
              className="flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Image */}
        <div className="flex-1 hidden md:flex justify-center">
          <Image
            src="/robot_interview.png"
            alt="AI Interview Robot"
            width={400}
            height={400}
            className="object-contain rounded-4xl"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasGivenInterviews
            ? userInterviews?.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))
            : "You haven't given any interviews yet."}
        </div>
      </section>

      {/* //! From here add fire store database */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Trending Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews
            ? latestInterviews?.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))
            : "No interviews scheduled yet."}
        </div>
      </section>
    </>
  );
};

export default page;
