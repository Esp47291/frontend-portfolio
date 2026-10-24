// --- Диапазон цены ---
const minInput = document.getElementById('price-min');
const maxInput = document.getElementById('price-max');
const minOut = document.getElementById('price-min-out');
const maxOut = document.getElementById('price-max-out');
const fill = document.getElementById('range-fill');
const THUMB = 8; // ширина бегунка в px (как в CSS)

function updateRange(changed) {
  let min = Number(minInput.value);
  let max = Number(maxInput.value);

  // бегунки не должны заходить друг за друга
  if (min > max) {
    if (changed === minInput) {
      min = max;
      minInput.value = min;
    } else {
      max = min;
      maxInput.value = max;
    }
  }

  const total = Number(maxInput.max) - Number(maxInput.min);
  const minPart = min / total;
  const maxPart = max / total;

  // чёрная линия — между центрами бегунков
  fill.style.left = `calc(${minPart * 100}% + ${(0.5 - minPart) * THUMB}px)`;
  fill.style.right = `calc(${(1 - maxPart) * 100}% + ${(maxPart - 0.5) * THUMB}px)`;

  minOut.textContent = min;
  maxOut.textContent = max;
}

minInput.addEventListener('input', () => updateRange(minInput));
maxInput.addEventListener('input', () => updateRange(maxInput));
updateRange();

// --- Открытие и закрытие окна (по умолчанию окно открыто) ---
const filter = document.getElementById('filter');
const toggle = filter.querySelector('.filter__toggle');

toggle.addEventListener('click', () => {
  const closed = filter.classList.toggle('filter_closed');
  toggle.setAttribute('aria-expanded', String(!closed));
});
