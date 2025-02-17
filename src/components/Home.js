import useAxios from 'axios-hooks';

function Home() {
  const [{ data, loading, error }, refetch] = useAxios('http://localhost/account_locker_api/api.php?path=/health-test');

  return (
    <div className="home">
      <h1>Welcome to Account Locker</h1>
      <div className="server-status">
        <button onClick={refetch} className="ping-button">
          Ping Server
        </button>
        <div className="response-box">
          {loading ? 'Loading...' : data ? JSON.stringify(data) : 'No data'}
        </div>
      </div>
    </div>
  );
}

export default Home; 