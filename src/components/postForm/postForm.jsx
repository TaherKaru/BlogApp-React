import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import  Service  from "../../AppWrite/Database";
import storage from "../../AppWrite/Storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, Select, RTE } from "../index";

function PostForm({ post }) {
  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log("Submit function called", data, userData);

    if (!post && !userData?.$id) {
      console.error("Cannot create post: missing authenticated user data.");
      return;
    }

    try {
      const file = data.image?.[0] ? await storage.uploadFile(data.image[0]) : null;
      const payload = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        featuredImage: file ? file.$id : post?.featuredImage,
      };

      if (post) {
        const dbpost = await Service.updatePost(post.$id, payload);
        console.log("Updated post result", dbpost);
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      } else {
        const dbPost = await Service.createPost({
          ...payload,
          userId: userData.$id,
        });
        console.log("Created post result", dbPost);
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Post submit error", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={storage.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
