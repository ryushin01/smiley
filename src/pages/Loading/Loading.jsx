import Lottie from 'lottie-react';
import loading from '../../lottie/loading.json';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading-wrap">
      <Lottie animationData={loading} />
    </div>
  );
};

export default Loading;
