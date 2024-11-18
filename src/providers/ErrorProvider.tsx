import React from "react";
import { Button } from "../components/ui/button";
import Spiner from "../components/shared/Spinner";

type Props = {
  children: React.ReactNode;
  error: boolean;
  message?: string;
  refetch?: any;
  isRefetching?: boolean;
};

const ErrorProvider = ({
  children,
  error,
  message = "An error occurred!",
  refetch,
  isRefetching,
}: Props) => {
  if (error)
    return (
      <div className="mt-10 flex h-full w-full flex-col items-center justify-center gap-2">
        <img
          src="/assets/icons/icons8-error-globe-96.png"
          alt="error"
          className="pr-2 invert"
        />
        <p className="text-light-2">{message}</p>

        {refetch && (
          <Button
            className="rounded-md border-2 border-light-2 text-light-2"
            onClick={refetch}
          >
            reLoad
            {isRefetching && <Spiner />}
          </Button>
        )}
      </div>
    );

  return <>{children}</>;
};

export default ErrorProvider;
