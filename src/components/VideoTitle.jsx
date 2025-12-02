import { Button } from "./";

function VideoTitle({ title, overview }) {
  return (
    <div className="space-y-4">
      {/* Movie Title */}
      <h1 className="text-5xl font-bold tracking-wide drop-shadow-lg">
        {title}
      </h1>

      {/* Movie Overview */}
      <p className="text-lg max-w-md drop-shadow-md line-clamp-3">{overview}</p>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <Button variant="primary" size="lg">
          Play
        </Button>
        <Button variant="secondary" size="lg">
          More Info
        </Button>
      </div>
    </div>
  );
}

export default VideoTitle;
