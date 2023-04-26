import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="bg-blue-700 w-screen h-screen flex items-center">
      <div className="text-center w-full">
        {session ? (
          <div>
            Signed in as {session.user.email}
            <br />
            <button
              className="bg-white p-2 px-4 rounded-lg hover:bg-gray-300"
              onClick={() => signOut("google")}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div>
            Not signed in <br />
            <button
              className="bg-white p-2 px-4 rounded-lg hover:bg-gray-300"
              onClick={() => {
                signIn("google");
              }}
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );
}
