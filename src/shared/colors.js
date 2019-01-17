// the minus s before the name stand for "size" to make it different from default xs , sm ... tags used elsewhere.
const colors = {
  'Black': '#000000',
  'BlackTransparent': 'rgba(0,0,0,0.7)',
  'BlackTransparentLight': 'rgba(0,0,0,0.2)',
  'BlueCloudy': '#a7bdcc',
  'BlueDark': '#2c3b45',
  'BlueDawn': '#4696EC',
  'BlueMoon': '#3c5463',
  'BlueHeaven': '#64dfff',
  'BlueSky': '#00b3db',
  'GreenDark': '#19a568',
  'GreenLight': '#bff2c6',
  'GreenSeafoam': '#41ba84',
  'Grey': '#e6e8e9',
  'GreyBlue': '#628094',
  'GreyDark': '#5e6467',
  'GreyLight': '#d8d8d8',
  'GreyMedium': '#b7b7b7',
  'GreyWarm': '#959da2',
  'GreyWhite': '#efefef',
  'Orange': '#f7a71a',
  'OrangeDark': '#ff860f',
  'Purple': '#b90059',
  'TomatoLight': '#eac5d0',
  'Tomato': '#e84c3d',
  'TomatoDark': '#ca4036',
  'Transparent': 'transparent',
  'White': '#ffffff',
  'WhiteTransparent': 'rgba(255,255,255,0.3)',
  'YellowVanilla': '#fbf4d3'
}

/**
 * Return true if the given color is valid.
 * Return false when no color is given.
 * Throw an error when an invalid color is given.
 *
 * @param color {string, color from the list of colors}
 * @returns {boolean}
 */
const isValid = color => {
  if (!color) return false
  if (typeof colors[color] === 'undefined') throw new Error(`Unknown color ${color}`)

  return true
}

/**
 * Return a list of available color names.
 *
 * @returns {array}
 */
const colorsList = Object.keys(colors)

export default {
  isValid,
  list: colors,
  names: colorsList
}
