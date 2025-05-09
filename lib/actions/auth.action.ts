"use server";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export const signUp = async (UserData: SignUpParams) => {
  const { uid, name, email } = UserData;
  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Account creation successful, please sign in",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating user:", error);
    console.log("Error in auth action", error.code);

    if (error.code === "auth/email-already-exists") {
      return {
        suceess: false,
        message: "Email already exists",
      };
    }

    return {
      sucess: false,
      message: "Something went wrong",
    };
  }
};



export const signIn = async (signInInfo: SignInParams) => {
  const { email, idToken } = signInInfo;
  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User not found",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Sign in successful",
    };
  } catch (error) {
    console.error("Error signing in:", error);
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
};

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: 60 * 60 * 24 * 5 * 1000, // 5 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

//* this function will be used to get currentuser on other components
export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value || null;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }

    const userData = userRecord.data() as User;

    return {
      ...userData,
      id: decodedClaims.uid,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}

























export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  try {
    const interviews = await db
      .collection("intterviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    if (interviews.empty) {
      return null;
    }

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return null;
  }
}

export async function getLatestInterview(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  try {
    const { userId, limit = 20 } = params;
    const interviews = await db
      .collection("intterviews")
      .where("userId", "!=", userId)
      .where("finalized", "==", true)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    if (interviews.empty) {
      return null;
    }

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
