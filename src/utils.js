/**
 * 检查是否为对象而非数组
 * @param {object} value
 * @returns
 */
function isObjectNotArray(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
