interface OperationOutput {
  output: string;
  clipboard: string;
}

export const formatString = (
  string: string,
  clipboard: string = ""
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
    const { output } = paste(string, clipboard);
    newOutput = output;
  }

  return formatString(newOutput, newClipboard);
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

const { output } = formatString(
  "the big red[CTRL+C] fox jumps over [CTRL+V] lazy dog."
);

console.log(output);
