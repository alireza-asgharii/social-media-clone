import { useForm } from "react-hook-form";
import { Models } from "appwrite";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidation } from "../../lib/validation";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import FileUploader from "../shared/FileUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  useCreatePost,
  useUpdatePost,
} from "../../lib/react-query/queriesAndMutation";
import { useUserContext } from "../../context/AuthContext";
import { toast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../shared/Spinner";

type PostFormProps = {
  post?: Models.Document;
  action?: "Update" | "Create";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();

  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) return toast({ title: "Please try again!" });

      return navigate(`/posts/${post.$id}`);
    }

    const newPost = await createPost(
      {
        ...values,
        userId: user.id,
      },
      { onSuccess: () => toast({ title: "Created post successfully" }) },
    );

    if (!newPost) {
      return toast({ title: "Please try ageain" });
    }

    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-5xl flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrolbar"
                  placeholder="Write something"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Art, Expression, Learn"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap disabled:cursor-not-allowed"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {(isLoadingCreate || isLoadingUpdate) && <Spinner />}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
