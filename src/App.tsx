import React from 'react';
import ExampleComponent from "./components/ExampleComponent";
import ExampleComponent2 from "./components/ExampleComponent2";
import MyCodeBlock from "./components/MyCodeBlock";
import MutationExampleComponent from "./components/MutationExampleComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        React Query를 스터디하기 위한 프로젝트입니다.
      </header>
      <main>
        <h2>리액트 쿼리란?</h2>
        <p>리액트로 만든 애플리케이션에서 데이터를 효과적으로 관리하기 위한 상태관리 라이브러리로, API호출, 데이터캐싱, 상태관리, 비동기 작업등을 쉽게 처리할 수 있도록 지원하는 툴</p>

        <br/><br/>

        <h2>리액트 쿼리로 할 수 있는 것</h2>
        <ol>
          <li><strong>쉬운 데이터 가져오기</strong>: API 호출 및 데이터 처리를 쉽게 관리할 수 있습니다.</li>
          <li><strong>캐싱 및 상태 관리</strong>: 데이터를 자동으로 캐싱하고 상태를 관리하여 불필요한 중복 요청을 방지하고 성능을 향상시킵니다.</li>
          <li><strong>인터랙티브한 데이터 업데이트</strong>: 데이터를 가져올 때 자동으로 UI를 업데이트하고 사용자 경험을 향상시킵니다.</li>
          <li><strong>비동기 처리</strong>: 비동기 작업을 간편하게 처리하고 관리할 수 있습니다.</li>
        </ol>

        <br/><br/>

        <h2>사용해보기</h2>
        <h3>1. 설치하기</h3>
        <MyCodeBlock
          code={`npm install react-query`}
        />
        <br/>
        <h3>2. QueryClientProvider 제공하기</h3>
        <MyCodeBlock
          code={
`  // 파일위치: src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // 실제 앱 컴포넌트
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient(); // 리액트 쿼리의 모든 쿼리와 뮤테이션을 관리하는 쿼리 클라이언트 객체

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider // 리액트 쿼리의 모든 컴포넌트에서 사용할 수 있는 컨텍스트를 제공, 컴포넌트 트리의 최상위에 위치
      client={queryClient} // 쿼리 클라이언트 객체를 props로 전달
    >
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
`}
        />
        <br/>
        <h3>3. React Query 사용하기</h3>
        <MyCodeBlock
          code={
`// 파일위치: src/components/ExampleComponent.tsx
// ...생략
import { useQuery, QueryKey } from 'react-query';

// api
const fetchData = async (): Promise<Todo> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data: Todo = await response.json();
  return data;
};

const ExampleComponent = () => {
  // useQuery 훅을 사용하여 데이터를 가져옴
  // 첫번째 인자: 쿼리 키, 두번째 인자: 데이터를 가져오는 함수
  // useQuery 훅은 데이터를 가져오는 함수를 실행하고, 데이터를 가져오는 동안 로딩 상태를 관리하고, 데이터를 가져오는 동안 발생하는 에러를 관리
  // useQuery<TDtat, TError> 에서 TDtat은 데이터의 타입, TError는 에러의 타입
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
    <div>
      <section className={"example-component"}>
      <h1>리액트 쿼리를 사용한 화면이에요</h1>
      <button onClick={handleRefetch}>데이터 다시 불러오기</button>
      <p>불러온 데이터: {data?.title}</p>
      </section>
    </div>
  );
};

export default ExampleComponent;
`
          }
        />
        <br/>
        <h3>4. 적용한 컴포넌트</h3>

        <ExampleComponent/>

        <br/><br/>

        <h3>5. React Query key로 데이터 캐싱하기</h3>
        <p>쿼리 키는 쿼리의 고유 식별자로, 쿼리 키를 사용하여 쿼리의 데이터를 캐싱하고 관리할 수 있습니다.</p>
        <ExampleComponent2/>

        <br/>

        <h3>6. Mutations를 이용해 서버에 데이터를 업데이트하기</h3>
        <p>useMutation은 비동기적으로 데이터를 수정하고, 데이터를 업데이트하여 UI를 리렌더링합니다.</p>
        <MyCodeBlock code={
`// src/components/MutationExampleComponent.tsx
// ... 생략
import {useMutation, useQuery, useQueryClient} from 'react-query';

const updateDataOnServer = async (newData: string): Promise<string> => {
  // 실제로는 서버에 데이터를 업데이트하는 API 호출이 여기에
  return newData;
};

const MutationExampleComponent = () => {
  const queryClient = useQueryClient();
  // 초기 데이터 가져오기
  const { data, isLoading, error } = useQuery<string, Error>('serverDataQuery', () => {
    return Promise.resolve('초기 데이터에요');
  });

  // Mutation 설정
  const mutation = useMutation((newData: string) => updateDataOnServer(newData), {
    onSuccess: (newData) => {
      // Mutations 성공 시 캐시 업데이트, UI에서도 이 데이터가 표기됨
      queryClient.setQueryData('serverDataQuery', newData);
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
`
        }/>
        <br/>
        <MutationExampleComponent/>
        <br/>

        <h2>리액트 쿼리 vs 리덕스</h2>
        <table>
          <thead>
            <tr>
              <th>비교항목</th>
              <th>리액트 쿼리</th>
              <th>리덕스</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>목적</th>
              <td>비동기 데이터 관리에 중점</td>
              <td>애플리케이션 전체의 상태 관리에 중점</td>
            </tr>
            <tr>
              <th>범위</th>
              <td>컴포넌트 내부에서 상태를 관리. <br/>주로 API 호출 및 데이터 캐싱에 사용하며 컴포넌트 간 데이터 공유를 간편하게 함</td>
              <td>상태를 전역적으로 관리. <br/>앱의 전역 상태를 하나의 스토어에서 관리하고, 상태 변화를 위한 액션과 리듀서를 사용</td>
            </tr>
            <tr>
              <th>API호출 및 비동기작업</th>
              <td>비동기 작업을 간편하게 처리하며, API 호출 및 데이터 캐싱에 최적화</td>
              <td>비동기 작업을 처리하기 위해서는 미들웨어(예: Redux Thunk)를 추가로 사용</td>
            </tr>
          </tbody>
        </table>

        <br/><br/>
        <h2>참고</h2>
        <p>chat GPT와 함께함</p>
        <p>공식문서: <a href={"https://tanstack.com/query/latest/docs/react/quick-start"} target={"_blank"}>https://tanstack.com/query/latest/docs/react/quick-start</a></p>
      </main>
    </div>
  );
}

export default App;
