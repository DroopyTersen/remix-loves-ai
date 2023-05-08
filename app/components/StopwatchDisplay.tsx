interface Props {
  value: number;
}
export function StopwatchDisplay({ value }: Props) {
  return (
    <div className="my-4 font-mono text-2xl font-bold text-center">
      {value?.toFixed(2)} seconds
    </div>
  );
}
