import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const page = async () => {
  const user = await getCurrentUser();
  console.log("user", user);

  //! parallel data fetching
  const [userInterviews, latestInterviews] = await Promise.all([
    user?.id ? getInterviewsByUserId(user.id) : [],
    user?.id ? getLatestInterviews({ userId: user.id }) : null,
  ]);
  const hasGivenInterviews = userInterviews && userInterviews.length > 0;

  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;
  return (
    <>
      {/* top section to schedule an interview */}
      {/* <section className="card-cta">
        <div className=" flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready With Our AI Powered Interview Bot</h2>

          <p className="text-lg">
            Practice on real interview questions and get instant feedback on
            your performance.
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview"> Get Started </Link>
          </Button>
        </div> */}

      {/* <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-md:hidden"
        ></Image>
      </section> */}

      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        <div className="relative backdrop-blur-sm bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl" />

          <div className="relative flex flex-col gap-6 max-w-lg">
            {/* Header with icon */}
            <div className="space-y-4">
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
            </div>

            {/* Description */}
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

            {/* Enhanced button */}
            <div className="group">
              <Button
                asChild
                className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 max-sm:w-full overflow-hidden"
              >
                <Link
                  href="/interview"
                  className="flex items-center justify-center gap-2"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </Link>
              </Button>
            </div>

            {/* Additional features hint */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Real-time feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500" />
                <span>AI-powered analysis</span>
              </div>
            </div>
          </div>

          

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-2xl" />
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

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

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
