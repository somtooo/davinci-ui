let before = document.getElementById("before");
let liner = document.getElementById("liner");
let command = document.getElementById("typer");
let textarea = document.getElementById("texter");
let terminal = document.getElementById("terminal");
let userName = document.getElementById("liner").getElementsByClassName("userName")[0];
let git = 0;
let commands = [];

setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
  window.addEventListener("click", () =>{
    textarea.focus();
  });
}, 100);

window.addEventListener("keyup", enterKey);



//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine(`${currentUser}`  + command.innerHTML, "color3", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  const extra = cmd.split(" ");
  switch (extra[0].toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "whoami":
      loopLines(["You are " + currentUser.split('@')[0]], "color2 margin", 80);
      break;
    case "login":
      if(currentUser.split('@')[0] != extra[1]){
      if(extra.length == 2 && users.includes(extra[1])) {
        let newUser = extra[1] + baseName;
        currentUser = newUser;
        userName.textContent = newUser;
      } else {
        addLine("<span class=\"inherit\">Incorrect use of login or user not found</span>", "error", 100);
      }
    } else {
      addLine("<span class=\"inherit\">User already logged in</span>", "error", 100);

    }
      break;
    case "signup":
      if(extra.length == 2) {
        if(users.includes(extra[1])) {
          addLine("<span class=\"inherit\">Already signedUp please login</span>", "error", 100);
        } else if(!users.includes(extra[1])) {
          users.push(extra[1]);
          commander("login " + extra[1]);
        } else {
          addLine("<span class=\"inherit\">Incorrect use of signup</span>", "error", 100);
        }
      }
      break;
    case "logout":
      currentUser = "visitor" + baseName;
      break;
    case "history":
      loopLines(commands, "color2", 80);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}
