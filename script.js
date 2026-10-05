const checkInForm = document.getElementById("checkInForm");
const nameInput = document.getElementById("name");
const teamSelect = document.getElementById("team");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.querySelector(".progress-container");

const maxAttendees = 100;
let totalAttendees = 0;

const teamCounts = {
  water: 0,
  zero: 0,
  renewables: 0,
};

function updateAttendance() {
  const progressPercentage = Math.min(
    (totalAttendees / maxAttendees) * 100,
    100,
  );

  attendeeCount.textContent = totalAttendees;
  progressBar.style.width = `${progressPercentage}%`;
  progressContainer.setAttribute("aria-valuenow", progressPercentage);
}

function updateTeamCount(team) {
  teamCounts[team] += 1;
  document.getElementById(`${team}Count`).textContent = teamCounts[team];
}

function showGreeting(name, team) {
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  greeting.textContent = `Thanks for checking in, ${name}! You are representing ${teamName}.`;
  greeting.style.display = "block";
}

function handleCheckIn(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const team = teamSelect.value;

  if (name === "" || team === "") {
    return;
  }

  totalAttendees += 1;
  updateAttendance();
  updateTeamCount(team);
  showGreeting(name, team);
  checkInForm.reset();
  nameInput.focus();
}

checkInForm.addEventListener("submit", handleCheckIn);
