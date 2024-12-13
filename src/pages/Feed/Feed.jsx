import FeedList from './FeedList/FeedList';
import './Feed.scss';

const Feed = ({ userInfo, defaultProfileImage }) => {
  return (
    <main className="feed">
      <section className="feed-section">
        <FeedList
          userInfo={userInfo}
          defaultProfileImage={defaultProfileImage}
        />
      </section>
    </main>
  );
};

export default Feed;
