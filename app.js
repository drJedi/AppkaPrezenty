document.addEventListener('DOMContentLoaded', () => {
    // Tablice z danymi produktów
    const productAttributes = {
      categories: {
        "Coś specjalnego, co uchwyci wszystkie nasze wspólne wspomnienia": ["Fotoalbum", "Koc PREMIUM ze zdjęciem"],
        "Mniejszy prezent pasujący do głównego": ["Brelok", "Zażółć gęślą jaźń"],
        "Coś kreatywnego": ["Zdjecia", "Puzzle z własnym nadrukiem"],
        "Coś osobistego": ["Kubek z nadrukiem", "Personalizowany plakat",'Brelok'],
        "Coś dekoracyjnego": ["Personalizowany plakat", "Kubek z nadrukiem","Puzzle z własnym nadrukiem"]
      },
      prices: {
        "Biednie": ["Brelok",  "Kubek z nadrukiem"],
        "skromnie": ["Torba PREMIUM ze zdjęciem"],
        "Skromnie ale biednie": ["Personalizowany plakat", "Kalendarz ścienny"],
        "$CEWE": ["Fotoalbum", "Koc PREMIUM ze zdjęciem"]
      },
      forWho: {
        "My parents": ["Fotoalbum", "Personalizowany plakat"],
        "The youngest ones (0-6 years old)": ["Zdjecia", "Puzzle z własnym nadrukiem","Brelok"],
        "The older children (10-19 years old)": ["Zdjecia", "Brelok"],
        "My other half": ["Personalizowany plakat", "Kubek z nadrukiem"],
        "Aunties and uncles": ["Torba PREMIUM ze zdjęciem", "Kalendarz ścienny"],
        "My brothers or sisters": ["Zażółć gęślą jaźń", "Brelok"],
        "My friends": ["Kubek z nadrukiem", "Puzzle z własnym nadrukiem"],
        "The grandparents": ["Fotoalbum", "Brelok"]
      }
    };
  
    const products = [
      { name: "Fotoalbum", src: "", description: 'Fotoalbum z wakacji', link:"https://www.cewe.pl/cewe-fotoksiazka.html" },
      { name: "Koc PREMIUM ze zdjęciem", src: "", description: 'Koc PREMIUM ze zdjęciem z wydarzeniami rodzinnymi', link:"https://www.cewe.pl/fotoprezenty/koc-premium-ze-zdjeciem.html" },
      { name: "Brelok", src: "", description: 'Personalizowany brelok', link:"https://www.cewe.pl/fotoprezenty/brelok-ze-zdjeciem.html" },
      { name: "Zażółć gęślą jaźń", src: "", description: 'Zażółć gęślą jaźń', link:"https://www.cewe.pl" },
      { name: "Zdjecia", src: "", description: 'Zestaw do tworzenia własnych dekoracji', link:"https://www.cewe.pl" },
      { name: "Puzzle z własnym nadrukiem", src: "", description: 'Puzzle z własnym zdjęciem', link:"https://www.cewe.pl/fotoprezenty/fotopuzzle-premium.html" },
      { name: "Kubek z nadrukiem", src: "", description: 'Kubek z własnym zdjęciem', link:"https://www.cewe.pl/fotoprezenty/kubki.html" },
      { name: "Personalizowany plakat", src: "", description: 'Plakat z własnym nadrukiem', link:"https://www.cewe.pl/fotoplakaty.html" },
      { name: "Torba PREMIUM ze zdjęciem", src: "", description: 'Torba PREMIUM ze zdjęciem', link:"https://www.cewe.pl/fotoprezenty/torba-premium-ze-zdjeciem.html" },
      { name: "Kalendarz ścienny", src: "", description: 'Kalendarz ścienny', link:"https://www.cewe.pl/kalendarz-ze-zdjeciami/scienny.html" }
    ];
  
    const categoryImageMap = {
      "Coś specjalnego, co uchwyci wszystkie nasze wspólne wspomnienia": "cewe-special.png",
      "Mniejszy prezent pasujący do głównego": "two-gifts-cewe.png",
      "Coś kreatywnego": "creative-cewe.png",
      "Coś osobistego": "personal.png",
      "Coś dekoracyjnego": "decorative.png"
    };
  
    const priceImageMap = {
      "Biednie": "biednie.png",
      "skromnie": "skromnie.png",
      "Skromnie ale biednie": "skromnie_biednie.png",
      "$CEWE": "cewe.png",
    };
    const forWhoShortcuts = {
        "My parents": "parents",
        "The youngest ones (0-6 years old)": "kids",
        "The older children (10-19 years old)": "teens",
        "My other half": "partner",
        "Aunties and uncles": "family",
        "My brothers or sisters": "siblings",
        "My friends": "friends",
        "The grandparents": "grandparents"
    };
    
    function generateProductFileNames(userForWho, productNames) {
        const prefix = forWhoShortcuts[userForWho] || "default";
    
        // Funkcja do normalizacji nazw produktów (usuwanie polskich znaków)
        function normalizeText(text) {
            return text
                .normalize('NFD') // Rozdziela znaki diakrytyczne (np. "ą" → "a" + diakrytyk)
                .replace(/[\u0300-\u036f]/g, '') // Usuwa znaki diakrytyczne
                .replace(/[^a-zA-Z0-9]/g, ''); // Usuwa wszystkie inne niedozwolone znaki
        }
    
        return productNames.map(product => {
            const normalizedProduct = normalizeText(product.toLowerCase()); // Normalizujemy nazwę produktu
            return {
                name: product,
                src: `./imagesApp/${prefix}_${normalizedProduct}.jpg`
            };
        });
    }
 
    
   

    function findMatchingProducts(userPrice, userCategory, userForWho) {
        let categoryProducts = userCategory ? productAttributes.categories[userCategory] : [];
        console.log(categoryProducts);
        
        let priceProducts = userPrice ? productAttributes.prices[userPrice] : [];
        console.log(priceProducts);
        
        let forWhoProducts = userForWho ? productAttributes.forWho[userForWho] : [];
        console.log(forWhoProducts);
        
        const matchingProductsNames = [...new Set([...categoryProducts, ...priceProducts, ...forWhoProducts])];
        console.log(matchingProductsNames);
        
        
        return generateProductFileNames(userForWho, matchingProductsNames).map(file => {
            const foundProduct = products.find(p => p.name === file.name);
            return {
                ...file,
                description: foundProduct ? foundProduct.description : '',
                link: foundProduct ? foundProduct.link : ''
            };
        });
    }
  
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
      buttonContainer.innerHTML = ''; // wyczyść wcześniej dodane przyciski
      const button = document.createElement('button');
      button.id = 'findGiftButton';
      button.textContent = 'FIND GIFT';
      button.className = 'button';
      buttonContainer.appendChild(button);
  
      button.addEventListener('click', () => {
        showInitialChoices();
      });
  
    }
  
    function showInitialChoices() {
      container.innerHTML = '';
      const questionAnswersDiv = document.createElement('div');
      const questionAnswerPP = document.createElement('p');
      questionAnswerPP.textContent = "Dla kogo ten prezent";
      
      questionAnswersDiv.className = 'question__answers question__answers--images';
      questionAnswersDiv.setAttribute('role', 'radiogroup');
      questionAnswersDiv.setAttribute('aria-labelledby', 'question');
      
      const answerForWho = [
        { src: 'https://cewe-uk.leadfamly.com/files/4649/Gift_Finder_Updates_2023/Question1/q1a1myparents.png', description: 'My parents' },
        { src: 'https://cewe-uk.leadfamly.com/files/4649/Gift_Finder_Updates_2023/Question1/q1a2theyoungestones0-6yearsold.png', description: 'The youngest ones (0-6 years old)' },
        { src: 'https://cewe-uk.leadfamly.com/files/4649/Gift_Finder_Updates_2023/Question1/q1a8theolderchildren.png', description: 'The older children (10-19 years old)' },
        { src: './imagesApp/dla-drugiej-osoby.png', description: 'My other half' },
        { src: 'https://cewe-uk.leadfamly.com/files/4649/Gift_Finder_Updates_2023/Question1/q1a4auntiesanduncles.png', description: 'Aunties and uncles' },
        { src: './imagesApp/mkbewe__kapitan_bomba__by_rebus2077_dixzs6w.png', description: 'My brothers or sisters' },
        { src: './imagesApp/tytus.png', description: 'My friends' },
        { src: 'https://cewe-uk.leadfamly.com/files/4649/Gift_Finder_Updates_2023/Question1/q1a6thegrandparents.png', description: 'The grandparents' }
      ];
  
      headline.classList.add('hidden');
      subline.classList.add('hidden');
  
      answerForWho.forEach(answer => {
        const div = document.createElement('div');
        div.className = 'question__image';
        div.setAttribute('tabindex', '0');
        div.setAttribute('role', 'radio');
        div.setAttribute('aria-checked', 'false');
  
        const img = document.createElement('img');
        img.className = 'question__answer-item';
        img.src = answer.src;
  
        const description = document.createElement('div');
        description.textContent = answer.description;
        description.className = 'question__additional-description';
  
        div.appendChild(img);
        div.appendChild(description);
  
        div.addEventListener('click', () => {
          userChoices.recipient = answer.description;
          questionAnswersDiv.style.display = 'none';
          showNextChoices();
        });
  
        questionAnswersDiv.appendChild(div);
      });
  
      container.appendChild(questionAnswerPP);
      container.appendChild(questionAnswersDiv);
  
      const button = document.querySelector('#findGiftButton');
      button.style.display = 'none';
    }
  
    function showNextChoices() {
      container.innerHTML = '';
      const nextChoicesDiv = document.createElement('div');
      const questionAnswerPP = document.createElement('p');
      questionAnswerPP.textContent = "Wybierz kategorię prezentu";
      nextChoicesDiv.className = 'question__answers';
  
      const categories = Object.keys(productAttributes.categories);
  
      categories.forEach(category => {
        const div = document.createElement('div');
        div.className = 'question__category';
        div.setAttribute('tabindex', '0');
        div.setAttribute('role', 'radio');
        div.setAttribute('aria-checked', 'false');
  
        const img = document.createElement('img');
        img.className = 'question__answer-item';
        img.src = `./imagesApp/${categoryImageMap[category]}`;
        img.alt = category;
        // console.log(img.src);
        
  
        const description = document.createElement('div');
        description.textContent = category;
        description.className = 'question__additional-description';
  
        div.appendChild(img);
        div.appendChild(description);
  
        div.addEventListener('click', () => {
          userChoices.category = category;
          nextChoicesDiv.style.display = 'none';
          showPriceChoices();
        });
        nextChoicesDiv.appendChild(div);
      });
  
      container.appendChild(questionAnswerPP);
      container.appendChild(nextChoicesDiv);
    }
  
    function showPriceChoices() {
      container.innerHTML = '';
      const priceChoicesDiv = document.createElement('div');
      const questionAnswerPP = document.createElement('p');
      questionAnswerPP.textContent = "Wybierz przedział cenowy";
      priceChoicesDiv.className = 'question__answers';
  
      const prices = Object.keys(productAttributes.prices);
  
      prices.forEach(price => {
        const div = document.createElement('div');
        div.className = 'question__price';
        div.setAttribute('tabindex', '0'); 
        div.setAttribute('role', 'radio');
        div.setAttribute('aria-checked', 'false');
  
        const img = document.createElement('img');
        img.className = 'question__answer-item';
        img.src = `./imagesApp/${priceImageMap[price]}`;
        img.alt = price;
        console.log(img.src);
        
  
        const description = document.createElement('div');
        description.textContent = price;
        description.className = 'question__additional-description';
  
        div.appendChild(img);
        div.appendChild(description);
  
        div.addEventListener('click', () => {
          userChoices.priceRange = price;
          priceChoicesDiv.style.display = 'none';
          showProductSuggestions();
        });
        priceChoicesDiv.appendChild(div);
      });
  
      container.appendChild(questionAnswerPP);
      container.appendChild(priceChoicesDiv);
    }
  
    function showProductSuggestions() {
        container.innerHTML = '';
        const productChoicesDiv = document.createElement('div');
        const questionAnswerPP = document.createElement('p');
        questionAnswerPP.textContent = "Proponowane produkty";
        productChoicesDiv.className = 'question__answers';
    
        const filteredProducts = findMatchingProducts(userChoices.priceRange, userChoices.category, userChoices.recipient);
    
        if (filteredProducts.length === 0) {
            const noProductMsg = document.createElement('p');
            noProductMsg.textContent = 'Brak dostępnych produktów dla wybranych opcji';
            container.appendChild(noProductMsg);
        } else {
            // Ograniczamy liczbę wyświetlanych produktów do 3
            filteredProducts.slice(0, 3).forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'question__product';
    
                const link = document.createElement('a');
                link.href = product.link;
    
                const img = document.createElement('img');
                img.className = 'question__answer-item';
                img.src = product.src;
                img.alt = product.name;
    
                const description = document.createElement('div');
                description.textContent = product.description;
                description.className = 'question__additional-description';
    
                link.appendChild(img);
                link.appendChild(description);
                productDiv.appendChild(link);
    
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
