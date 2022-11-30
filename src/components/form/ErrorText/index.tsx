import { Typography } from '@components/common';
import { useStyles } from './styles';

interface Props {
  error?: string;
  align?: 'left' | 'right';
}

export function ErrorText(props: Props) {
  const { error, align } = props;

  const styles = useStyles();

  return (
    <Typography
      error
      text={error || ''}
      style={[!error && styles.hidden, styles.text, { textAlign: align }]}
    />
  );
}
