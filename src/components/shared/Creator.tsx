import { Models } from "appwrite";
import DefaultProfile from "./DefaultProfile";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type Props = {
  creator: Models.Document;
};

const Creator = ({ creator }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-2">
      <Link
        to={`/profile/${creator?.$id}`}
        className="flex flex-col items-center justify-center"
      >
        {!creator?.imageUrl && (
          <DefaultProfile className="h-16 w-16" value={creator?.name[0]} />
        )}
        {creator?.imageUrl && (
          <img
            src={creator?.imageUrl}
            alt={creator?.name}
            className="h-16 w-16 rounded-full"
          />
        )}
        <span className="base-semibold mt-2">{creator?.name}</span>
        <span className="small-regular text-light-3">@{creator?.username}</span>
      </Link>
      <Button
        className="mt-3 cursor-not-allowed bg-primary-500 px-7"
        title="coming soon..."
      >
        Follow
      </Button>
    </div>
  );
};

export default Creator;
