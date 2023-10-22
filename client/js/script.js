function clearPlaceholder(input) {
  input.placeholder = "";
}

function restorePlaceholder(input, defaultPlaceholder) {
  if (input.value === '') {
    input.placeholder = defaultPlaceholder;
  }
}