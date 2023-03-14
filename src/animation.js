export default function animation(elem, finalPercentage) {
  let counter = 0;
  let timerId = setInterval(() => {
    if (counter <= finalPercentage) {
      elem.style.background = `conic-gradient(hsl(var(--primary-color)) ${counter}deg, #fff 0deg`;
      counter += 10;
    } else {
      clearInterval(timerId);
      counter = 0;
    }
  }, 20);
}
