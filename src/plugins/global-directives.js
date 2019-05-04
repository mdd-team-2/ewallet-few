import clickOutside from '../directives/click-outside'

const GlobalDirectives = {
  install (Vue) {
    Vue.directive('click-outside', clickOutside)
  }
}

export default GlobalDirectives
