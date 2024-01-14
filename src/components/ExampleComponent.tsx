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

const ExampleComponent: React.FC = () => {
  const { data, isLoading, error, refetch } = useQuery<Todo, Error>('exampleQuery', fetchData);
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefetch = async () => {
    try {
      setIsRefetching(true);
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  };

  if (isLoading || isRefetching) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className={"example-component"}>
      <h1>리액트 쿼리를 사용한 화면이에요</h1>
      <button onClick={handleRefetch}>데이터 다시 불러오기</button>
      <p>불러온 데이터: {data?.title}</p>
    </section>
  );
};

export default ExampleComponent;
