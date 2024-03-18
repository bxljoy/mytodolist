const ProgressBar = ({ progress }) => {
  return (
    <div className="w-80 max-md:w-60 bg-[#ACE2E1] rounded-full">
      <div
        className="h-6 rounded-full transition-all duration-500 ease-in-out bg-[#41C9E2]"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
