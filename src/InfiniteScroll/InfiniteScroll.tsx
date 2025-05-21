import React, { useState, type ReactNode } from 'react';
import style from './InfiniteScroll.module.scss';

const cellWidth = 200;

interface Props {
  children: ReactNode[];
}

const InfiniteScroll: React.FC<Props> = ({ children }) => {
  const [members, setMembers] = useState<ReactNode[]>(children);




  
  const [childIds, setChildIds] = useState<number[]>([0, 1, 2, 3, 4, 5]);

  const [position, setPosition] = useState({ x: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0 });
  const [gridOffset, setGridOffset] = useState<number>(0);

  function handleMouseMove(e: React.MouseEvent) {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x });
      
      // handle right slide
      if (position.x > gridOffset + cellWidth) {
        setGridOffset(gridOffset + cellWidth);
        
        
        const childIdsClone = [...childIds];
        const originalLength = childIdsClone.length;
        childIdsClone.unshift(childIdsClone[0] - 1);
        setChildIds(childIdsClone.slice(0, originalLength));
      } else if (position.x < gridOffset) {
        setGridOffset(gridOffset - cellWidth);
        
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
    <div className={style.infiniteScrollContainer} onMouseLeave={() => setIsDragging(false)}>
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
        {childIds.map((id) => (
          <div 
            style={{
              display: 'inline-block',
              border: 'solid 1px red',
              height: 130,
              width: cellWidth,
              backgroundColor: 'orange',
              opacity: 0.9,
            }}
            key={id}>{id}
          </div>)
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
