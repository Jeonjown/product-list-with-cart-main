import { fetchProducts } from './product-menu.js';

fetchProducts();

const container = document.getElementById('product-container');
const itemQuantities = {};

container.addEventListener('click', (event) => {
  const buttonTextDiv = event.target.closest('.button-text');
  const button = event.target.closest('button');

  if (buttonTextDiv && button) {
    const index = buttonTextDiv.dataset.productId;

    if (button.querySelector('img').alt === 'Add to Cart icon') {
      if (!itemQuantities.hasOwnProperty(index)) {
        itemQuantities[index] = 0;
      }

      buttonTextDiv.innerHTML = `
        <div class="absolute -bottom-5 left-1/2 flex -translate-x-1/2 justify-center gap-7 text-nowrap rounded-full border-[.1px] border-rose-950 bg-accent p-2 px-6">
          <button id="decrement-item" class="p-1 flex items-center justify-center"><img class="max-w-fit" src="../assets/images/icon-decrement-quantity.svg" alt="-" /></button>
          <p class="item-quantities font-bold text-xl">${itemQuantities[index]}</p>
          <button id="increment-item" class="p-1 flex items-center justify-center"><img class="max-w-fit" src="../assets/images/icon-increment-quantity.svg" alt="+" /></button>
        </div>
      `;
    }

    if (button.id === 'decrement-item' || button.id === 'increment-item') {
      const quantityItems = buttonTextDiv.querySelector('.item-quantities');
      let quantity = parseInt(quantityItems.textContent);

      if (button.id === 'decrement-item' && quantity > 0) {
        itemQuantities[index]--;
      } else if (button.id === 'increment-item') {
        itemQuantities[index]++;
      }

      quantityItems.textContent = itemQuantities[index];
    }
  }
});
