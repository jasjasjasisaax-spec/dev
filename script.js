let player = {
  age: 0,
  health: 100,
  happiness: 50,
  wealth: 20,
  reputation: 50
};

const eventText = document.getElementById("eventText");
const choices = document.getElementById("choices");

function ageUp() {
  player.age++;

  if (player.health <= 0) {
    eventText.innerText = `You passed away at age ${player.age}.`;
    return;
  }

  yearlyEvent();
  updateUI();
}

function updateUI() {
  document.getElementById("age").innerText = `Age: ${player.age}`;

  document.getElementById("health").style.width = player.health + "%";
  document.getElementById("happiness").style.width = player.happiness + "%";
  document.getElementById("wealth").style.width = Math.min(player.wealth, 100) + "%";
  document.getElementById("reputation").style.width = player.reputation + "%";
}

function yearlyEvent() {
  choices.innerHTML = "";

  const events = [
    {
      text: "You attend a grand Regency ball.",
      choices: [
        { text: "Dance boldly", happiness: +10, reputation: +5 },
        { text: "Observe quietly", reputation: +3 }
      ]
    },
    {
      text: "A lingering illness troubles you this year.",
      auto: true,
      health: -10
    },
    {
      text: "Your family urges you to improve your standing.",
      choices: [
        { text: "Seek advantageous connections", reputation: +8 },
        { text: "Follow your own desires", happiness: +8 }
      ]
    },
    {
      text: "You receive income from family holdings.",
      auto: true,
      wealth: +10
    }
  ];

  const event = events[Math.floor(Math.random() * events.length)];
  eventText.innerText = event.text;

  if (event.auto) {
    apply(event);
  } else {
    event.choices.forEach(c => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.innerText = c.text;
      btn.onclick = () => {
        apply(c);
        choices.innerHTML = "";
        updateUI();
      };
      choices.appendChild(btn);
    });
  }
}

function apply(e) {
  player.health += e.health || 0;
  player.happiness += e.happiness || 0;
  player.wealth += e.wealth || 0;
  player.reputation += e.reputation || 0;

  clamp();
}

function clamp() {
  player.health = Math.max(0, Math.min(100, player.health));
  player.happiness = Math.max(0, Math.min(100, player.happiness));
  player.reputation = Math.max(0, Math.min(100, player.reputation));
}

function activity(type) {
  choices.innerHTML = "";

  const menus = {
    social: [
      {
        text: "Attend a Society Ball",
        effect: { happiness: +10, reputation: +5 }
      },
      {
        text: "Call upon a respected family",
        effect: { reputation: +8 }
      },
      {
        text: "Gossip discreetly",
        effect: { reputation: -5, happiness: +5 }
      }
    ],

    career: [
      {
        text: "Seek patronage",
        effect: { reputation: +6 }
      },
      {
        text: "Devote time to study",
        effect: { happiness: -2, reputation: +4 }
      }
    ],

    relationships: [
      {
        text: "Court a romantic interest",
        effect: { happiness: +8, reputation: +3 }
      },
      {
        text: "Visit family",
        effect: { happiness: +6 }
      }
    ],

    assets: [
      {
        text: "Review finances",
        effect: { wealth: +5 }
      },
      {
        text: "Invest in property",
        effect: { wealth: +10, reputation: +2 }
      }
    ]
  };

  eventText.innerText = `What would you like to do?`;

  menus[type].forEach(action => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.innerText = action.text;
    btn.onclick = () => {
      apply(action.effect);
      eventText.innerText = action.text + ".";
      choices.innerHTML = "";
      updateUI();
    };
    choices.appendChild(btn);
  });
}