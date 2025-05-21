import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import Box from './InfiniteScroll/Box/Box';

const App = () => {
  return (
    <div style={{ margin: '100px auto' }}>
      <InfiniteScroll parentWidth={1000} membersWidth={200}>
        <Box id={1} />
        <Box id={2} />
        <Box id={3} />
      </InfiniteScroll>
    </div>
  );
};

export default App;
