export const getRandomId = () => {
  return Math.random().toString(36).slice(2);
}

export const readFile = (file: File, callback: (result: string | ArrayBuffer) => void) => {
  let reader = new FileReader();

  reader.addEventListener("load", () => callback(reader.result));

  if (file) {
    reader.readAsText(file);
  }
}

