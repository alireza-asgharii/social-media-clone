import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { useSignOutAccount } from "../../lib/react-query/queriesAndMutation";
import { useUserContext } from "../../context/AuthContext";
import Logo from "./Logo";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between px-5 py-4">
        <Logo />

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            {user.imageUrl && (
              <img
                src={user.imageUrl}
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
            )}

            {!user.imageUrl && (
              <span className="flex-center inline-block h-8 w-8 rounded-full bg-purple-500 uppercase">
                {user.name[0]}
              </span>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
