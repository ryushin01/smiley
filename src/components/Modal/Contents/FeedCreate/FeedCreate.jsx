import { useState } from 'react';
import { customAxios } from '../../../../modules/customAxios';
import { ReactComponent as IconPrevArrow } from '../../../../assets/images/icon_prev_arrow.svg';
import { ReactComponent as IconNextArrow } from '../../../../assets/images/icon_next_arrow.svg';
import Button from '../../../Button/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeedCreate.scss';

/**
 * FeedCreate.js logics
 * @property {function} typingSentry          - 피드 작성 내용 입력 시 값을 모니터링하기 위한 함수입니다.
 * @property {function} changedFeedImages     - 멀티 이미지 업로드와 미리보기를 위한 함수입니다.
 * @property {function} postFeedCreate        - 피드 작성을 위한 데이터를 서버로 전송하는 함수입니다.
 */

// 8. 멀티 이미지 전송하기 위해 JavaScript 내장 객체인 formData를 생성합니다.
const formData = new FormData();

const FeedCreate = ({ nickname, profileImage, defaultProfileImage }) => {
  // 1. 멀티 이미지 업로드와 미리보기를 위한 useState를 만듭니다.
  const [feedImages, setFeedImages] = useState([]);

  // 피드 작성 내용을 저장하는 useState
  const [feedText, setFeedText] = useState({
    feedCreate: '',
  });

  const typingSentry = e => {
    const { name, value } = e.target;
    setFeedText({ ...feedText, [name]: value });
  };

  const changedFeedImages = e => {
    // 2. file 타입 input의 files에 접근하고 변수화합니다.
    const imageLists = e.target.files;

    // 3. 파일 객체가 없는 경우는 함수를 종료합니다. (early return)
    if (!imageLists) {
      return;
    }

    // 4. 불변성을 지키기 위해 feedImages를 복사합니다.
    let imageUrlLists = [...feedImages];

    // 5. URL.createObjectURL 메서드를 통해 이미지 파일을 blob 형태로 변환하고, 기존 데이터를 복사한 배열 imageUrlLists로 넣습니다. (createObjectUrl을 사용하는 방법: 이미지를 blob형태로 변경)
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    // 6. 이미지 업로드 갯수를 최대 5개로 제한합니다.
    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    // 7. 이미지 경로를 저장합니다.
    setFeedImages(imageUrlLists);

    // 9. formData에 append를 사용해 key, value를 넣습니다.
    formData.append('files', imageLists);
  };

  async function postFeedCreate(e) {
    e.preventDefault();

    try {
      const response = await customAxios.post('url', {
        // 10. data 안에 텍스트 데이터와 이미지 데이터를 넣고 서버 전송합니다. (post인 경우: 데이터 전송 객체(DTO))
        text: feedText.feedCreate,
        images: formData,
      });

      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <article className="feed-detail feed-create">
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
            {feedImages?.map(({ text }, index) => {
              return (
                <SwiperSlide key={index}>
                  <picture>
                    <img src={feedImages[index]} alt={text} />
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
              </div>
            </div>
          </div>

          <div className="content">
            <form className="feed-form" onChange={typingSentry}>
              <fieldset>
                <legend className="hidden">피드 게시 양식</legend>
                <div className="file-upload">
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={changedFeedImages}
                    multiple
                  />
                  <label htmlFor="file">사진 선택</label>
                </div>
                <textarea
                  name="feedCreate"
                  placeholder="피드는 최대 2,000자까지 작성할 수 있습니다."
                  maxLength={2000}
                ></textarea>
                <Button
                  type="submit"
                  shape="solid"
                  content="게시"
                  onClick={postFeedCreate}
                />
              </fieldset>
            </form>
          </div>
        </div>
      </article>
    </>
  );
};

export default FeedCreate;
