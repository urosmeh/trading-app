export const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString('sl-SI', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
