import './ImageList.scss'

const ImageList = (props) => {
    const { imageList, setImageList } = props;

    /**
     * 이미지 목록 아이템 중 특정 아이템을 개별 삭제하기 위한 함수
     * @param {number} id - 첫 번째 숫자
     * @returns {number} number1 + number2
     */
    const removeImageListItem = (id) => {
        setImageList(imageList.filter(item => item.id !== id))
    }

  return (
    <>
      <ul className="image-list">
        {imageList.map((item) => {
          const { id, src }= item;
          return (
              <li key={id}>
                  <img src={src} alt={`${id + 1}번 임시 이미지`} />
                  <button
                      type="button"
                      aria-label="해당 이미지 삭제"
                      onClick={() => {removeImageListItem(id)}}
                  >X</button>
              </li>
          )
        })}
      </ul>
    </>
  );
};

export default ImageList;
