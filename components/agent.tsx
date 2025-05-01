/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  CONNECTING = "CONNECTING",
}

const Agent = ({ userName, userId, type }: AgentProps) => {
  const isSpeaking = true;
  const callStatus = CallStatus.ACTIVE; // This should be replaced with actual call status logic

  const message = [
    "Whats your name?",
    "What is your favorite color?",
    "What is your favorite food?",
  ];

  const lastMessage = message[message.length - 1];

  return (
    <>
      <div className="call-view">
        <div className="card-interview">
          <div className="avatar">
            <Image
              src={"/ai-avatar.png"}
              alt="avatar"
              width={65}
              height={54}
              className="object-cover"
            />

            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src={"/user-avatar.png"}
              alt="avatar"
              width={540}
              height={540}
              className="object-cover rounded-full size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {message.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}>
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                (callStatus !== "CONNECTING") & "hidden"
              )}
            />
            <span className="">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Start Call"
                : "Connecting..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">
            <span>End Call</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
