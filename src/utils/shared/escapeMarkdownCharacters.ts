const escapeMarkdownCharacters = (str: string): string => {
  return str.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, "\\$&");
  // src: https://stackoverflow.com/questions/25376698/javascript-code-to-check-special-characters-and-add-double-slash-before-that/49997841
};

export default escapeMarkdownCharacters;
