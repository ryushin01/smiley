import { useEffect, useState } from 'react';
import { ReactComponent as IconMore } from '../../../../assets/images/icon_more.svg';
import { ReactComponent as IconDelete } from '../../../../assets/images/icon_delete.svg';
import { ReactComponent as IconEdit } from '../../../../assets/images/icon_edit.svg';
import { ReactComponent as IconCancel } from '../../../../assets/images/icon_close.svg';
import { ReactComponent as IconPrevArrow } from '../../../../assets/images/icon_prev_arrow.svg';
import { ReactComponent as IconNextArrow } from '../../../../assets/images/icon_next_arrow.svg';
import Portal from '../../../../components/Modal/Portal';
import Modal from '../../../../components/Modal/Modal';
import FeedDetail from '../../../../components/Modal/Contents/FeedDetail/FeedDetail';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeedListItem.scss';

/**
 * FeedListItem.js logics
 * @property {function} modalHandler          - 모달 팝업 관련 함수입니다.
 * @property {function} switchDateStringify   - 피드 업로드 일자를 문자열로 변환하는 함수입니다.
 */

const FeedListItem = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    id,
    text,
    user_id,
    created_at,
    images,
    comment_count,
    nickname,
    isHot,
    profile_image,
    defaultProfileImage,
    profileImage,
  } = props;

  const dropdownHandler = () => {
    setDropdownOpen(prev => !prev);
    setModalOpen(false);
  };

  const modalHandler = () => {
    setModalOpen(prev => !prev);
    setDropdownOpen(false);
  };

  const switchDateStringify = postDate => {
    const currentDate = new Date();
    const postDateObj = new Date(postDate);
    const timeDifference = currentDate - postDateObj;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `방금 전`;
    }
  };

  const refinedDate = switchDateStringify(created_at);

  const postComment = e => {
    e.preventDefault();
  };

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', close);
  }, []);

  return (
    <>
      <article className="feed-list-item">
        <div>
          <div className="info">
            <div className="left-split">
              <img
                src={profile_image === '' ? defaultProfileImage : profile_image}
                alt={`${nickname} 님의 프로필 사진`}
                className={isHot ? 'hot-feed' : ''}
              />
              <div>
                <strong>
                  {nickname}
                </strong>
                <span>{refinedDate}</span>
              </div>
            </div>
            <div className="right-split">
              <div className="dropdown">
                <button type="button" onClick={dropdownHandler}>
                  <IconMore />
                </button>
                {dropdownOpen && (
                  <ul>
                    <li>
                      <button type="button">
                        <IconDelete />
                        삭제하기
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <IconEdit />
                        수정하기
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => dropdownHandler()}>
                        <IconCancel />
                        취소하기
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="content">
            <div className="swiper-area">
              <Swiper
                loop
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: '.swiper-prev-btn',
                  nextEl: '.swiper-next-btn',
                }}
                pagination={{ clickable: false }}
              >
                {images?.map(({ src, text }, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <picture>
                        {/* <source
                        srcSet="/images/wide_image.jpg"
                        media="all and (min-width: 800px)"
                      /> */}
                        <img src={src} alt={text} />
                      </picture>
                    </SwiperSlide>
                  );
                })}
                <div className="swiper-controller">
                  <button type="button" className="swiper-prev-btn">
                    <IconPrevArrow />
                  </button>
                  <button type="button" className="swiper-next-btn">
                    <IconNextArrow />
                  </button>
                </div>
              </Swiper>
            </div>
            <p>{text}</p>
          </div>
          <div className="comment">
            <button type="button" onClick={modalHandler}>
              댓글 {comment_count?.toLocaleString()}개 모두 보기
            </button>
            <Portal>
              {modalOpen && (
                <Modal
                  data={
                    <FeedDetail
                      text={text}
                      refinedDate={refinedDate}
                      images={images}
                      commentCount={comment_count}
                      nickname={nickname}
                      profileImage={profile_image}
                      defaultProfileImage={defaultProfileImage}
                    />
                  }
                  onClose={modalHandler}
                />
              )}
            </Portal>
          </div>
          <div className="comment-write">
            <div className="comment-writer">
              <img
                src={profileImage === '' ? defaultProfileImage : profileImage}
                alt={`${nickname} 님의 프로필 사진`}
              />
            </div>
            <form className="comment-form" onSubmit={postComment}>
              <fieldset>
                <legend className="hidden">댓글 게시 양식</legend>
                <textarea
                  name="commentWrite"
                  placeholder="댓글은 최대 100자까지 작성할 수 있습니다."
                  maxLength={100}
                ></textarea>
              </fieldset>
              <button type="submit">게시</button>
            </form>
          </div>
        </div>
      </article>
    </>
  );
};

export default FeedListItem;
