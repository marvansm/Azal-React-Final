import MainLogo from "../Featured/Components/Logo/mainLogo";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/70 backdrop-blur-md animate-fadeIn">
      <div className="relative flex flex-col items-center">
        <div className="w-32 md:w-48 animate-pulse">
          <MainLogo />
        </div>
        <div className="mt-8 flex gap-1">
          <div className="w-2 h-2 bg-[#0067dd] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-[#0067dd] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-[#0067dd] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
