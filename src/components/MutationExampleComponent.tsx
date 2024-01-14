import React from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const updateDataOnServer = async (newData: string): Promise<string> => {
  // 실제로는 서버에 데이터를 업데이트하는 API 호출이 여기에 들어갈 것입니다.
  return newData;
};

const MutationExampleComponent: React.FC = () => {
  const queryClient = useQueryClient();
  // 초기 데이터 가져오기
  const { data, isLoading, error } = useQuery<string, Error>('serverDataQuery', () => {
    return Promise.resolve('초기 데이터에요');
  });

  // Mutation 설정
  const mutation = useMutation((newData: string) => updateDataOnServer(newData), {
    onSuccess: (data) => {
      // Mutations 성공 시 캐시 업데이트
      queryClient.setQueryData('serverDataQuery', data);
    },
  });

  const handleUpdateData = () => {
    const newData = '저장하려는 데이터'; // 업데이트할 데이터
    mutation.mutate(newData); // Mutations 실행
  };

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className={"example-component"}>
      <p>UI에 보여줄 데이터: {data}</p>

      <button onClick={handleUpdateData}>서버에 '저장하려는 데이터'로 업데이트하기</button>
    </section>
  );
};

export default MutationExampleComponent;
