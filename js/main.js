// Formatting
//-----------------------------------------------------
const OUTPUT_STRING = "  ";

var glow = function (text) {
  return "[[g;#EEEEEE;]" + text + "]";
};

var titleText = function (text) {
  return "[[u;inherit;]" + text + "]";
};

function teal(message) {
  return "[[gb;teal;black]" + message + "]";
}
//-----------------------------------------------------

var banner = teal(
  "\t _    |_   _  _  _   _ |_        \t\n" +
    "\t(_  \/ |_) (- |  | ) (- |_  __  )(\t\n" +
    "\t   /                    \t\n" +
    "" +
    "                                                \t\n"
);

const welcomeMessage = `greatings intelligent entity
Type 'help' to view list of commands
`;


var play = false;

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}


const messages = {
  repo: `
${OUTPUT_STRING} https://github.com/cybernet-x
`,
  help: `
program - human
Type commands below for more info. Type a few letters and press [tab] to autocomplete.

${OUTPUT_STRING}${glow("readme")}              - resistance is futile
${OUTPUT_STRING}${glow(
    "prototypes"
  )}           - assimilated data
${OUTPUT_STRING}${glow("skills")}             - statistics
${OUTPUT_STRING}${glow("system")}             - A bit of boasting
${OUTPUT_STRING}${glow("repo")}               - Take a look at some of my work

${OUTPUT_STRING}${glow("download_cv")}        - file download

${OUTPUT_STRING}${glow("contact")}            - spam
${OUTPUT_STRING}${glow("credits")}            - Thanks for the inspiration/ help

${OUTPUT_STRING}${glow("all")}                - overload

P.S. There's an easter egg, see if you can find it!
Hint: Check out the source code.
`,
  readme: `
cybernet_x command-line interface 
`,
  prototypes: `
I'm always working on comp sciey (not really a word) things.
Why don't you check out a few of my public repos? Just type 'repo' to get the links.
You can also check out my university honours project at http://pubs.cs.uct.ac.za/honsproj/cgi-bin/view/2015/feldman_meyer.zip/index.html - this one took a while!
`,
  skills: `
${OUTPUT_STRING}${glow(
    "Kotlin"
  )}             ##  [[g;#00DE12;]#################################################]  ##
${OUTPUT_STRING}${glow(
    "Java"
  )}               ##  [[g;#42D100;]###############################################]    ##
${OUTPUT_STRING}${glow(
    "C# & C++"
  )}           ##  [[g;#5BD100;]############################################]       ##
${OUTPUT_STRING}${glow(
    "GCP"
  )}                ##  [[g;#99D100;]#########################################]          ##
${OUTPUT_STRING}${glow(
    "Web Dev"
  )}            ##  [[g;#D1B900;]############################]                       ##
${OUTPUT_STRING}${glow(
    "Python"
  )}             ##  [[g;#D16200;]###########]                                        ##
`,
  contact: `
${OUTPUT_STRING}${glow("Email")}            - craig.feldy@gmail.com
${OUTPUT_STRING}${glow("Smoke signals")}    - general Cape Town region
${OUTPUT_STRING}${glow("myspace")}          - just kidding
`,
  credits: `
${OUTPUT_STRING}Site built by ${glow("cybernet_x")}

${OUTPUT_STRING}data assimilated from ${glow(
    "Craig Feldman & Ronnie Pyne"
  )} 
  for inspiration -> https://craigfeldman.com/ - http://www.ronniepyne.com)
`,
  system: `
|\t${glow("concepts")}
|  - OS
|  - code 

|\t${glow("tools")}
|  - nmap

`,
};

var commands = {
  help: function () {
    this.echo(messages.help);
  },

  repo: function () {
    this.echo(messages.repo);
  },

  readme: function () {
    this.echo(messages.readme);
  },

  prototypes: function () {
    this.echo(messages.prototypes);
  },

  skills: function () {
    this.echo(messages.skills);
  },

  contact: function () {
    this.echo(messages.contact);
  },

  credits: function () {
    this.echo(messages.credits);
  },

  system: function () {
    this.echo(messages.system);
  },

  download_file: function () {
    downloadURI(
      "downloads/ (web).pdf",
      "Curriculum Vitae.pdf"
    );
  },

  all: function () {
    this.clear();
    this.exec("readme");
    this.exec("prototypes");
    this.exec("skills");
    this.exec("system");
    this.exec("repo");
    this.exec("contact");
    this.exec("credits");
  },

  clear: function () {
    this.clear();

    this.echo(banner);
    this.echo(welcomeMessage);
  },

  
 
};

//-----------------------------------------------------------

$(function () {
  var isTyping = false;
  function typed(finish_typing) {
    return function (term, message, delay) {
      isTyping = true;
      var prompt = term.get_prompt();
      var c = 0;
      if (message.length > 0) {
        term.set_prompt("");
        var interval = setInterval(function () {
          term.insert(message[c++]);
          if (c == message.length) {
            clearInterval(interval);
            // execute in next interval
            setTimeout(function () {
              // swap command with prompt
              finish_typing(term, message, prompt);
              isTyping = false;
            }, delay);
          }
        }, delay);
      }
    };
  }

  var typed_message = typed(function (term, message, prompt) {
    term.set_command("");
    term.echo(message);
    term.set_prompt(prompt);
  });

  $("body").terminal(commands, {
    greetings: banner,
    prompt: "> ",
    completion: true,
    checkArity: false,
    clear: false,

    onInit: function (term) {
      typed_message(term, welcomeMessage, 0, function () {});
    },

    keydown: function (e) {        
      // ctrl-z - Stop Star Wars
      if (e.which == 90 && e.ctrlKey) {
        play = false;
        return false;
      }

      if (play) {
        return false;
      }

      if (isTyping) {
        return false;
      }
    },

    keypress: function (e, term) {
      console.log("keypress: " + e.which);
    },

    onFocus: function (term) {
      console.log("terminal has gained focus");
    },

    onBlur: function () {
      console.log("terminal has lost focus");
    },
  });
});


