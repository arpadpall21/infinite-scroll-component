interface Props {
  id: number;
}

const Box: React.FC<Props> = ({ id }) => {
  return <div> {id} </div>;
};

export default Box;
