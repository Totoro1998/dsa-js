/**
 * 获取min到max的随机数
 * @param {*} min
 * @param {*} max
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
