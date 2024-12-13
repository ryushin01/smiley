import { useState } from 'react';
import { ReactComponent as IconPrevArrow } from '../../../../assets/images/icon_prev_arrow.svg';
import { ReactComponent as IconNextArrow } from '../../../../assets/images/icon_next_arrow.svg';
import { ReactComponent as IconMore } from '../../../../assets/images/icon_more.svg';
import { ReactComponent as IconDelete } from '../../../../assets/images/icon_delete.svg';
import { ReactComponent as IconEdit } from '../../../../assets/images/icon_edit.svg';
import { ReactComponent as IconCancel } from '../../../../assets/images/icon_close.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeedDetail.scss';

const FeedDetail = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    commentCount,
    defaultProfileImage,
    images,
    nickname,
    profileImage,
    text,
    refinedDate,
  } = props;

  const dropdownHandler = () => {
    setDropdownOpen(prev => !prev);
  };

  const postComment = e => {
    e.preventDefault();
  };

  return (
    <>
      <article className="feed-detail">
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
        <div>
          <div className="info">
            <div className="left-split">
              <img
                src={profileImage === '' ? defaultProfileImage : profileImage}
                alt={`${nickname} 님의 프로필 사진`}
              />
              <div>
                <strong>{nickname}</strong>
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
            <p>{text}</p>
          </div>
          <div className="comment">
            <ul className="comment-list">
              <li>
                <div className="comment-writer">
                  <img
                    src={
                      profileImage === '' ? defaultProfileImage : profileImage
                    }
                    alt={`${nickname} 님의 프로필 사진`}
                  />
                </div>
                <div className="comment-content">
                  <span>
                    댓글이 길어지면 이렇게 됩니다. 댓글이 길어지면 이렇게
                    됩니다. 댓글이 길어지면 이렇게 됩니다. 댓글이 길어지면
                    이렇게 됩니다. 댓글이 길어지면 이렇게 됩니다. 댓글이
                    길어지면 이렇게 됩니다. 댓글이 길어지면 이렇게 됩니다.
                    댓글이 길어지면 이렇게 됩니다. 댓글이 길어지면 이렇게
                    됩니다. 댓글이 길어지면 이렇게 됩니다. 댓글이 길어지면
                    이렇게 됩니다. 댓글이 길어지면 이렇게 됩니다. 댓글이
                    길어지면 이렇게 됩니다. 댓글이 길어지면 이렇게 됩니다.
                  </span>
                  <span>{refinedDate}</span>
                </div>
              </li>
              <li>
                <div className="comment-writer">
                  <img
                    src={
                      profileImage === '' ? defaultProfileImage : profileImage
                    }
                    alt={`${nickname} 님의 프로필 사진`}
                  />
                </div>
                <div className="comment-content">
                  <span>
                    댓글이 길어지면 이렇게 됩니다. 댓글이 길어지면 이렇게
                    됩니다. 댓글이 길어지면 이렇게 됩니다. 댓글이 길어지면
                    이렇게 됩니다. 댓글이 길어지면 이렇게 됩니다. 댓글이
                    길어지면 이렇게 됩니다. 댓글이 길어지면 이렇게 됩니다.
                    댓글이 길어지면 이렇게 됩니다. 댓글이 길어지면 이렇게
                    됩니다. 댓글이 길어지면 이렇게 됩니다. 댓글이 길어지면
                    이렇게 됩니다. 댓글이 길어지면 이렇게 됩니다. 댓글이
                    길어지면 이렇게 됩니다. 댓글이 길어지면 이렇게 됩니다.
                  </span>
                  <span>{refinedDate}</span>
                </div>
              </li>
              <li>
                <div className="comment-writer">
                  <img
                    src={
                      profileImage === '' ? defaultProfileImage : profileImage
                    }
                    alt={`${nickname} 님의 프로필 사진`}
                  />
                </div>
                <div className="comment-content">
                  <span>댓글</span>
                  <span>{refinedDate}</span>
                </div>
              </li>
            </ul>
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
                  name="commentCreate"
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

export default FeedDetail;
