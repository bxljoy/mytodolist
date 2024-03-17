const ProgressBar = ({ progress }) => {
  return (
    <div className="w-80 max-md:w-60 bg-gray-300 rounded-lg">
      <div
        className="h-6 rounded-lg transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%`, backgroundColor: "red" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
