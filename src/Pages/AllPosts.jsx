import React, { useEffect, useState } from "react";
import Service from "../AppWrite/Database";
import Container from '../components/Container/Container'
import PostCard from '../components/postCard'


function AllPosts() {
  const [posts, setPosts] = useState("");

  useEffect(() => {}, []);

  Service.getPosts([])
    .then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    })
    .catch((error) => {
      return console.log(error);
    });

  return (
  <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((postdata) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...postdata} />
                </div>
            ))}
        </div>
    </Container>
  </div>
  )
}

export default AllPosts;
