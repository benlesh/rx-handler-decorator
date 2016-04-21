export function rxHandler(target, name, descriptor) {
  const handler = function handlerFn(value) {
    const { subject } = handlerFn;
    subject.next(value);
  };
  const boundHandler = handler.bind(target);
  const subject = handler.subject = descriptor.initializer();

  // Begin JavaScript hilarity
  let subPrototype = subject.constructor.prototype;
  /* eslint guard-for-in: 0 */
  for (let key in subPrototype) {
    let value = subPrototype[key];
    if (typeof value === 'function') {
      boundHandler[key] = value.bind(subject);
    }
  }

  return {
    configurable: true,
    enumberable: false,
    writable: false,
    value: boundHandler
  };
}
