import {useCallback, useEffect, useRef, useState} from 'react';
import { customAxios } from '../../../modules/customAxios';
import Loading from '../../Loading/Loading';
import FeedListItem from './FeedListItem/FeedListItem';
import '../Feed.scss';

import Webcam from "react-webcam";

/**
 * FeedList.js logics
 * @property {function} getFeedList           - 피드 목록 데이터를 받아오는 함수입니다.
 */

const FeedList = ({ userInfo, defaultProfileImage }) => {
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState([]);

  // query string이 필요한 경우: 동적 라우팅, 페이지네이션, 필터 등
  const params = {
    id: 12345,
  };

  async function getFeedList() {
    try {
      const response = await customAxios.get('FeedListData.json', { params });

      if (response.status === 200) {
        console.log(response);
        setFeedData(response?.data.reverse());
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { profileImage } = userInfo;

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const videoConstraints = {
    facingMode: "environment"
  }


  return (
    <>
      {loading && <Loading />}
      {/*<ul className="feed-list">*/}
      {/*  {feedData?.map(*/}
      {/*    (*/}
      {/*      {*/}
      {/*        id,*/}
      {/*        text,*/}
      {/*        is_mine,*/}
      {/*        user_id,*/}
      {/*        created_at,*/}
      {/*        images,*/}
      {/*        comment_count,*/}
      {/*        nickname,*/}
      {/*        profile_image,*/}
      {/*        isHot,*/}
      {/*      },*/}
      {/*      index,*/}
      {/*    ) => {*/}
      {/*      return (*/}
      {/*        <li key={index}>*/}
      {/*          <FeedListItem*/}
      {/*            id={id}*/}
      {/*            text={text}*/}
      {/*            is_mine={is_mine}*/}
      {/*            user_id={user_id}*/}
      {/*            created_at={created_at}*/}
      {/*            images={images}*/}
      {/*            comment_count={comment_count}*/}
      {/*            nickname={nickname}*/}
      {/*            isHot={isHot}*/}
      {/*            profile_image={profile_image}*/}
      {/*            defaultProfileImage={defaultProfileImage}*/}
      {/*            profileImage={profileImage}*/}
      {/*          />*/}
      {/*        </li>*/}
      {/*      );*/}
      {/*    },*/}
      {/*  )}*/}
      {/*</ul>*/}

      <div className="wrapper">
        <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            width="100%"
            height="100%"
            mirrored="true"
            screenshotQuality="1"
            videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
              <button
                  onClick={capture}
                  className="btn-capture"
              >
                사진 촬영하기
              </button>
          )}
        </Webcam>
        {imgSrc && (
            <img
                src={imgSrc}
            />
        )}
      </div>
    </>
  );
};

export default FeedList;
