import React from "react";
import { useEffect } from "react";
import { authService } from "./authService";
import { useRouter } from "next/router";

export function withSession(func) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return func(modifiedCtx);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=unauthorized",
        },
      };
    }
  };
}

function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    authService
      .getSession()
      .then((userSession) => {
        setSession(userSession);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: { session },
    error,
    loading,
  };
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const session = useSession();
    const router = useRouter();

    if (!session.loading && session.error) router.push("/?error=unauthorized");

    const modifiedProps = {
      ...props,
      session: session.data.session,
    };

    return <Component {...modifiedProps} />;
  };
}
