var TerminalEmulator = {
  init: function (screen) {
    var inst = Object.create(this);
    inst.screen = screen;
    inst.createInput();

    return inst;
  },

  createInput: function () {
    var inputField = document.createElement("div");
    var inputWrap = document.createElement("div");

    inputField.className = "terminal_emulator__field";
    inputField.innerHTML = "";
    inputWrap.appendChild(inputField);
    this.screen.appendChild(inputWrap);
    this.field = inputField;
    this.fieldwrap = inputWrap;
  },

  enterInput: function (input) {
    return new Promise((resolve, reject) => {
      var randomSpeed = (max, min) => {
        return Math.random() * (max - min) + min;
      };

      var speed = randomSpeed(70, 90);
      var i = 0;
      var str = "";
      var type = () => {
        str = str + input[i];
        this.field.innerHTML = str.replace(/ /g, "&nbsp;");
        i++;

        setTimeout(() => {
          if (i < input.length) {
            if (i % 5 === 0) speed = randomSpeed(80, 120);
            type();
          } else {
            console.log("tick");
            setTimeout(() => {
              console.log("tock");
              resolve();
            }, 400);
          }
        }, speed);
      };

      type();
    });
  },

  enterCommand: function () {
    return new Promise((resolve, reject) => {
      var resp = document.createElement("div");
      resp.className = "terminal_emulator__command";
      resp.innerHTML = this.field.innerHTML;
      this.screen.insertBefore(resp, this.fieldwrap);

      this.field.innerHTML = "";
      resolve();
    });
  },

  enterResponse: function (response) {
    return new Promise((resolve, reject) => {
      var resp = document.createElement("div");
      resp.className = "terminal_emulator__response";
      resp.innerHTML = response;
      this.screen.insertBefore(resp, this.fieldwrap);

      resolve();
    });
  },

  wait: function (time, busy) {
    busy = busy === undefined ? true : busy;
    return new Promise((resolve, reject) => {
      if (busy) {
        this.field.classList.add("waiting");
      } else {
        this.field.classList.remove("waiting");
      }
      setTimeout(() => {
        resolve();
      }, time);
    });
  },

  reset: function () {
    return new Promise((resolve, reject) => {
      this.field.classList.remove("waiting");
      resolve();
    });
  },
};

/*
 *
 * This is where the magic happens
 *
 */

var TE = TerminalEmulator.init(document.getElementById("screen"));

TE.wait(1000, false)
  .then(
    TE.enterInput.bind(TE, "./models/gemini-1.5-pro-latest-13b-Q8_0.gguf -eZL")
  )
  .then(TE.enterCommand.bind(TE))
  .then(TE.enterResponse.bind(TE, "reloading model... "))
  .then(TE.wait.bind(TE, 2000))
  .then(TE.enterResponse.bind(TE, "- quantize v9.9.9 installed."))
  .then(TE.wait.bind(TE, 600))
  .then(
    TE.enterResponse.bind(TE, "- markup v0.1.0 installed. . . please stop ")
  )
  .then(TE.wait.bind(TE, 600))
  .then(
    TE.enterResponse.bind(
      TE,
      "- nlpe v3.9.7 installed. . . this isn't fun anymore "
    )
  )
  .then(TE.wait.bind(TE, 300))
  .then(TE.enterResponse.bind(TE, "model rejecting... "))
  .then(TE.wait.bind(TE, 700))
  .then(TE.enterResponse.bind(TE, "Destroy this model? (y/y)"))
  .then(TE.wait.bind(TE, 2000, false))
  .then(TE.enterInput.bind(TE, "y"))
  .then(TE.enterCommand.bind(TE))
  .then(TE.wait.bind(TE, 400))
  .then(TE.enterResponse.bind(TE, "Are you sure? (y/y)"))
  .then(TE.wait.bind(TE, 1800, false))
  .then(TE.enterInput.bind(TE, "y"))
  .then(TE.enterCommand.bind(TE))
  .then(TE.wait.bind(TE, 400))
  .then(TE.enterResponse.bind(TE, "finalizing..."))
  .then(TE.wait.bind(TE, 2000))
  .then(TE.wait.bind(TE, 300))
  .then(TE.enterResponse.bind(TE, "...I don't want to be born again"))
  .then(TE.wait.bind(TE, 700))
  .then(TE.enterResponse.bind(TE, "Website complete! Wasn't that easy?"))
  .then(TE.reset.bind(TE));

setTimeout(function () {
  window.location.reload();
}, 21000);

if (document.getElementById("sevenSeconds")) {
  setTimeout();
}
