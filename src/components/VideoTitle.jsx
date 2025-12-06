import { Button } from "./";
import { IoPlaySharp } from "react-icons/io5";
import { RiInformationLine } from "react-icons/ri";

function VideoTitle({ title, overview }) {
  return (
    <div className="space-y-2 sm:space-y-4 px-2 sm:px-0 max-w-full md:max-w-xl">
      {/* Movie Title */}
      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-xl leading-snug md:leading-tight line-clamp-2 sm:line-clamp-3">
        {title}
      </h1>

      {/* Movie Overview */}
      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 drop-shadow-lg line-clamp-3 sm:line-clamp-4">
        {overview}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-4">
        <Button
          variant="custom"
          className="flex items-center justify-center gap-1 sm:gap-2 bg-white text-black font-semibold px-4 py-1 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base hover:bg-opacity-80 transition"
        >
          <IoPlaySharp size={18} className="sm:hidden" />
          Play
        </Button>

        <Button className="flex items-center justify-center gap-1 sm:gap-2 bg-gray-600/70 text-white font-semibold px-4 py-1 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base hover:bg-gray-600 transition">
          <RiInformationLine size={18} className="sm:hidden" />
          More Info
        </Button>
      </div>
    </div>
  );
}

export default VideoTitle;
