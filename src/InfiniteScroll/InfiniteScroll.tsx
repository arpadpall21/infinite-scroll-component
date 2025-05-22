import React, { useState, type ReactElement } from 'react';
import style from './InfiniteScroll.module.scss';

interface Dimensions {
  width: number;
  height: number;
}

interface Props {
  parentSize: Dimensions;
  membersSize: Dimensions;
  items: ReactElement[];
  handleOverflow: (side: 'left' | 'right', _items: ReactElement[]) => ReactElement[];
}

const InfiniteScroll: React.FC<Props> = ({ items, parentSize, membersSize, handleOverflow }) => {
  const [_items, _setItems] = useState<ReactElement[]>(items);
  const [position, setPosition] = useState({ x: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0 });
  const [gridOffset, setGridOffset] = useState<number>(0);

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x });

      if (position.x > gridOffset + membersSize.width) {
        setGridOffset(gridOffset + membersSize.width);
        _setItems(handleOverflow('right', _items));
      } else if (position.x < gridOffset) {
        setGridOffset(gridOffset - membersSize.width);
        _setItems(handleOverflow('left', _items));
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
      style={{ width: parentSize.width, height: parentSize.height }}
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
        {_items.map((item, i) => (
          <div
            style={{
              display: 'inline-block',
              width: membersSize.width,
              height: membersSize.height,
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
