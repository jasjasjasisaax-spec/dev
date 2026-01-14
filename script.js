let player = {
  age: 0,
  health: 100,
  happiness: 50,
  wealth: 20,
  reputation: 50,
  status: "Commoner"
};

const stats = document.getElementById("stats");
const eventText = document.getElementById("eventText");
const choices = document.getElementById("choices");
const ageBtn = document.getElementById("ageBtn");

ageBtn.onclick = ageUp;
updateStats();

function ageUp() {
  player.age++;

  if (player.health <= 0) {
    eventText.innerText = `You died at age ${player.age}.`;
    ageBtn.disabled = true;
    return;
  }

  triggerEvent();
  updateStats();
}

function updateStats() {
  stats.innerText =
`Age: ${player.age}
Health: ${player.health}
Happiness: ${player.happiness}
Wealth: ${player.wealth} guineas
Reputation: ${player.reputation}
Status: ${player.status}`;
}

function triggerEvent() {
  choices.innerHTML = "";

  const events = [
    {
      text: "You attend a fashionable Regency ball.",
      choices: [
        { text: "Dance boldly", happiness: +10, reputation: +5 },
        { text: "Remain reserved", reputation: +2 }
      ]
    },
    {
      text: "A seasonal illness spreads through town.",
      auto: true,
      health: -10
    },
    {
      text: "Your family urges you to improve your prospects.",
      choices: [
        { text: "Seek an advantageous match", reputation: +8 },
        { text: "Follow your heart", happiness: +8 }
      ]
    },
    {
      text: "You receive a modest inheritance.",
      auto: true,
      wealth: +15
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
        updateStats();
      };
      choices.appendChild(btn);
    });
  }
}

function apply(effect) {
  player.health += effect.health || 0;
  player.happiness += effect.happiness || 0;
  player.wealth += effect.wealth || 0;
  player.reputation += effect.reputation || 0;

  clamp();
}

function clamp() {
  player.health = Math.max(0, Math.min(100, player.health));
  player.happiness = Math.max(0, Math.min(100, player.happiness));
  player.reputation = Math.max(0, Math.min(100, player.reputation));
}