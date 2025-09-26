export default class {
  bittyInit() {
    state.addStyleSheet();
    this.api.querySelector(".output").addEventListener("mousemove", (event) => {
      if (state.watchingMouse) {
        state.updateLetter(
          event.clientX -
            state.mouseStart.x,
          event.clientX -
            state.mouseStart.x,
        );
      }
    });
    this.api.querySelector(".output").addEventListener("mouseup", (event) => {
      state.watchingMouse = false;
    });
    this.triggerChange();
  }

  triggerChange() {
    setTimeout(() => {
      this.api.forward(null, "doChange");
      this.triggerChange();
    }, 2000);
  }

  changeValue(event, el) {
    const ds = event.target.dataset;
    let value = event.target.value;
    state.setSliderValue(ds.name, value);
  }

  loadLetters(_event, el) {
    letters().forEach((letter) => {
      let btn = document.createElement("button");
      btn.innerHTML = letter;
      btn.dataset.send = "setLetter|loadControls";
      btn.dataset.letter = letter;
      el.appendChild(btn);
    });
  }

  loadControls(_event, el) {
    el.replaceChildren();
    state.sliders().forEach((slider) => {
      const newDiv = document.createElement("div");
      const value = state.getSliderValue(slider.name);
      newDiv.innerHTML = `
      <label>${slider.name}<br />
      <input
        type="range"
        min="${state.sliderData(slider.name, "min")}"
        max="${state.sliderData(slider.name, "max")}"
        step="${state.sliderData(slider.name, "step")}"
        value="${value}"
        data-send="changeValue"
        data-name="${slider.name}"
      />
      </label>`;
      el.appendChild(newDiv);
    });
  }

  input(_event, el) {
    const ta = this.api.querySelector("textarea");
    let spans = new SpanMaker(ta.value).makeParagraphs().makeWords()
      .makeSpans();
    el.innerHTML = spans.output();
  }

  makeSpans(_event, el) {
    if (el) {
      let spans = new SpanMaker(el.innerText).makeParagraphs().makeWords()
        .makeSpans();
      el.innerHTML = spans.output();
    }
  }

  setLetter(event, _el) {
    if (event) {
      state.setCurrentLetter(
        event.target.dataset.letter,
      );
      state.startValue = {
        "Hue": state.data.letters[state.getCurrentLetter()].values["Hue"].value,
      };
      state.mouseStart = {
        x: event.clientX,
        y: event.clientY,
      };
      state.watchingMouse = true;
    }
  }

  doChange(_event, _el) {
    document.documentElement.style.setProperty(
      "--color-h-A",
      randomInt(0, 360),
    );
  }
}
