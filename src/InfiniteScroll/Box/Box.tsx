import style from './Box.module.scss';

export interface BoxProps {
  id: number;
}

const Box: React.FC<BoxProps> = ({ id }) => {
  return (
    <div className={style.box}>
      <div>{id}</div>
    </div>
  );
};

export default Box;
