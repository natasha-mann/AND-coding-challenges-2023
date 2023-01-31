import { formatString } from ".";

describe("Copy Paste functionality", () => {
  describe("Given a string with one [ctrl+C] command and a following [ctrl+V] command", () => {
    it.each([
      {
        input: "the big red[CTRL+C] fox jumps over [CTRL+V] lazy dog.",
        expectedOutput: "the big red fox jumps over the big red lazy dog.",
      },
      {
        input:
          "a majestic lion[CTRL+C] searches for [CTRL+V] in the tall grass.",
        expectedOutput:
          "a majestic lion searches for a majestic lion in the tall grass.",
      },
    ])("$input -> $expectedOutput", ({ input, expectedOutput }) => {
      const { output } = formatString(input);

      expect(output).toBe(expectedOutput);
    });
  });

  it("should allow for multiple copy and paste commands to execute in one string", () => {
    const input =
      "the sun shines down[CTRL+C] on [CTRL+V][CTRL+C] the busy [CTRL+V].";
    const expectedOutput =
      "the sun shines down on the sun shines down the busy the sun shines down on the sun shines down.";

    const { output } = formatString(input);

    expect(output).toBe(expectedOutput);
  });

  it("given a [ctrl+V] with no preceeding [CTRL+C] should simply remove the command and return the original string", () => {
    const input =
      "[CTRL+V]the tall oak tree towers over the lush green meadow.";
    const expectedOutput =
      "the tall oak tree towers over the lush green meadow.";

    const { output } = formatString(input);

    expect(output).toBe(expectedOutput);
  });

  it("should allow [ctrl+X] to cut the preceding text", () => {
    const input =
      "the shimmering star[CTRL+X]Twinkling in the dark, [CTRL+V] shines bright.";
    const expectedOutput =
      "Twinkling in the dark, the shimmering star shines bright.";

    const { output } = formatString(input);

    expect(output).toBe(expectedOutput);
  });
});
