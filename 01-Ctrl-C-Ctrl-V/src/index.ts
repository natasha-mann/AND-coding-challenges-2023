interface OperationOutput {
  output: string;
  clipboard: string;
}

export const formatString = (string: string) => {
  let globalClipboard = "";

  const { output } = applyCommands(string, globalClipboard);

  return output;
};

const applyCommands = (
  string: string,
  globalClipboard: string
): OperationOutput => {
  let newClipboard = "";
  let newOutput = "";

  const commandStart = string.indexOf("[");
  const commandEnd = string.indexOf("]");

  if (commandStart === -1) {
    return { output: string, clipboard: newClipboard };
  }

  const command = string.slice(commandStart, commandEnd + 1);

  if (command === "[CTRL+C]") {
    const { output, clipboard } = copy(string);
    newClipboard = clipboard;
    newOutput = output;
  }

  if (command === "[CTRL+X]") {
    const { output, clipboard } = cut(string);
    newClipboard = clipboard;
    newOutput = output;
  }

  if (command === "[CTRL+V]") {
    const { output } = paste(string, globalClipboard);
    newOutput = output;
  }

  return applyCommands(newOutput, newClipboard);
};

const copy = (string: string): OperationOutput => {
  const output = string.replace("[CTRL+C]", "");
  const clipboard = string.slice(0, string.indexOf("[CTRL+C]"));

  return {
    output,
    clipboard,
  };
};

const cut = (string: string): OperationOutput => {
  const clipboard = string.slice(0, string.indexOf("[CTRL+X]"));
  const output = string.slice(string.indexOf("[CTRL+X]") + "[CTRL+X]".length);

  return {
    output,
    clipboard,
  };
};

const paste = (string: string, clipboard: string): OperationOutput => {
  const output = string.replace("[CTRL+V]", clipboard);

  return {
    output,
    clipboard,
  };
};

const result = formatString(
  "the shimmering star[CTRL+X]Twinkling in the dark, [CTRL+V] shines bright."
);
console.log("RES", result);
