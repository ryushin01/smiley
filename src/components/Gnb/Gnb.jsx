import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Portal from '../Modal/Portal';
import Modal from '../Modal/Modal';
import FeedCreate from '../Modal/Contents/FeedCreate/FeedCreate';
import { ReactComponent as IconHome } from '../../assets/images/icon_home.svg';
import { ReactComponent as IconFeed } from '../../assets/images/icon_feed.svg';
import { ReactComponent as IconTop } from '../../assets/images/icon_top.svg';
import './Gnb.scss';

const Gnb = ({ userInfo, defaultProfileImage }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const modalHandler = () => {
    setModalOpen(prev => !prev);
  };

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', close);
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
    });
  };

  const { userId, nickname, profileImage } = userInfo;

  return (
    <nav className="gnb">
      <ul>
        <li>
          <button type="button" onClick={() => navigate('/feed')}>
            <IconHome />
          </button>
        </li>
        <li>
          <button type="button">
            <img
              src={profileImage === '' ? defaultProfileImage : profileImage}
              alt={`${nickname} 님의 프로필 사진`}
            />
          </button>
        </li>
        <li>
          <button type="button" onClick={modalHandler}>
            <IconFeed />
          </button>

          <Portal>
            {modalOpen && (
              <Modal
                data={
                  <FeedCreate
                    nickname={nickname}
                    profileImage={profileImage}
                    defaultProfileImage={defaultProfileImage}
                    onClose={modalHandler}
                  />
                }
                onClose={modalHandler}
              />
            )}
          </Portal>
        </li>
        <li>
          <button type="button" onClick={goToTop}>
            <IconTop />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Gnb;
