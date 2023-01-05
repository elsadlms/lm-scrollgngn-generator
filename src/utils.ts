import { errors } from "./stores";

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

export const addErrorToStore = (errorName: string) => {
  errors.update((stored) => {
    stored.map((error) => {
      if (error.name === errorName) {
        error.active = true;
      }
    });
    return stored;
  });
};

export const deleteErrorFromStore = (errorName: string) => {
  errors.update((stored) => {
    stored.map((error) => {
      if (error.name === errorName) {
        error.active = false;
      }
    });
    return stored;
  });
};

export const deleteAllErrorsFromStore = () => {
  errors.update((stored) => {
    stored.map((error) => error.active = false)
    return stored;
  });
};