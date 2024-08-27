import { fetchProducts } from './product-menu.js';

fetchProducts();

const container = document.getElementById('product-container');
const itemQuantities = {};

container.addEventListener('click', (event) => {
  const buttonTextDiv = event.target.closest('.button-text');
  const button = event.target.closest('button');

  if (buttonTextDiv && button) {
    const index = buttonTextDiv.dataset.productId;

    const productDiv = buttonTextDiv.closest('.product');
    const mobileImg = productDiv.querySelector('.mobile');
    const desktopImg = productDiv.querySelector('.desktop');

    if (button.querySelector('img').alt === 'Add to Cart icon') {
      if (!itemQuantities.hasOwnProperty(index)) {
        itemQuantities[index] = 1;
      }

      mobileImg.classList =
        'mobile block w-full rounded-lg lg:hidden border-4 border-accent';
      desktopImg.classList =
        'desktop hidden w-full max-w-sm rounded-lg lg:block border-4 border-accent';

      buttonTextDiv.innerHTML = `
        <div class="absolute -bottom-5 left-1/2 flex -translate-x-1/2 justify-center gap-7 text-nowrap rounded-full bg-accent p-2 px-6">
          <button id="decrement-item" class="flex items-center justify-center p-1 w-6 h-6 border border-white rounded-full m-auto"><img class="max-w-fit" src="../assets/images/icon-decrement-quantity.svg" alt="-" /></button>
          <p class="item-quantities font-bold text-base text-white">${itemQuantities[index]}</p>
          <button id="increment-item" class="flex items-center justify-center p-1 w-6 h-6 border border-radius border-white rounded-full m-auto"><img class="max-w-fit" src="../assets/images/icon-increment-quantity.svg" alt="+" /></button>
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

    if (itemQuantities[index] <= 0) {
      mobileImg.classList =
        'mobile block w-full rounded-lg lg:hidden border-4 border-white';
      desktopImg.classList =
        'desktop hidden w-full max-w-sm rounded-lg lg:block border-4 border-white';

      buttonTextDiv.innerHTML = `
      <button class="absolute -bottom-5 left-1/2 justify-center text-nowrap flex -translate-x-1/2 gap-1 rounded-full border-[.1px] border-rose-950 bg-white p-2 px-6 hover:border-accent hover:text-accent" data-index="${index}">
        <img src="../assets/images/icon-add-to-cart.svg" alt="Add to Cart icon" />
        <div class="text-base font-bold">
          Add to Cart
        </div>
      </button>
      `;
      delete itemQuantities[index];
    }
  }
});
