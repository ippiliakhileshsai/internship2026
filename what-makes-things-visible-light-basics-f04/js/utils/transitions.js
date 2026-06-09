// Screen transition animations
const appEl = () => document.getElementById('app');

export function transitionTo(renderFn, type = 'slide') {
  const app = appEl();
  if (!app) return;

  app.classList.add(type === 'fade' ? 'exit-fade' : 'exit-slide');

  setTimeout(() => {
    app.innerHTML = '';
    app.classList.remove('exit-fade', 'exit-slide');
    app.classList.add(type === 'fade' ? 'enter-fade' : 'enter-slide');
    renderFn(app);
    setTimeout(() => {
      app.classList.remove('enter-fade', 'enter-slide');
    }, 380);
  }, 220);
}

export function fadeIn(el, delay = 0) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  setTimeout(() => {
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, delay);
}

export function animateChildren(parent, baseDelay = 0, step = 80) {
  const children = parent.children;
  for (let i = 0; i < children.length; i++) {
    fadeIn(children[i], baseDelay + i * step);
  }
}

export function popIn(el, delay = 0) {
  el.style.opacity = '0';
  el.style.transform = 'scale(0.5)';
  setTimeout(() => {
    el.style.transition = 'opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.opacity = '1';
    el.style.transform = 'scale(1)';
  }, delay);
}
