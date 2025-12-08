/* Reusable Animated Button Component */
const AnimatedButton = ({
  text = "Click Me",           // button text
  onClick = () => {},          // event handler
  className = "",              // extra styling
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 text-lg font-semibold rounded-md 
        overflow-hidden text-white transition-all duration-300
        
        hover:from-blue-600 hover:to-cyan-500
        hover:shadow-[0_0_25px_rgba(0,200,255,0.6)]
        active:scale-95
        ${className}
      `}
    >
      {/* Shine animation layer */}
      <span className="absolute inset-0 w-0 bg-white/30 rounded-md blur-sm 
        group-hover:w-full transition-all duration-500"></span>

      {/* Button Text */}
      <span className="relative z-10">{text}</span>
    </button>
  );
};

export default AnimatedButton;
