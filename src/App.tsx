import { type ReactElement } from 'react';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import Box, { type BoxProps } from './InfiniteScroll/Box/Box';

// example initial members
const defaultMembers: ReactElement[] = [
  <Box id={-2} />,
  <Box id={-1} />,
  <Box id={0} />,
  <Box id={1} />, // 1st visible
  <Box id={2} />,
  <Box id={3} />,
  <Box id={4} />,
  <Box id={5} />, // last visible
  <Box id={6} />,
  <Box id={8} />,
];

const App = () => {
  function handleOverflow(side: 'left' | 'right', members: ReactElement[]) {
    // example how to handle overflow

    const memberIds: number[] = members.map((item) => {
      const p: BoxProps = item.props as BoxProps;
      return p.id;
    });

    if (side === 'left') {
      memberIds.push(memberIds[memberIds.length - 1] + 1);
      memberIds.shift();
      return memberIds.map((id) => <Box id={id} />);
    } else {
      const originalLength: number = memberIds.length;
      memberIds.unshift(memberIds[0] - 1);
      return memberIds.slice(0, originalLength).map((id) => <Box id={id} />);
    }
  }

  return (
    <div style={{ margin: '100px auto' }}>
      <InfiniteScroll parentWidth={1000} membersWidth={200} members={defaultMembers} handleOverflow={handleOverflow} />
    </div>
  );
};

export default App;
