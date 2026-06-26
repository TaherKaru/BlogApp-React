import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import { useParams, useNavigate } from "react-router-dom";
import Service from "../AppWrite/Database";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      Service.getPost(slug).then((postData) => {
        if (postData) {
          setPost(postData);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
