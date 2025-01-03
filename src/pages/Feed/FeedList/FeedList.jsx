import {useCallback, useEffect, useRef, useState} from 'react';
import '../Feed.scss';

import Webcam from "react-webcam";
import ImageList from "./FeedListItem/ImageList.jsx";

const FeedList = () => {
  /**
   * 반응형 모바일 웹에서 디바이스 네이티브 기능 접근해 카메라 촬영 후 미리보기 기능 및 갤러리 미저장 기능 구현
   * imgSrc: 갤러리에 저장되지 않고 찍힌 상태로 확대가 가능한 이미지 경로 > base64 파일 타입을 업로드 필요
   * 추가 기능: pc 해상도에서는 파일 업로드 기능만 노출 > 두 기능 구현 후 해상도마다 조건부 노출 필요
   */
  const webcamRef = useRef(null);
  const [imageList, setImageList] = useState([]);
  let updatedImageList = [...imageList];

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    updatedImageList.push({
      id: imageList.length,
      src: imageSrc
    })

    setImageList(updatedImageList);

  }, [webcamRef, imageList]);

  const videoConstraints = {
    // facingMode: user(전면 카메라 제어) | environment(후면 카메라 제어)
    facingMode: "environment"
  }

  return (
    <>
      <div className="wrapper">
        <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            width="100%"
            height="100%"
            screenshotQuality="1"
            videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
              <button
                  onClick={capture}
                  className="btn-capture"
              >
                take a picture
              </button>
          )}
        </Webcam>

        {/* 하위 컴포넌트 props로 던져줘서 리렌더링 유발 필요 */}
        <ImageList imageList={imageList}
                   setImageList={setImageList}
        />
      </div>
    </>
  );
};

export default FeedList;
