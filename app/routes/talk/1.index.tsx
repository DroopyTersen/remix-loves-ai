export default function IntroSlide() {
  return (
    <>
      <div className="flex gap-4">
        <img
          src="/assets/scrooge-mcduck.gif"
          alt="Scrooge McDuck"
          className="rounded-lg"
        />
        <div>
          <h2 className="text-xl italic font-bold text-emerald-600">
            What to get rich?
          </h2>
          <ol>
            <li>Buy a *.ai domain</li>
            <li>Create a pitch deck and start picking out private jets</li>
          </ol>
        </div>
      </div>
      <p>
        Already got a web app for your side hustle? Now layer on some OpenAI
        GPT-3/4 so you can justify one of those .ai domains and raise a bunch of
        money.
      </p>
      <p className="notes">
        In this presentation, we'll look at how to utilize a Large Language
        Model (LLM) in a Remix app. We'll unpack some interesting performance
        constraints, and identify the technical mechanics to work around them.
      </p>
    </>
  );
}
