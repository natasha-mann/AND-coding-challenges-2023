import { formatString } from ".";

describe("Copy Paste functionality", () => {
  it.each([
    {
      input: "the big red[CTRL+C] fox jumps over [CTRL+V] lazy dog.",
      expectedOutput: "the big red fox jumps over the big red lazy dog.",
    },
    {
      input: "[CTRL+V]the tall oak tree towers over the lush green meadow.",
      expectedOutput: "the tall oak tree towers over the lush green meadow.",
    },
    {
      input:
        "the sun shines down[CTRL+C] on [CTRL+V][CTRL+C] the busy [CTRL+V].",
      expectedOutput:
        "the sun shines down on the sun shines down the busy the sun shines down on the sun shines down.",
    },
    {
      input: "a majestic lion[CTRL+C] searches for [CTRL+V] in the tall grass.",
      expectedOutput:
        "a majestic lion searches for a majestic lion in the tall grass.",
    },
  ])("$input -> $expected", ({ input, expectedOutput }) => {
    const output = formatString(input);

    expect(output).toBe(expectedOutput);
  });

  it("should allow [ctrl+X] to cut the preceding text", () => {
    const input =
      "the shimmering star[CTRL+X]Twinkling in the dark, [CTRL+V] shines bright.";
    const expectedOutput =
      "Twinkling in the dark, the shimmering star shines bright.";

    const output = formatString(input);

    expect(output).toBe(expectedOutput);
  });
});
