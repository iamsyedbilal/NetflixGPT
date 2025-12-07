import { SkeletonMovieCard } from "../";

function SkeletonMovieRow({ title = "Loading..." }) {
  return (
    <div className="px-4 sm:px-8 mt-6">
      <h2 className="text-white text-xl sm:text-2xl font-semibold mb-3">
        {title}
      </h2>

      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonMovieCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default SkeletonMovieRow;
