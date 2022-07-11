export const beautify_hash = (text) => {
  let arr = text.split("/")
  if (arr[arr.length - 1] != "") {
    arr.push("")
  }
  text = arr.join("/")
  return text
}