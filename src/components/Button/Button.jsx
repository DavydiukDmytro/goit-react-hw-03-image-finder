import { Btn } from './Button.styled';

export const Button = ({ onClickLoad }) => {
  return (
    <Btn onClick={onClickLoad} type="button">
      Load more
    </Btn>
  );
};
