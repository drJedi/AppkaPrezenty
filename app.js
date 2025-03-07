document.addEventListener('DOMContentLoaded', (event) => {
  initializeButton();

  const headline = document.querySelector('.sg-cw-section-heading-headline');
  const subline = document.querySelector('.sg-cw-section-heading-subline');
  const container = document.querySelector('.sg-cw-magazine-textarea-text');

  const userChoices = {
    recipient: null,
    category: null,
    priceRange: null
  };

  function initializeButton() {
      const buttonContainer = document.querySelector('.sg-cw-section-heading-cta-content');
      buttonContainer.innerHTML = '';  // wyczyść wcześniej dodane przyciski
      const button = document.createElement('button');
      button.id = 'findGiftButton';
      button.textContent = 'FIND GIFT';
      button.className = 'button';
      buttonContainer.appendChild(button);

      button.addEventListener('click', function() {
        showInitialChoices();
      });
  }

  function showInitialChoices() {
    const questionAnswersDiv = document.createElement('div');
    const questionAnswerPP = document.createElement('p');
    questionAnswerPP.textContent = "Dla kogo ten prezent";
    
    questionAnswersDiv.className = 'question__answers question__answers--images question__answers--images-desktop-3';
    questionAnswersDiv.setAttribute('role', 'radiogroup');
    questionAnswersDiv.setAttribute('aria-labelledby', 'question');
    
    const url = 'https://cewe-uk.leadfamly.com';
    const answerForWho = [
      { 'src': 'https://cewe-uk.leadfamly.com/files/4649/Gift_Finder_Updates_2023/Question1/q1a1myparents.png', 'description': 'My parents' },
      { 'src': url + '/files/4649/Gift_Finder_Updates_2023/Question1/q1a2theyoungestones0-6yearsold.png', 'description': 'The youngest ones (0-6 years old)' },
      { 'src': url + '/files/4649/Gift_Finder_Updates_2023/Question1/q1a8theolderchildren.png', 'description': 'The older children (10-19 years old)' },
      { 'src': 'imagesApp/dla-drugiej-osoby.png', 'description': 'My other half' },
      { 'src': url + '/files/4649/Gift_Finder_Updates_2023/Question1/q1a4auntiesanduncles.png', 'description': 'Aunties and uncles' },
      { 'src':'../Aplikacja-do-prezetow/imagesApp/mkbewe__kapitan_bomba__by_rebus2077_dixzs6w.png', 'description': 'My brothers or sisters' },
      { 'src':  'imagesApp/tytus.png', 'description': 'My friends' },
      { 'src': url + '/files/4649/Gift_Finder_Updates_2023/Question1/q1a6thegrandparents.png', 'description': 'The grandparents' }
    ];
    headline.classList.add('hidden');
    subline.classList.add('hidden');

    answerForWho.forEach(answer => {
      const h4 = document.createElement('h4');
      h4.className = 'question__image';
      h4.setAttribute('tabindex', '0');
      h4.setAttribute('role', 'radio');
      h4.setAttribute('aria-checked', 'false');

      const img = document.createElement('img');
      img.className = 'question__answer-item';
      img.src = answer.src;

      const div = document.createElement('div');
      div.textContent = answer.description;
      div.className = 'question__additional-description';

      h4.appendChild(img);
      h4.appendChild(div);

      h4.addEventListener('click', function() {
        userChoices.recipient = answer.description;
        questionAnswersDiv.style.display = 'none';
        showNextChoices();
      });

      questionAnswersDiv.appendChild(h4);
    });

    container.appendChild(questionAnswerPP);
    container.appendChild(questionAnswersDiv);

    const button = document.querySelector('#findGiftButton');
    button.style.display = 'none';
  }

  function showNextChoices() {
    const nextChoicesDiv = document.createElement('div');
    const questionAnswerPP = document.createElement('p');
    questionAnswerPP.textContent = "Wybierz kategorię prezentu";
    nextChoicesDiv.className = 'question__answers question__answers--categories';

    const categories = [
      { 'name': 'Coś specjalnego, co uchwyci wszystkie nasze wspólne wspomnienia' },
      { 'name': 'Mniejszy prezent pasujący do głównego' },
      { 'name': 'Coś kreatywnego' },
      { 'name': 'Coś osobistego' },
      { 'name': 'Coś dekoracyjnego' }
    ];

    const imgCategoris = [
      { 'src':'imagesApp/q2a1somethingspecialthatcapturesallourmemoriestogether.png' },
      { 'src':'imagesApp/q2a2asmallergifttogowiththemainone.png' },
      { 'src':'imagesApp/q2a3somethingcreative.png' },
      { 'src':'imagesApp/q2a4somethingpersonal.png' },
      { 'src':'imagesApp/q2a5somethingdecorative.png' }
    ];

    categories.forEach((category, index) => {
      const choice = document.createElement('h4');
      choice.className = 'question__category';
      choice.setAttribute('tabindex', '0');
      choice.setAttribute('role', 'radio');
      choice.setAttribute('aria-checked', 'false');
      choice.id = `category-${index}`;
      choice.textContent = category.name;

      const img = document.createElement('img');
      img.className = 'question__answer-item';
      img.src = imgCategoris[index].src;
      img.alt = category.name; 

      choice.appendChild(img);
      choice.addEventListener('click', function() {
        userChoices.category = category.name;
        nextChoicesDiv.style.display = 'none';
        showPriceChoices();
      });
      nextChoicesDiv.appendChild(choice);
    });

    container.appendChild(questionAnswerPP);
    container.appendChild(nextChoicesDiv);
  }

  function showPriceChoices() {
    const priceChoicesDiv = document.createElement('div');
    const questionAnswerPP = document.createElement('p');
    questionAnswerPP.textContent = "Wybierz przedział cenowy";
    priceChoicesDiv.className = 'question__answers question__answers--prices';

    const prices = [
      { 'range': 'Biednie' },
      { 'range': 'skromnie' },
      { 'range': 'Skromnie ale biednie' },
      { 'range': '$CEWE' }
    ];

    const priceImg = [
      { 'src':'imagesApp/kurvinox.png' },
      { 'src':'imagesApp/q3a2around25.png' },
      { 'src':'imagesApp/q3a3max60.png' },
      { 'src':'imagesApp/q3a4nobudget.png' }
    ];

    prices.forEach((price, index) => {
      const choice = document.createElement('div');
      choice.className = 'question__price';
      choice.setAttribute('tabindex', '0'); 
      choice.setAttribute('role', 'radio');
      choice.setAttribute('aria-checked', 'false');
      choice.id = `price-${index}`;
      choice.textContent = price.range;

      const img = document.createElement('img');
      img.className = 'question__answer-item';
      img.src = priceImg[index].src;
      img.alt = price.range; 

      choice.appendChild(img);
      choice.addEventListener('click', function() {
        userChoices.priceRange = price.range;
        priceChoicesDiv.style.display = 'none';
        showProductSuggestions();
      });
      priceChoicesDiv.appendChild(choice);
    });

    container.appendChild(questionAnswerPP);
    container.appendChild(priceChoicesDiv);
  }

  function showProductSuggestions() {
    container.innerHTML = '';
    const productChoicesDiv = document.createElement('div');
    const questionAnswerPP = document.createElement('p');
    questionAnswerPP.textContent = "Proponowane produkty";
    productChoicesDiv.className = 'question__answers question__answers--products';

    const products = [
      { recipient: 'My parents', category: 'Coś specjalnego, co uchwyci wszystkie nasze wspólne wspomnienia', price: 'Biednie', src: 'imagesApp/tytus.png', description: 'Produkt 1', link:"https://www.cewe.pl" },
      { recipient: 'My parents', category: 'Electronics', price: 'skromnie', src:'imagesApp/product2.png', description: 'Produkt 2' },
      { recipient: 'My parents', category: 'Books', price: '#CEWE', src: 'imagesApp/product3.png', description: 'Produkt 3' }
    ];

    const filteredProducts = products.filter(product =>
      product.recipient === userChoices.recipient &&
      product.category === userChoices.category &&
      product.price === userChoices.priceRange
    );

    if (filteredProducts.length === 0) {
      const noProductMsg = document.createElement('p');
      noProductMsg.textContent = 'Brak dostępnych produktów dla wybranych opcji';
      container.appendChild(noProductMsg);
    } else {
      filteredProducts.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'question__product';
        productDiv.id = `product-${index}`;

        const link = document.createElement('a');
        link.href = product.link;

        const img = document.createElement('img');
        img.className = 'question__answer-item';
        img.src = product.src;
        img.alt = product.description; 

        const div = document.createElement('div');
        div.textContent = product.description;
        div.className = 'question__additional-description';
        link.appendChild(img);
        productDiv.appendChild(link);
        productDiv.appendChild(div);

        productChoicesDiv.appendChild(productDiv);
      });

      container.appendChild(questionAnswerPP);
      container.appendChild(productChoicesDiv);
    }

    const resetButton = document.createElement('button');
    resetButton.textContent = 'RESET';
    resetButton.className = 'button reset-button';
    resetButton.addEventListener('click', resetApplication);
    container.appendChild(resetButton);
  }

  function resetApplication() {
    container.innerHTML = '';
    initializeButton(); 
    headline.classList.remove('hidden');
    subline.classList.remove('hidden'); 
    userChoices.recipient = null;
    userChoices.category = null;
    userChoices.priceRange = null;
  }
});