// src/components/ExampleComponent.tsx

import React, {useState} from 'react';
import { useQuery } from 'react-query';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchData = async (): Promise<Todo> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data: Todo = await response.json();
  return data;
};

const ExampleComponent2: React.FC = () => {
  const { data, isLoading, error } = useQuery<Todo, Error>('exampleQuery', fetchData);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className={"example-component"}>
      <h1>위 컴포넌트와 동일한 쿼리키 'exampleQuery'로 리액트 쿼리를 사용한 컴포넌트에요.</h1>
      <p>리프레시한 후 네트워크탭을 보면 API를 한 번만 호출한 것을 확인 할 수 있어요, 만약 키를 다르게 하면 각 컴포넌트에서 같은 API를 1회씩 호출합니다.</p>
      <p>위 컴포넌트에서 불러온 데이터로 사용함: {data?.title}</p>
    </section>
  );
};

export default ExampleComponent2;
