import style from './Box.module.scss';

interface Props {
  id: number;
}

const Box: React.FC<Props> = ({ id }) => {
  return (
    <div className={style.box}>
      <div>{id}</div>
    </div>
  );
};

export default Box;
