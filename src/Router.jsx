import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Gnb from './components/Gnb/Gnb';
import Feed from './pages/Feed/Feed';
import InitializeScroll from './components/InitializeScroll/InitializeScroll';

const Router = ({ userInfo, defaultProfileImage }) => {
  return (
    <BrowserRouter basename="/smiley">
      <Header />
      <Gnb userInfo={userInfo} defaultProfileImage={defaultProfileImage} />
      <Routes>
        <Route
          path="/"
          element={
            <Feed
              userInfo={userInfo}
              defaultProfileImage={defaultProfileImage}
            />
          }
        />
      </Routes>
      <InitializeScroll />
    </BrowserRouter>
  );
};

export default Router;
