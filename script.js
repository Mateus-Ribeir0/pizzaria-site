window.onscroll = function() {
  scrollFunction();
};

var navbar = document.getElementById("header");
var headerHeight = navbar.offsetHeight;

function scrollFunction() {
  if (window.pageYOffset <= headerHeight) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - headerHeight;
    const duration = 1000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navbarItems = document.getElementById('navbar-items');
  const menuLinks = document.querySelectorAll('.navbar-items a');
  let menuOpen = false;

  function closeNavbar() {
    navbarItems.classList.remove('show');
    menuOpen = false;
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', closeNavbar);
  });

  hamburger.addEventListener('click', function() {
    menuOpen = !menuOpen;
    navbarItems.classList.toggle('show', menuOpen);
  });

  const traducoes = {
    "logotipo da pizzaria com as cores italianas": "Pizzeria logo with Italian colors",
    "Mateus Ribeiro, o dono da pizzaria sovando uma massa de pizza": "Mateus Ribeiro, the owner of the pizzeria kneading pizza dough",
    "Sobremesa de café Tiramisù, porção generosa.": "Tiramisù coffee dessert, generous portion.",
    "Lasanha a bolonhesa suculenta com muita carne.": "Juicy Bolognese lasagna with lots of meat.",
    "Espaguete carbonara ao dente, com molho e panceta.": "Spaghetti carbonara al dente, with sauce and pancetta.",
    "Carpaccio de carne muito fino acompanhado de salada.": "Very fine beef carpaccio accompanied by salad.",
    "Bruschetta de tomates frescos com folhas de mangericao e pesto.": "Fresh tomato bruschetta with basil leaves and pesto.",
    "Nhoque de batata com molho e decorado com coentro.": "Potato gnocchi with sauce and decorated with coriander.",
    "Soda italiana extremamente refrescante.": "Extremely refreshing Italian soda.",
    "Sobremesa Eclair de morango disposta em taça personalizada.": "Strawberry Eclair dessert arranged in a personalized glass.",
    "Antepasto com torradas da casa com molhos diversos.": "Antipasto with house toast with different sauces.",
    "Salada com tomates colhidos na orta do restaurante com mix de folhas.": "Salad with tomatoes harvested from the restaurant's garden and mixed greens.",
  };

  const mensagensValidacao = {
    pt: {
      nome: "Por favor, digite seu nome.",
      email: "Por favor, digite um e-mail válido.",
      motivo: "Por favor, selecione um motivo.",
      mensagem: "Por favor, digite uma mensagem.",
      sucesso: "Mensagem enviada com sucesso!",
      erro: "Por favor, corrija os erros no formulário antes de enviar."
    },
    en: {
      nome: "Please enter your name.",
      email: "Please enter a valid email address.",
      motivo: "Please select a reason.",
      mensagem: "Please enter a message.",
      sucesso: "Message sent successfully!",
      erro: "Please correct the errors in the form before submitting."
    }
  };

  let currentLang = 'pt'; // Define o idioma padrão como 'pt'

  function translateImages(lang) {
    const imagens = document.querySelectorAll('img.traduzir');
    imagens.forEach(img => {
      const altText = img.alt.trim();
      if (lang === 'en' && traducoes[altText]) {
        img.alt = traducoes[altText];
      } else if (lang === 'pt') {
        const originalText = Object.keys(traducoes).find(key => traducoes[key] === img.alt.trim());
        if (originalText) {
          img.alt = originalText;
        }
      }
    });
  }

  function switchLanguage(lang) {
    currentLang = lang; // Atualiza o idioma atual
    document.querySelectorAll('[data-lang-pt], [data-lang-en]').forEach(element => {
      if (element.tagName.toLowerCase() === 'input' && element.type === 'submit') {
        element.value = lang === 'pt' ? element.getAttribute('data-lang-pt') : element.getAttribute('data-lang-en');
      } else if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
        element.placeholder = lang === 'pt' ? element.getAttribute('data-lang-pt') : element.getAttribute('data-lang-en');
      } else {
        if (lang === 'pt' && element.dataset.langPt) {
          element.textContent = element.dataset.langPt;
        } else if (lang === 'en' && element.dataset.langEn) {
          element.textContent = element.dataset.langEn;
        }
      }
    });
    translateImages(lang);
  }

  document.getElementById('btn-pt').addEventListener('click', () => switchLanguage('pt'));
  document.getElementById('btn-en').addEventListener('click', () => switchLanguage('en'));

  function setInitialLanguage() {
    const preferredLanguage = navigator.language || navigator.userLanguage;
    switchLanguage(preferredLanguage.startsWith('pt') ? 'pt' : 'en');
  }

  setInitialLanguage();

  const form = document.getElementById('contato');
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const motivo = document.getElementById('motivo');
  const mensagem = document.getElementById('mensagem');

  function validateNome() {
    nome.setCustomValidity(nome.value.trim() === '' ? mensagensValidacao[currentLang].nome : '');
  }

  function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    email.setCustomValidity(!emailPattern.test(email.value.trim()) ? mensagensValidacao[currentLang].email : '');
  }

  function validateMotivo() {
    motivo.setCustomValidity(motivo.value === 'selecione' ? mensagensValidacao[currentLang].motivo : '');
  }

  function validateMensagem() {
    mensagem.setCustomValidity(mensagem.value.trim() === '' ? mensagensValidacao[currentLang].mensagem : '');
  }

  nome.addEventListener('input', validateNome);
  email.addEventListener('input', validateEmail);
  motivo.addEventListener('change', validateMotivo);
  mensagem.addEventListener('input', validateMensagem);

  form.addEventListener('submit', function(event) {
    validateNome();
    validateEmail();
    validateMotivo();
    validateMensagem();

    if (!form.checkValidity()) {
      event.preventDefault();
      alert(mensagensValidacao[currentLang].erro);
    } else {
      alert(mensagensValidacao[currentLang].sucesso);
    }
  });
});
