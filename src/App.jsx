import { useEffect, useRef, useState } from 'react';
import { customAxios } from './modules/customAxios';
import Router from './Router';
import './assets/scss/base/common.scss';

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const targetRef = useRef(null);
  const defaultProfileImage =
    'https://ryushin01.github.io/smiley/images/login/logo.png';

  async function getUserInfo() {
    try {
      const response = await customAxios.get('UserInfoData.json');

      if (response.status === 200) {
        setUserInfo(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router userInfo={userInfo} defaultProfileImage={defaultProfileImage} />
  );
};

export default App;
