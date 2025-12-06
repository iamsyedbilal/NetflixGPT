import { useDispatch } from "react-redux";
import { toggleGptSearchView } from "../features/gpt/gptSlice";
import { GptSearch } from "../components";
import { BiArrowBack } from "react-icons/bi";

function GPT() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* GPT Header */}
      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-black/70 backdrop-blur-md sticky top-0 z-50">
        <button
          onClick={() => dispatch(toggleGptSearchView())}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md transition"
        >
          <BiArrowBack size={20} />
          <span className="hidden sm:block">Back</span>
        </button>
        <h1 className="text-lg sm:text-xl font-semibold">AI Search</h1>
      </div>

      <div className="px-4 sm:px-10 pt-4">
        <GptSearch />
      </div>
    </div>
  );
}

export default GPT;
