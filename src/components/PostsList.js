import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';

const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}`);
  return response.json();
};

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery('posts', fetchPosts, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return null;
      }
      return allPages.length + 1;
    },
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!data || data.pages.length === 0) {
    return <div>Посты не найдены</div>;
  }

  return (
    <div>
      <h1>Посты из JSON Placeholder</h1>

      <div className='posts'>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((post) => (
              <div key={post.id} className='posts__item'>
                <div className='text'>
                    <span>{post.id}. </span>{post.title.length > 30 ? post.title.slice(0, 30) + '...' : post.title}{' '}
                </div>
                <Link className='link' to={`/post/${post.id}`}>Просмотр</Link>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      
      {hasNextPage && (
        <button className='button' onClick={() => fetchNextPage()}>Загрузить еще</button>
      )}
    </div>
  );
};

export default PostList;
