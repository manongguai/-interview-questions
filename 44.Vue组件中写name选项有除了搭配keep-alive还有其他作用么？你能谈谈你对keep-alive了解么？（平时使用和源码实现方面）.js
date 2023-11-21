// 一、组件中写 name 选项有什么作用？
// 项目使用 keep-alive 时，可搭配组件 name 进行缓存过滤
// DOM 做递归组件时需要调用自身 name
// vue-devtools 调试工具里显示的组见名称是由vue中组件name决定的
// 二、keep-alive使用
// keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染
// 一般结合路由和动态组件一起使用，用于缓存组件；
// 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
// 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。
// 三、keep-alive实现原理
// 1）首先看下源码

// 源码位置：src/core/components/keep-alive.js
export default {
  name: 'keep-alive',
  abstract: true, // 判断当前组件虚拟dom是否渲染成真是dom的关键

  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 缓存黑名单
    max: [String, Number] // 缓存的组件实例数量上限
  },

  created () {
    this.cache = Object.create(null) // 缓存虚拟dom
    this.keys = [] // 缓存的虚拟dom的健集合
  },

  destroyed () {
    for (const key in this.cache) { // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 实时监听黑白名单的变动
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    // .....
  }
}
// 大概的分析源码，我们发现与我们定义组件的过程一样，先是设置组件名为keep-alive，其次定义了一个abstract属性，值为true。这个属性在vue的官方教程并未提及，其实是一个虚组件，后面渲染过程会利用这个属性。props属性定义了keep-alive组件支持的全部参数。

// 2）接下来重点就是keep-alive在它生命周期内定义了三个钩子函数了

// created

// 初始化两个对象分别缓存VNode（虚拟DOM）和VNode对应的键集合

// destroyed

// 删除缓存VNode还要对应执行组件实例的destory钩子函数。

// 删除this.cache中缓存的VNode实例。不是简单地将this.cache置为null，而是遍历调用pruneCacheEntry函数删除。

// src/core/components/keep-alive.js
function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy() // 执行组件的destory钩子函数
  }
  cache[key] = null
  remove(keys, key)
}
// mounted

// 在mounted这个钩子中对include和exclude参数进行监听，然后实时地更新（删除）this.cache对象数据。pruneCache函数的核心也是去调用pruneCacheEntry。

// 3）render

// src/core/components/keep-alive.js
render () {
const slot = this.$slots.default
const vnode: VNode = getFirstComponentChild(slot) // 找到第一个子组件对象
const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
if (componentOptions) { // 存在组件参数
    // check pattern
    const name: ?string = getComponentName(componentOptions) // 组件名
    const { include, exclude } = this
    if ( // 条件匹配
    // not included
    (include && (!name || !matches(include, name))) ||
    // excluded
    (exclude && name && matches(exclude, name))
    ) {
    return vnode
    }

    const { cache, keys } = this
    const key: ?string = vnode.key == null // 定义组件的缓存key
    // same constructor may get registered as different local components
    // so cid alone is not enough (#3269)
    ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
    : vnode.key
    if (cache[key]) { // 已经缓存过该组件
    vnode.componentInstance = cache[key].componentInstance
    // make current key freshest
    remove(keys, key)
    keys.push(key) // 调整key排序
    } else {
    cache[key] = vnode // 缓存组件对象
    keys.push(key)
    // prune oldest entry
    if (this.max && keys.length > parseInt(this.max)) { 
        // 超过缓存数限制，将第一个删除（LRU缓存算法）
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
    }
    }

    vnode.data.keepAlive = true // 渲染和执行被包裹组件的钩子函数需要用到
}
return vnode || (slot && slot[0])
}
// 第一步：获取keep-alive包裹着的第一个子组件对象及其组件名；
// 第二步：根据设定的黑白名单（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例（VNode），否则执行第三步；
// 第三步：根据组件ID和tag生成缓存Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该key在this.keys中的位置（更新key的位置是实现LRU置换策略的关键），否则执行第四步；
// 第四步：在this.cache对象中存储该组件实例并保存key值，之后检查缓存的实例数量是否超过max的设置值，超过则根据LRU置换策略删除最近最久未使用的实例（即是下标为0的那个key）。
// 第五步：最后并且很重要，将该组件实例的keepAlive属性值设置为true。
// 最后就是再次渲染执行缓存和对应钩子函数了