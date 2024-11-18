import { useToast } from "../../hooks/use-toast";
import { useGetUsers } from "../../lib/react-query/queriesAndMutation";
import Creator from "../../components/shared/Creator";
import Spiner from "../../components/shared/Spinner";

const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold w-full text-left">All Users</h2>
        {isLoading && !creators ? (
          <Spiner />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="w-full min-w-[200px] flex-1">
                <Creator creator={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
