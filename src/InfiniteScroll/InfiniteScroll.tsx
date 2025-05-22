import React, { useState, type ReactNode } from 'react';
import style from './InfiniteScroll.module.scss';

interface Dimensions {
  width: number;
  height: number;
}

interface Props {
  parentSize: Dimensions;
  membersSize: Dimensions;
  items: ReactNode[];
}

const InfiniteScroll: React.FC<Props> = ({ items, parentSize, membersSize }) => {
  const [_items, _setItems] = useState<ReactNode[]>(items);


  const [childIds, setChildIds] = useState<number[]>([0, 1, 2, 3, 4, 5]);

  const [position, setPosition] = useState({ x: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0 });
  const [gridOffset, setGridOffset] = useState<number>(0);

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x });
      
      // handle right slide
      if (position.x > gridOffset + membersSize.width) {
        setGridOffset(gridOffset + membersSize.width);
        
        
        const childIdsClone = [...childIds];
        const originalLength = childIdsClone.length;
        childIdsClone.unshift(childIdsClone[0] - 1);
        setChildIds(childIdsClone.slice(0, originalLength));
      } else if (position.x < gridOffset) {
        setGridOffset(gridOffset - membersSize.width);
        
        const childIdsClone = [...childIds]
        childIdsClone.push(childIdsClone[childIdsClone.length -1] + 1);
        childIdsClone.shift()
        setChildIds(childIdsClone);
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
