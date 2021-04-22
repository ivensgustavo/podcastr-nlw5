export function convertDurationToTimeString(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const second = duration % 60;

  //padStart adiciona 0 quando o número tem menos de dois dígitos
  const timeInString = [hours, minutes, second]
    .map(item => String(item).padStart(2, '0'))
    .join(':');

  return timeInString;
}