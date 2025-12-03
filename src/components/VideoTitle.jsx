import { Button } from "./";
import { IoPlaySharp } from "react-icons/io5";
import { RiInformationLine } from "react-icons/ri";

function VideoTitle({ title, overview }) {
  return (
    <div className="px-4 md:px-0 space-y-4">
      {/* Movie Title */}
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-xl leading-tight">
        {title}
      </h1>

      {/* Movie Overview */}
      <p className="hidden md:block text-lg lg:text-xl text-gray-200 drop-shadow-lg line-clamp-6">
        {overview}
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        {/* Play Button */}
        <Button
          variant="custom"
          className="flex items-center justify-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded-md text-lg hover:bg-opacity-80 transition"
        >
          <IoPlaySharp size={24} />
          Play
        </Button>

        {/* More Info Button */}
        <Button className="flex items-center justify-center gap-2 bg-gray-600/70 text-white font-semibold px-6 py-2 rounded-md text-lg hover:bg-gray-600 transition">
          <RiInformationLine size={24} />
          More Info
        </Button>
      </div>
    </div>
  );
}

export default VideoTitle;
