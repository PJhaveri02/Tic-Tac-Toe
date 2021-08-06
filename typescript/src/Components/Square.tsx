interface Props {
  value: string | null;
  onClick: () => void;
}
export const Square: React.FC<Props> = ({ value, onClick }) => {
  return (
    <button className='square' onClick={() => onClick()}>
      {value}
    </button>
  );
};
