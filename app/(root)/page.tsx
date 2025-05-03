import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
// import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  getCurrentUser,
  getInterviewsByUserId,
  getLatestInterview,
} from "@/lib/actions/auth.action";

const page = async () => {
  const user = await getCurrentUser();
  console.log("user", user);

  //! parallel data fetching
  const [userInterviews, latestInterviews] = await Promise.all([
    user?.id ? getInterviewsByUserId(user.id) : [],
    user?.id ? getLatestInterview({ userId: user.id }) : null,
  ]);
  const hasGivenInterviews = userInterviews && userInterviews.length > 0;

  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;
  return (
    <>
      {/* top section to schedule an interview */}
      <section className="card-cta">
        <div className=" flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready With Our AI Powered Interview Bot</h2>

          <p className="text-lg">
            Practice on real interview questions and get instant feedback on
            your performance.
          </p>

          <Button
            asChild
            className="btn-primary max-sm:w-full">
            <Link href="/interview"> Get Started </Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-md:hidden"></Image>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasGivenInterviews
            ? userInterviews?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  {...interview}
                />
              ))
            : "You haven't given any interviews yet."}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews
            ? latestInterviews?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  {...interview}
                />
              ))
            : "No interviews scheduled yet."}
        </div>
      </section>
    </>
  );
};

export default page;
