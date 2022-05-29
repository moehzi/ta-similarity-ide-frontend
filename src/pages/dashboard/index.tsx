import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export const Dashboard = () => {
  const { user, isLoading } = useContext(UserContext);
  return (
    <div>
      ddd
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          {user.username} {user.role}
        </div>
      )}
    </div>
  );
};
