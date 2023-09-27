import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const fetchPost = async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return response.json();
};

const Post = () => {
  const { postId } = useParams();
  const { data } = useQuery(['post', postId], () => fetchPost(postId));

  if (!data) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Пост {data.id}</h1>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <Link className='link' to="/">Назад</Link>
    </div>
  );
};

export default Post;