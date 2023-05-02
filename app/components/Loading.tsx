export const Loading = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-8 py-1 md:py-6">
      <div className="absolute w-8 h-8 rounded-full bg-emerald-500/80 animate-ping"></div>
      <div className="absolute w-8 h-8 rounded-full bg-emerald-500/80"></div>
    </div>
  );
};
