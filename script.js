class LoveState {
  stages = [
    "Ahmet için kalp bazen susar…",
    "Ama Berra söz konusuysa atmayı unutur mu?",
    "Bu kalp sana ait. Başka yolu yok."
  ];

  constructor() {
    this.step = 0;
  }

  next() {
    return this.stages[this.step++] ?? null;
  }
}

class LoveView {
  constructor(root) {
    this.root = root;
    this.name = root.querySelector('[data-bind="name"]');
    this.quote = root.querySelector('[data-bind="quote"]');
    this.button = root.querySelector('[data-action="next"]');
  }

  renderName(text) {
    this.name.textContent = text;
  }

  renderQuote(text) {
    this.quote.style.opacity = 0;
    this.quote.style.transform = "translateY(10px)";
    setTimeout(() => {
      this.quote.textContent = text;
      this.quote.style.opacity = 1;
      this.quote.style.transform = "none";
    }, 300);
  }

  revealFinal() {
    this.root.classList.add("revealed");
    this.button.remove();
  }
}

class LoveController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.button.addEventListener("click", () => this.advance());
  }

  init() {
    this.view.renderName("Berra");
    this.advance();
  }

  advance() {
    const text = this.model.next();
    if (text) {
      this.view.renderQuote(text);
    } else {
      this.view.revealFinal();
    }
  }
}

/* Bootstrap */
const app = document.querySelector('[data-component="love"]');
const model = new LoveState();
const view = new LoveView(app);
const controller = new LoveController(model, view);

controller.init();
