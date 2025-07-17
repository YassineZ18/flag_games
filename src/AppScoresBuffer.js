// Buffer temporaire des scores en attente de sauvegarde
const scoresBuffer = [];

export function addScoreToBuffer(scoreObj) {
  scoresBuffer.push(scoreObj);
}

export function getAndClearScoresBuffer() {
  const copy = [...scoresBuffer];
  scoresBuffer.length = 0;
  return copy;
}
