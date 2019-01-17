// the minus s before the name stand for "size" to make it different from default xs , sm ... tags used elsewhere.
const SIZE_XS = 320
const SIZE_SM = 576
const SIZE_MD = 768
const SIZE_LG = 992
const SIZE_XL = 1200

// the L stand for Large or Landscape
const device = {
  mobile: `(min-width: ${SIZE_XS}px)`,
  mobileL: `(min-width: ${SIZE_SM}px)`,
  tablet: `(min-width: ${SIZE_MD}px)`,
  tabletL: `(min-width: ${SIZE_LG}px)`,
  desktop: `(min-width: ${SIZE_XL}px)`
}

const deviceDown = {
  mobile: `(max-width: ${SIZE_SM - 1}px)`,
  mobileL: `(max-width: ${SIZE_MD - 1}px)`,
  tablet: `(max-width: ${SIZE_LG - 1}px)`,
  tabletL: `(max-width: ${SIZE_XL - 1}px)`
}

const deviceOnly = {
  mobile: `(max-width: ${SIZE_SM})`,
  mobileL: `(min-width: ${SIZE_SM} and (max-width: ${SIZE_MD - 1})`,
  tablet: `(min-width: ${SIZE_MD} and (max-width: ${SIZE_LG - 1})`,
  tabletL: `(min-width: ${SIZE_LG} and (max-width: ${SIZE_XL - 1})`,
  desktop: `(min-width: ${SIZE_XL}`
}

export default {
  device,
  deviceDown,
  deviceOnly,
  SIZE_XS,
  SIZE_SM,
  SIZE_MD,
  SIZE_LG,
  SIZE_XL
}
