import React, { useEffect, useState } from "react";
import Service from "../AppWrite/Database";
import Container from '../components/Container/Container'
import PostCard from '../components/postCard'


function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Service.getPosts()
      .then((result) => {
        if (result) {
          setPosts(result.documents || []);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((postdata) => (
            <div key={postdata.$id} className="p-2 w-1/4">
              <PostCard {...postdata} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
