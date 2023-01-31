interface OperationOutput {
  output: string;
  clipboard: string;
}

export const formatString = (input: string, clipboard: string = ""): string => {
  let newClipboard = "";
  let newOutput = "";

  const commandStart = input.indexOf("[");
  const commandEnd = input.indexOf("]");

  if (commandStart === -1) {
    return input;
  }

  const command = input.slice(commandStart, commandEnd + 1);

  if (command === "[CTRL+C]") {
    const { output, clipboard } = copy(input);
    newClipboard = clipboard;
    newOutput = output;
  }

  if (command === "[CTRL+X]") {
    const { output, clipboard } = cut(input);
    newClipboard = clipboard;
    newOutput = output;
  }

  if (command === "[CTRL+V]") {
    const output = paste(input, clipboard);
    newOutput = output;
  }

  return formatString(newOutput, newClipboard);
};

const copy = (input: string): OperationOutput => {
  const output = input.replace("[CTRL+C]", "");
  const clipboard = input.slice(0, input.indexOf("[CTRL+C]"));

  return {
    output,
    clipboard,
  };
};

const cut = (input: string): OperationOutput => {
  const clipboard = input.slice(0, input.indexOf("[CTRL+X]"));
  const output = input.slice(input.indexOf("[CTRL+X]") + "[CTRL+X]".length);

  return {
    output,
    clipboard,
  };
};

const paste = (input: string, clipboard: string): string => {
  return input.replace("[CTRL+V]", clipboard);
};

const output = formatString(
  "the big red[CTRL+C] fox jumps over [CTRL+V] lazy dog."
);

console.log(output);
