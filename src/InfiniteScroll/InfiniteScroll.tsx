import React, { useState, type ReactElement } from 'react';
import style from './InfiniteScroll.module.scss';

interface Props {
  parentWidth: number;
  membersWidth: number;
  members: ReactElement[];
  handleOverflow: (side: 'left' | 'right', members: ReactElement[]) => ReactElement[];
}

const InfiniteScroll: React.FC<Props> = ({ parentWidth, membersWidth, members, handleOverflow }) => {
  const [items, setItems] = useState<ReactElement[]>(members);
  const [position, setPosition] = useState({ x: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0 });
  const [gridOffset, setGridOffset] = useState<number>(0 - membersWidth * 2);

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x });

      if (position.x - membersWidth * 2 > gridOffset + membersWidth) {
        setGridOffset(gridOffset + membersWidth);
        setItems(handleOverflow('right', items));
      } else if (position.x - membersWidth * 2 < gridOffset) {
        setGridOffset(gridOffset - membersWidth);
        setItems(handleOverflow('left', items));
      }
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x });
  }

  return (
    <div
      className={style.infiniteScrollContainer}
      style={{ width: parentWidth }}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div
        style={{
          transform: `translate(${position.x}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
          right: gridOffset,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
      >
        {items.map((item, i) => (
          <div
            style={{
              display: 'inline-block',
              width: membersWidth,
            }}
            key={i}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
