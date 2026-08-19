// Keep the album's display details and audio locations here.
// Later, replace only `src` values with the final hosted audio URLs or local paths.
const album = {
  tracks: [
    { title: "Dünyayı Gezdim", src: "music/Dünyayı Gezdim.mp3" },
    { title: "Dört Yıl Önce İki Yabancıydık", src: "music/Dört Yıl Önce İki Yabancıydık.mp3" },
    { title: "Tatlı mıyım?", src: "music/Tatlı mıyım_.mp3" },
    { title: "İyi Ki Varsın Duygum", src: "music/iyikivarsinduygum.mp3" },
    { title: "Dünyanın Sonuna Kadar Gittik", src: "music/Dünyanın Sonuna Kadar Gittik.mp3" },
  ],
};

const audio = document.querySelector("#audio");
const tracklist = document.querySelector("#tracklist");
const nowTitle = document.querySelector("#now-title");
const playButton = document.querySelector("#play");
const playIcon = document.querySelector("#play-icon");
const progress = document.querySelector("#progress");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const message = document.querySelector("#player-message");

let currentTrack = 0;

document.querySelector("#album-count").textContent = `${album.tracks.length} şarkı`;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function renderTracks() {
  tracklist.innerHTML = album.tracks.map((track, index) => `
    <li>
      <button class="track${index === currentTrack ? " is-active" : ""}" type="button" data-track="${index}" aria-label="${track.title} şarkısını çal">
        <span class="track-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="track-title">${track.title}</span>
        <span class="track-action" aria-hidden="true">${index === currentTrack && !audio.paused ? "Ⅱ" : "▶"}</span>
      </button>
    </li>
  `).join("");
}

function selectTrack(index, shouldPlay = false) {
  currentTrack = (index + album.tracks.length) % album.tracks.length;
  const track = album.tracks[currentTrack];
  audio.src = track.src;
  nowTitle.textContent = `${String(currentTrack + 1).padStart(2, "0")} — ${track.title}`;
  currentTime.textContent = "0:00";
  duration.textContent = "0:00";
  progress.value = 0;
  message.textContent = "";
  renderTracks();
  if (shouldPlay) audio.play().catch(() => {});
}

function updatePlaybackUI() {
  const isPlaying = !audio.paused;
  playIcon.innerHTML = isPlaying
    ? '<svg viewBox="0 0 24 24"><path d="M7 5h3v14H7zm7 0h3v14h-3z" /></svg>'
    : '<svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7V5Z" /></svg>';
  playButton.setAttribute("aria-label", isPlaying ? "Duraklat" : "Çal");
  renderTracks();
}

tracklist.addEventListener("click", (event) => {
  const button = event.target.closest("[data-track]");
  if (!button) return;
  const nextIndex = Number(button.dataset.track);
  const shouldPlay = currentTrack !== nextIndex || audio.paused;
  selectTrack(nextIndex, shouldPlay);
});

playButton.addEventListener("click", () => {
  if (!audio.src) selectTrack(currentTrack, true);
  else if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
});
document.querySelector("#previous").addEventListener("click", () => selectTrack(currentTrack - 1, true));
document.querySelector("#next").addEventListener("click", () => selectTrack(currentTrack + 1, true));

audio.addEventListener("loadedmetadata", () => { duration.textContent = formatTime(audio.duration); });
audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(audio.currentTime);
  progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
});
audio.addEventListener("play", updatePlaybackUI);
audio.addEventListener("pause", updatePlaybackUI);
audio.addEventListener("ended", () => selectTrack(currentTrack + 1, true));
audio.addEventListener("error", () => {
  message.textContent = "Bu parça henüz eklenmedi.";
  updatePlaybackUI();
});
progress.addEventListener("input", () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = (progress.value / 100) * audio.duration;
});

renderTracks();
