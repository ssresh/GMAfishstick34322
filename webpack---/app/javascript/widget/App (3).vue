var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.conversationSize && _vm.isFetchingList)?_c('div',{staticClass:"flex flex-1 items-center h-full bg-black-25 justify-center"},[_c('spinner',{attrs:{"size":""}})],1):_c('div',{staticClass:"flex flex-col justify-end h-full",class:{
    'is-mobile': _vm.isMobile,
    'is-widget-right': _vm.isRightAligned,
    'is-bubble-hidden': _vm.hideMessageBubble,
    'is-flat-design': _vm.isWidgetStyleFlat,
  }},[_c('router-view')],1)}
var staticRenderFns = []

export { render, staticRenderFns }