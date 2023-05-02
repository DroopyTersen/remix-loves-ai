import { SLIDES, useCurrentNumber } from "./useCurrentSlide";

export default function SlideProgressBar() {
  let currentNumber = useCurrentNumber() || 1;
  let width = (currentNumber / SLIDES.length) * 100;
  return (
    <div>
      <h4 className="sr-only">Status</h4>
      <p className="text-sm font-medium text-gray-900">
        Consuming AI Chat Completions in a Remix App
      </p>
      <div className="mt-6" aria-hidden="true">
        <div className="overflow-hidden bg-gray-200 rounded-full">
          <div
            className="h-2 rounded-full bg-emerald-600"
            style={{ width: `${width}%` }}
          />
        </div>
        <div
          className={`hidden grid-cols-${SLIDES.length} mt-6 text-sm font-medium text-gray-600 sm:grid`}
        >
          {SLIDES.map((slide, i) => (
            <div className={i + 1 <= currentNumber ? "text-emerald-700" : ""}>
              {slide.title}
            </div>
          ))}
          {/* <div className="text-center text-indigo-600">Migrating database</div>
          <div className="text-center">Compiling assets</div>
          <div className="text-right">Deployed</div> */}
        </div>
      </div>
    </div>
  );
}
