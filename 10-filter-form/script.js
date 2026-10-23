// --- Диапазон цены ---
const minInput = document.getElementById('price-min');
const maxInput = document.getElementById('price-max');
const minOut = document.getElementById('price-min-out');
const maxOut = document.getElementById('price-max-out');
const fill = document.getElementById('range-fill');
const THUMB = 9; // ширина бегунка в px (как в CSS)

function updateRange(changed) {
  let min = Number(minInput.value);
  let max = Number(maxInput.value);

  // бегунки не должны пересекаться
  if (min > max) {
    if (changed === minInput) { min = max; minInput.value = min; }
    else { max = min; maxInput.value = max; }
  }

  const total = Number(maxInput.max) - Number(maxInput.min);
  const minPct = (min / total) * 100;
  const maxPct = (max / total) * 100;

  // поправка на ширину бегунка, чтобы линия совпадала с его центром
  fill.style.left = `calc(${minPct}% + ${(0.5 - minPct / 100) * THUMB}px)`;
  fill.style.right = `calc(${100 - maxPct}% + ${(0.5 - (100 - maxPct) / 100) * THUMB}px)`;

  minOut.textContent = min;
  maxOut.textContent = max;
}

minInput.addEventListener('input', () => updateRange(minInput));
maxInput.addEventListener('input', () => updateRange(maxInput));
updateRange();

// --- Открытие / закрытие окна (по умолчанию окно открыто) ---
const filter = document.getElementById('filter');
const toggleBtn = filter.querySelector('.filter__btn');

toggleBtn.addEventListener('click', () => {
  const closed = filter.classList.toggle('filter--closed');
  toggleBtn.setAttribute('aria-expanded', String(!closed));
});
