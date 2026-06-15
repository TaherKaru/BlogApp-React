import React from "react";
import { Container } from "../components/index";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Service from "../AppWrite/Database";

function EditPost() {
  const [posts, setPosts] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      getPost(slug).then((posts) => {
        if (posts) {
          setPosts(posts);
        }
      });
    }else{
        navigate("/")
    }
  },[slug,navigate]);

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}


export default EditPost;
