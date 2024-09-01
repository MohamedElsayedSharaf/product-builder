export const textSlicer = (txt: string, max: number = 80) =>
  txt.length >= max ? `${txt.slice(0, max)} ...` : txt;
