export type selectProps = {
  value: string | number;
  opts: Array<{ title: string; value: string | number } | boolean>;
  handleChange: () => void | string | number | boolean;
};
