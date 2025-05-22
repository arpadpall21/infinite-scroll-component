import { type ReactNode } from 'react';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import Box from './InfiniteScroll/Box/Box';

const defaultItems: ReactNode[] = [
  <Box id={1} />,
  <Box id={2} />,
  <Box id={3} />,
  <Box id={4} />,
  <Box id={5} />,
  <Box id={6} />,
];

const App = () => {
  return (
    <div style={{ margin: '100px auto' }}>
      <InfiniteScroll
        items={defaultItems}
        parentSize={{ width: 1000, height: 150 }}
        membersSize={{ width: 200, height: 150 }}
      />
    </div>
  );
};

export default App;
