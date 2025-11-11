let isProcessing = false;
let fillButton = null;
let clearButton = null;

// Дефолтные адреса
const DEFAULT_ADDRESSES = [
  {
    name: 'John Smith',
    firstName: 'John',
    lastName: 'Smith',
    address1: '69 Adams Street',
    address2: '',
    city: 'Brooklyn',
    state: 'New York',
    stateCode: 'NY',
    postal: '11201',
    countryText: 'United States',
    countryValue: 'US'
  },
  {
    name: 'Michael Johnson',
    firstName: 'Michael',
    lastName: 'Johnson',
    address1: '3511 Carlisle Avenue',
    address2: '',
    city: 'Covington',
    state: 'Kentucky',
    stateCode: 'KY',
    postal: '41015',
    countryText: 'United States',
    countryValue: 'US'
  }
];

async function getRandomAddress() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['customAddresses', 'addressSource', 'customNames', 'nameSource'], (result) => {
      const customAddresses = result.customAddresses || [];
      const customNames = result.customNames || [];
      const addressSource = result.addressSource || 'static';
      const nameSource = result.nameSource || 'static';
      
      let availableAddresses = [];
      
      switch (addressSource) {
        case 'static':
          // Только вшитые адреса
          availableAddresses = DEFAULT_ADDRESSES;
          break;
        case 'manual':
          // Только пользовательские адреса
          availableAddresses = customAddresses.length > 0 ? customAddresses : DEFAULT_ADDRESSES;
          break;
        case 'auto':
          // Автогенерация случайного адреса
          // Проверяем DataGenerator с несколькими попытками (на случай задержки загрузки)
          const checkDataGenerator = () => {
            if (typeof window !== 'undefined' && typeof window.DataGenerator !== 'undefined' && 
                typeof window.DataGenerator.generateRandomAddress === 'function') {
              return window.DataGenerator;
            }
            return null;
          };
          
          let DataGen = checkDataGenerator();
          
          // Если DataGenerator не загружен, ждем немного и пробуем снова
          if (!DataGen) {
            console.log('[SAF] DataGenerator not immediately available, waiting...');
            // Даем небольшую задержку для загрузки скрипта
            setTimeout(() => {
              DataGen = checkDataGenerator();
              if (DataGen) {
                try {
                  const generatedAddress = DataGen.generateRandomAddress();
                  console.log(`[SAF] Auto-generated address:`, generatedAddress.name, generatedAddress.city, generatedAddress.stateCode);
                  resolve(generatedAddress);
                  return;
                } catch (error) {
                  console.error('[SAF] Error generating address:', error);
                  console.warn('[SAF] Falling back to static addresses');
                  availableAddresses = DEFAULT_ADDRESSES;
                }
              } else {
                console.warn('[SAF] DataGenerator not loaded after wait, falling back to static');
                availableAddresses = DEFAULT_ADDRESSES;
              }
              
              // Если не удалось сгенерировать, продолжаем с обычной логикой
              if (availableAddresses === DEFAULT_ADDRESSES) {
                let addr;
                if (availableAddresses.length === 0) {
                  addr = DEFAULT_ADDRESSES[0];
                } else {
                  addr = availableAddresses[Math.floor(Math.random() * availableAddresses.length)];
                }
                
                // Применяем настройки источника имени
                if (nameSource === 'manual' && customNames.length > 0) {
                  const customName = customNames[Math.floor(Math.random() * customNames.length)];
                  addr = {
                    ...addr,
                    name: customName.fullName,
                    firstName: customName.firstName,
                    lastName: customName.lastName
                  };
                  console.log(`[SAF] Using custom name:`, customName.fullName);
                } else if (nameSource === 'static') {
                  const staticName = DEFAULT_ADDRESSES[Math.floor(Math.random() * DEFAULT_ADDRESSES.length)];
                  addr = {
                    ...addr,
                    name: staticName.name,
                    firstName: staticName.firstName,
                    lastName: staticName.lastName
                  };
                  console.log(`[SAF] Using static name:`, staticName.name);
                }
                
                console.log(`[SAF] Final address with name:`, addr.name, addr.city, addr.stateCode);
                resolve(addr);
              }
            }, 100);
            return; // Выходим из функции, resolve будет вызван в setTimeout
          }
          
          // Если DataGenerator доступен сразу
          try {
            const generatedAddress = DataGen.generateRandomAddress();
            console.log(`[SAF] Auto-generated address:`, generatedAddress.name, generatedAddress.city, generatedAddress.stateCode);
            resolve(generatedAddress);
            return;
          } catch (error) {
            console.error('[SAF] Error generating address:', error);
            console.warn('[SAF] Falling back to static addresses');
            availableAddresses = DEFAULT_ADDRESSES;
          }
          break;
        default:
          availableAddresses = DEFAULT_ADDRESSES;
      }
      
      let addr;
      if (availableAddresses.length === 0) {
        addr = DEFAULT_ADDRESSES[0];
      } else {
        addr = availableAddresses[Math.floor(Math.random() * availableAddresses.length)];
      }
      
      // Применяем настройки источника имени
      if (nameSource === 'manual' && customNames.length > 0) {
        // Используем пользовательское имя
        const customName = customNames[Math.floor(Math.random() * customNames.length)];
        addr = {
          ...addr,
          name: customName.fullName,
          firstName: customName.firstName,
          lastName: customName.lastName
        };
        console.log(`[SAF] Using custom name:`, customName.fullName);
      } else if (nameSource === 'static') {
        // Используем статическое имя из DEFAULT_ADDRESSES
        const staticName = DEFAULT_ADDRESSES[Math.floor(Math.random() * DEFAULT_ADDRESSES.length)];
        addr = {
          ...addr,
          name: staticName.name,
          firstName: staticName.firstName,
          lastName: staticName.lastName
        };
        console.log(`[SAF] Using static name:`, staticName.name);
      }
      // Если nameSource === 'auto' - используем имя из адреса (по умолчанию)
      
      console.log(`[SAF] Final address with name:`, addr.name, addr.city, addr.stateCode);
      resolve(addr);
    });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Кэш для случайных чисел (оптимизация производительности)
const delayCache = [];
const DELAY_CACHE_SIZE = 100;
let delayCacheIndex = 0;

// Предзаполняем кэш
for (let i = 0; i < DELAY_CACHE_SIZE; i++) {
  delayCache[i] = Math.random();
}

// Случайная задержка для имитации человеческого ввода (оптимизированная)
function randomDelay(min, max) {
  if (delayCacheIndex >= DELAY_CACHE_SIZE) {
    delayCacheIndex = 0;
    // Обновляем кэш
    for (let i = 0; i < DELAY_CACHE_SIZE; i++) {
      delayCache[i] = Math.random();
    }
  }
  const r = delayCache[delayCacheIndex++];
  return Math.floor(r * (max - min + 1)) + min;
}

// Получить настройку моментального ввода
let instantFillEnabled = false;

// Функция для обновления настройки моментального ввода
async function updateInstantFillSetting() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['instantFill'], (result) => {
      instantFillEnabled = result.instantFill === true;
      resolve(instantFillEnabled);
    });
  });
}

// Загружаем настройку при загрузке скрипта
updateInstantFillSetting();

// Слушаем изменения настройки
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.instantFill) {
    instantFillEnabled = changes.instantFill.newValue === true;
    console.log('[SAF] Instant Fill setting updated:', instantFillEnabled);
  }
});

// Посимвольный ввод текста (более реалистично)
async function typeText(element, text, useTyping = false) {
  if (!element || !text) return;
  
  element.focus();
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (!instantFillEnabled) {
    await sleep(randomDelay(150, 300));
  }
  
  if (useTyping && text.length < 50 && !instantFillEnabled) {
    // Посимвольный ввод для коротких текстов
    element.value = '';
    for (let i = 0; i < text.length; i++) {
      element.value += text[i];
      element.dispatchEvent(new Event('input', { bubbles: true }));
      await sleep(randomDelay(30, 80));
    }
    element.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    // Быстрый ввод для длинных текстов или моментальный ввод
    element.value = text;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }
  
  if (!instantFillEnabled) {
    await sleep(randomDelay(100, 200));
    element.blur();
    await sleep(randomDelay(200, 400));
  } else {
    element.blur();
  }
}

// Кэш для корневых элементов (обновляется при необходимости)
let rootsCache = null;
let rootsCacheTime = 0;
const ROOTS_CACHE_TTL = 5000; // 5 секунд

// Получить все корневые элементы включая shadow DOM (с кэшированием)
function collectRoots() {
  const now = Date.now();
  // Используем кэш если он свежий
  if (rootsCache && (now - rootsCacheTime) < ROOTS_CACHE_TTL) {
    return rootsCache;
  }
  
  const roots = [document];
  const stack = [document.documentElement];
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    if (node.shadowRoot) {
      roots.push(node.shadowRoot);
    }
    const children = node.children || [];
    for (let i = 0; i < children.length; i++) {
      stack.push(children[i]);
    }
  }
  
  // Сохраняем в кэш
  rootsCache = roots;
  rootsCacheTime = now;
  return roots;
}

// Проверка видимости элемента
function isVisible(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  if (style.visibility === 'hidden' || style.display === 'none') return false;
  if (el.disabled) return false;
  if (rect.width <= 0 || rect.height <= 0) return false;
  if (el.type === 'hidden') return false;
  return true;
}

// Кэш для элементов форм
let formElementsCache = null;
let formElementsCacheTime = 0;
const FORM_ELEMENTS_CACHE_TTL = 3000; // 3 секунды

// Собрать все видимые элементы форм (с кэшированием)
function collectFormElements() {
  const now = Date.now();
  // Используем кэш если он свежий
  if (formElementsCache && (now - formElementsCacheTime) < FORM_ELEMENTS_CACHE_TTL) {
    return formElementsCache;
  }
  
  const elements = [];
  for (const root of collectRoots()) {
    const found = root.querySelectorAll('input, select, textarea');
    // Используем for loop вместо forEach для лучшей производительности
    for (let i = 0; i < found.length; i++) {
      const el = found[i];
      if (isVisible(el)) elements.push(el);
    }
  }
  
  // Сохраняем в кэш
  formElementsCache = elements;
  formElementsCacheTime = now;
  return elements;
}

// Установить значение с нативными событиями (с реалистичной симуляцией)
async function setNativeValueAndDispatch(el, value, useTyping = false) {
  if (!el) return;
  
  try {
    // Фокус на поле как реальный пользователь
    el.focus();
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (!instantFillEnabled) {
      await sleep(randomDelay(150, 300)); // Случайная задержка после фокуса
    }
    
    const tag = el.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      const proto = tag === 'INPUT' 
        ? window.HTMLInputElement.prototype 
        : window.HTMLTextAreaElement.prototype;
      const valueSetter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      
      // Опциональный посимвольный ввод для имён и коротких полей (только если не моментальный ввод)
      if (useTyping && value && value.length < 30 && !instantFillEnabled) {
        el.value = '';
        for (let i = 0; i < value.length; i++) {
          valueSetter.call(el, el.value + value[i]);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          await sleep(randomDelay(50, 120)); // Случайная задержка между символами
        }
      } else {
        valueSetter.call(el, value);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
      
      el.dispatchEvent(new Event('change', { bubbles: true }));
      if (!instantFillEnabled) {
        await sleep(randomDelay(150, 250)); // Случайная задержка после ввода
      }
      el.blur();
    } else if (tag === 'SELECT') {
      el.value = value;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      if (!instantFillEnabled) {
        await sleep(randomDelay(200, 350));
      }
      el.blur();
    }
    
    // Дополнительная случайная задержка между полями (только если не моментальный ввод)
    if (!instantFillEnabled) {
      await sleep(randomDelay(300, 500));
    }
  } catch (_) {
    try {
      el.focus();
      if (!instantFillEnabled) {
        await sleep(randomDelay(150, 300));
      }
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      if (!instantFillEnabled) {
        await sleep(randomDelay(150, 250));
      }
      el.blur();
      if (!instantFillEnabled) {
        await sleep(randomDelay(300, 500));
      }
    } catch (_) {}
  }
}

// Выбор значения из select
function pickSelectValue(selectEl, valueCandidates, textCandidates) {
  if (!selectEl || selectEl.tagName !== 'SELECT') return null;
  const opts = Array.from(selectEl.options || []);
  const normalizedText = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const normalizedIncludes = (a, b) => normalizedText(a).includes(normalizedText(b));

  for (const v of valueCandidates || []) {
    const byValue = opts.find(o => normalizedText(o.value) === normalizedText(v));
    if (byValue) return byValue.value;
  }

  for (const t of textCandidates || []) {
    const byText = opts.find(o => normalizedText(o.textContent) === normalizedText(t));
    if (byText) return byText.value;
  }

  for (const t of textCandidates || []) {
    const loose = opts.find(o => normalizedIncludes(o.textContent, t));
    if (loose) return loose.value;
  }
  return null;
}

// Детект полей адреса
const FIELD_SYNONYMS = {
  fullName: ['full name', 'name', 'cardholder name', 'card name', 'cc-name'],
  firstName: ['first name', 'given-name'],
  lastName: ['last name', 'family-name', 'surname'],
  address1: ['address', 'address line 1', 'street', 'addressline1', 'address-line1', 'address-line-1'],
  address2: ['address line 2', 'apt', 'apartment', 'addressline2', 'address-line2', 'suite'],
  city: ['city', 'locality', 'address-level2'],
  state: ['state', 'region', 'province', 'administrative area', 'address-level1', 'address level 1'],
  postal: ['postal', 'zip', 'postcode', 'postal-code'],
  country: ['country', 'country or region']
};

const CARD_FIELD_WORDS = ['card', 'cvc', 'cvv', 'expiry', 'expiration', 'valid thru', 'month', 'year'];

function elementText(el) {
  const texts = [
    el.getAttribute('name'),
    el.getAttribute('id'),
    el.getAttribute('placeholder'),
    el.getAttribute('aria-label'),
    el.getAttribute('autocomplete'),
    el.getAttribute('data-testid'),
    el.getAttribute('data-qa')
  ].filter(Boolean);
  return texts.join(' ').toLowerCase();
}

function matchesAny(text, words) {
  const lower = text.toLowerCase();
  return words.some(w => lower.includes(w.toLowerCase()));
}

function isCardField(el) {
  const text = elementText(el);
  if (!text) return false;
  return matchesAny(text, CARD_FIELD_WORDS);
}

function scoreForSynonyms(el, synonyms) {
  const txt = elementText(el);
  let score = 0;
  if (!txt) return score;

  const auto = (el.getAttribute('autocomplete') || '').toLowerCase();
  for (const s of synonyms) {
    const sLower = s.toLowerCase();
    if (auto.split(/\s+/).includes(sLower)) score += 6;
  }

  const nameId = [
    (el.getAttribute('name') || '').toLowerCase(),
    (el.getAttribute('id') || '').toLowerCase()
  ].join(' ');
  for (const s of synonyms) {
    if (nameId.includes(s.toLowerCase())) score += 4;
  }

  const labelish = [
    (el.getAttribute('placeholder') || '').toLowerCase(),
    (el.getAttribute('aria-label') || '').toLowerCase()
  ].join(' ');
  for (const s of synonyms) {
    if (labelish.includes(s.toLowerCase())) score += 2;
  }
  return score;
}

function findBest(elements, synonyms, filterFn) {
  let best = null;
  let bestScore = 0;
  for (const el of elements) {
    if (filterFn && !filterFn(el)) continue;
    const score = scoreForSynonyms(el, synonyms);
    if (score > bestScore) {
      best = el;
      bestScore = score;
    }
  }
  return best;
}

function detectFields() {
  const all = collectFormElements().filter(el => !isCardField(el));
  const field = {};

  field.firstName = findBest(all, FIELD_SYNONYMS.firstName, el => el.tagName !== 'SELECT');
  field.lastName = findBest(all, FIELD_SYNONYMS.lastName, el => el.tagName !== 'SELECT');
  field.fullName = findBest(all, FIELD_SYNONYMS.fullName, el => el.tagName !== 'SELECT');
  field.address1 = findBest(all, FIELD_SYNONYMS.address1, el => el.tagName !== 'SELECT');
  field.address2 = findBest(all, FIELD_SYNONYMS.address2, el => el.tagName !== 'SELECT');
  field.city = findBest(all, FIELD_SYNONYMS.city, el => el.tagName !== 'SELECT');
  field.state = findBest(all, FIELD_SYNONYMS.state, el => el.tagName !== 'SELECT');
  field.postal = findBest(all, FIELD_SYNONYMS.postal, el => el.tagName !== 'SELECT');
  field.country = findBest(all, FIELD_SYNONYMS.country, () => true);

  if (field.fullName) {
    if (field.firstName === field.fullName) field.firstName = null;
    if (field.lastName === field.fullName) field.lastName = null;
  }
  if (field.firstName && field.lastName && field.firstName === field.lastName) {
    field.fullName = field.firstName;
    field.firstName = null;
    field.lastName = null;
  }

  return field;
}

// Детект карточных полей
function detectCardFields() {
  const roots = collectRoots();
  let number, exp, cvc;
  
  const numberSelectors = [
    'input[autocomplete="cc-number"]',
    'input[name*="cardnumber" i]',
    'input[id*="cardnumber" i]',
    'input[name="cardNumber"]',
    'input[placeholder*="1234"]',
    '#cardNumber'
  ];
  const expSelectors = [
    'input[autocomplete="cc-exp"]',
    'input[name*="exp" i]',
    'input[id*="exp" i]',
    'input[placeholder*="MM"]',
    'input[name="cardExpiry"]',
    '#cardExpiry'
  ];
  const cvcSelectors = [
    'input[autocomplete="cc-csc"]',
    'input[name*="cvc" i]',
    'input[name*="cvv" i]',
    'input[id*="cvc" i]',
    'input[placeholder*="CVC"]',
    'input[name="cardCvc"]',
    '#cardCvc'
  ];

  function findFirstVisible(selectors) {
    for (const root of roots) {
      for (const sel of selectors) {
        const el = root.querySelector(sel);
        if (el && isVisible(el)) return el;
      }
    }
    return null;
  }

  number = findFirstVisible(numberSelectors);
  exp = findFirstVisible(expSelectors);
  cvc = findFirstVisible(cvcSelectors);
  
  if (number || exp || cvc) {
    return { number, exp, cvc };
  }
  return null;
}

// Клик на "enter address manually" если есть
function clickManualAddressIfPresent() {
  const MANUAL_ADDRESS_TEXTS = [
    'enter address manually',
    'manually enter address',
    'ввести адрес вручную',
    'введите адрес вручную',
    'адрес вручную'
  ];
  
  try {
    const roots = collectRoots();
    const selectors = ['button', '[role="button"]', 'a', '.Button', '.Link', 'span[role="button"]', 'div[role="button"]'];
    for (const root of roots) {
      for (const sel of selectors) {
        const nodes = root.querySelectorAll(sel);
        for (let i = 0; i < nodes.length; i++) {
          const el = nodes[i];
          if (!isVisible(el)) continue;
          const combined = [
            el.textContent || '',
            el.getAttribute('aria-label') || '',
            el.getAttribute('title') || '',
            el.getAttribute('data-testid') || ''
          ].join(' ').toLowerCase();
          if (!combined) continue;
          if (MANUAL_ADDRESS_TEXTS.some(t => combined.includes(t.toLowerCase()))) {
            const clickable = el.closest('button, [role="button"], a, [role="link"]') || el;
            console.log('[SAF] Clicking manual address button:', el.textContent);
            clickable.click();
            return true;
          }
        }
      }
    }
  } catch (_) {}
  return false;
}

// Главная функция заполнения
async function autofillAll() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    // Обновляем настройку моментального ввода перед заполнением
    await updateInstantFillSetting();
    
    showNotification('🔄 Starting auto-fill...', 'info');
    
    // Небольшая начальная задержка как у реального пользователя (только если не моментальный ввод)
    if (!instantFillEnabled) {
      await sleep(randomDelay(500, 1000));
    }

    // ПЕРВЫМ ДЕЛОМ: Клик на кнопку выбора карты (аккордеон)
    console.log('[SAF] 🎯 Looking for card accordion button...');
    
    // Множество селекторов для поиска элементов карты
    const cardSelectors = [
      '[data-testid="card-accordion-item-button"]',
      'button[aria-label*="карт" i]',
      'button[aria-label*="card" i]',
      '[data-testid="card-accordion-item"] button',
      '.AccordionButton',
      'input[type="radio"][value="card"]',
      'input[id*="card" i][type="radio"]',
      '.PaymentMethodFormAccordionItemTitle-radio[value="card"]'
    ];
    
    let clicked = false;
    
    // Пробуем все селекторы
    for (const selector of cardSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        console.log(`[SAF] 🔍 Found element with selector: ${selector}`);
        
        try {
          // Прокручиваем к элементу
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          await sleep(randomDelay(200, 400));
          
          // Пробуем прямой клик
          element.click();
          console.log('[SAF] ✅ Clicked element directly');
          
          // Если это радио кнопка - диспатчим события
          if (element.type === 'radio') {
            element.checked = true;
            element.dispatchEvent(new Event('change', { bubbles: true }));
            element.dispatchEvent(new Event('input', { bubbles: true }));
            console.log('[SAF] ✅ Radio button checked and events dispatched');
          }
          
          await sleep(randomDelay(800, 1200));
          clicked = true;
          showNotification('💳 Card selected...', 'info');
          break;
        } catch (error) {
          console.log(`[SAF] ⚠️ Error clicking element: ${error.message}`);
          
          // Пробуем клик на родительский элемент
          try {
            const parent = element.closest('.AccordionItem, .PaymentMethodFormAccordionItem, [role="listitem"]');
            if (parent) {
              console.log('[SAF] 🔄 Trying to click parent element...');
              parent.click();
              await sleep(randomDelay(800, 1200));
              clicked = true;
              showNotification('💳 Card selected...', 'info');
              break;
            }
          } catch (e) {
            console.log(`[SAF] ⚠️ Parent click also failed: ${e.message}`);
          }
        }
      }
    }
    
    if (!clicked) {
      console.log('[SAF] ⚠️ Could not click card button, continuing anyway...');
    }

    // ВСЕГДА генерировать НОВЫЕ карты при каждом запуске
    showNotification('🔄 Generating fresh cards...', 'info');
    
    // Генерируем карты - берем из storage или дефолтный
    const binData = await chrome.storage.local.get(['currentBin']);
    const bin = binData.currentBin || '552461xxxxxxxxxx';
    
    // Content script не может использовать chrome.tabs.query
    // Отправляем запрос без ID вкладки, background script сам разберется
    const generated = await new Promise((resolve) => {
      chrome.runtime.sendMessage({
        action: 'generateCards',
        bin: bin,
        stripeTabId: null // Background script не использует это значение для автозаполнения
      }, (response) => {
        resolve(response);
      });
    });

    if (!generated || !generated.success) {
      showNotification('❌ Failed to generate cards: ' + (generated?.error || 'Unknown error'), 'error');
      isProcessing = false;
      return;
    }

    // Генерация теперь моментальная, но даем небольшую задержку для сохранения в storage
    await sleep(50); // Уменьшено с 2000ms до 50ms - генерация моментальная
    let storage = await chrome.storage.local.get(['generatedCards']);
    
    // Если карты еще не готовы, ждем еще немного (fallback для надежности)
    if (!storage.generatedCards || storage.generatedCards.length === 0) {
      await sleep(100);
      storage = await chrome.storage.local.get(['generatedCards']);
      if (!storage.generatedCards || storage.generatedCards.length === 0) {
        showNotification('❌ No cards were generated', 'error');
        isProcessing = false;
        return;
      }
    }

    const card = storage.generatedCards[Math.floor(Math.random() * storage.generatedCards.length)];
    const person = await getRandomAddress();

    showNotification('💳 Filling card details...', 'info');
    await sleep(randomDelay(400, 700));

    // Заполнить карточные поля
    const cardFields = detectCardFields();
    if (cardFields) {
      if (cardFields.number) {
        console.log('[SAF] Filling card number...');
        await setNativeValueAndDispatch(cardFields.number, card.card_number);
      }
      if (cardFields.exp) {
        console.log('[SAF] Filling expiry date...');
        const expiryStr = `${card.expiry_month} / ${card.expiry_year.slice(-2)}`;
        await setNativeValueAndDispatch(cardFields.exp, expiryStr);
      }
      if (cardFields.cvc) {
        console.log('[SAF] Filling CVC...');
        await setNativeValueAndDispatch(cardFields.cvc, card.cvv);
      }
    }

    showNotification('📝 Filling address...', 'info');

    // Установить страну
    const fields = detectFields();
    if (fields.country && fields.country.tagName === 'SELECT') {
      console.log('[SAF] Filling country...');
      const pickedCountry = pickSelectValue(
        fields.country,
        [person.countryValue],
        [person.countryText]
      );
      if (pickedCountry) {
        await setNativeValueAndDispatch(fields.country, pickedCountry);
      }
      await sleep(300);
    }

    // Клик на manual address
    const clickedManual = clickManualAddressIfPresent();
    if (clickedManual) {
      console.log('[SAF] Manual address button clicked');
      await sleep(randomDelay(800, 1200));
    }

    // Заполнить имя и адрес
    const fillNameAndAddress = async () => {
      const fresh = detectFields();
      
      if (fresh.firstName && fresh.lastName && fresh.firstName !== fresh.lastName) {
        console.log('[SAF] Filling first name...');
        await setNativeValueAndDispatch(fresh.firstName, person.firstName, true);
        console.log('[SAF] Filling last name...');
        await setNativeValueAndDispatch(fresh.lastName, person.lastName, true);
      } else {
        const single = fresh.fullName || fresh.firstName || fresh.lastName;
        if (single) {
          console.log('[SAF] Filling full name...');
          await setNativeValueAndDispatch(single, person.name, true); // Посимвольный ввод
        }
      }

      if (fresh.address1) {
        console.log('[SAF] Filling address line 1...');
        await setNativeValueAndDispatch(fresh.address1, person.address1, false);
      }
      if (fresh.address2) {
        console.log('[SAF] Filling address line 2...');
        await setNativeValueAndDispatch(fresh.address2, person.address2, false);
      }
      if (fresh.city) {
        console.log('[SAF] Filling city...');
        await setNativeValueAndDispatch(fresh.city, person.city, true); // Посимвольный ввод для города
      }
      if (fresh.postal) {
        console.log('[SAF] Filling postal code...');
        await setNativeValueAndDispatch(fresh.postal, person.postal, false);
      }
    };

    await fillNameAndAddress();

    // Заполнить штат
    const tryFillState = async () => {
      await sleep(randomDelay(400, 600));
      const f2 = detectFields();
      if (!f2.state) return;
      if (f2.state.tagName === 'SELECT') {
        console.log('📍 Filling state (select)...');
        const pickedState = pickSelectValue(
          f2.state,
          [person.stateCode],
          [person.state]
        );
        if (pickedState) {
          await setNativeValueAndDispatch(f2.state, pickedState);
        }
      } else {
        console.log('📍 Filling state (input)...');
        await setNativeValueAndDispatch(f2.state, person.stateCode || person.state, true);
      }
    };
    
    await tryFillState();

    await sleep(randomDelay(600, 1000));
    
    // Очистить использованные карты из хранилища
    chrome.storage.local.remove(['generatedCards'], () => {
      console.log('[SAF] Cleared used cards from storage');
    });
    
    console.log('[SAF] Auto-fill completed!');
    showNotification('✅ All fields filled successfully!', 'success');

  } catch (error) {
    // Очистить карты даже при ошибке
    chrome.storage.local.remove(['generatedCards']);
    showNotification('❌ Error: ' + error.message, 'error');
    console.error('Autofill error:', error);
  }

  isProcessing = false;
}

function showNotification(message, type = 'info') {
  const existing = document.getElementById('auto-card-filler-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.id = 'auto-card-filler-notification';
  notification.textContent = message;
  
  const colors = {
    info: '#3498db',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c'
  };
  
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: colors[type] || colors.info,
    color: 'white',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: '9999999',
    fontSize: '14px',
    fontWeight: '600',
    maxWidth: '300px',
    animation: 'slideIn 0.3s ease-out'
  });
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  if (!document.getElementById('autofill-notification-style')) {
    style.id = 'autofill-notification-style';
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transition = 'all 0.3s ease-out';
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Найти заголовок "Метод оплаты" / "Payment method"
function findPaymentMethodHeader() {
  const roots = collectRoots();
  
  for (const root of roots) {
    // Ищем различные варианты заголовков
    const headers = root.querySelectorAll('h1, h2, h3, h4, .Header, [class*="header"], [class*="title"], [class*="Title"]');
    
    for (const header of headers) {
      const text = header.textContent.toLowerCase().trim();
      if (text === 'payment method' || 
          text === 'payment' || 
          text === 'метод оплаты' ||
          text === 'способ оплаты' ||
          text.includes('payment method')) {
        return header;
      }
    }
  }
  
  return null;
}

// Создать кнопку очистки рядом с заголовком
function createFillButton() {
  if (clearButton || document.getElementById('stripe-clear-btn')) {
    return;
  }
  
  const paymentHeader = findPaymentMethodHeader();
  
  // Кнопка "Fill Everything" убрана - теперь используется кнопка в popup расширения
  
  // Создать кнопку очистки
  clearButton = document.createElement('button');
  clearButton.id = 'stripe-clear-btn';
  clearButton.innerHTML = '🗑️ Clear All Data';
  clearButton.style.cssText = `
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    transition: all 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin-left: 8px;
    vertical-align: middle;
    white-space: nowrap;
  `;
  
  clearButton.addEventListener('mouseenter', () => {
    clearButton.style.transform = 'translateY(-1px)';
    clearButton.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.4)';
  });
  
  clearButton.addEventListener('mouseleave', () => {
    clearButton.style.transform = 'translateY(0)';
    clearButton.style.boxShadow = '0 2px 8px rgba(220, 53, 69, 0.3)';
  });
  
  clearButton.addEventListener('click', async () => {
    if (confirm('⚠️ Clear all Stripe data? This will:\n\n• Delete all cookies\n• Clear localStorage\n• Clear sessionStorage\n• Clear cache\n• Reload the page\n\nContinue?')) {
      clearButton.disabled = true;
      clearButton.innerHTML = '⏳ Clearing...';
      
      await clearAllStripeData();
      
      showNotification('✅ All data cleared! Reloading...', 'success');
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  });
  
  // Вставить кнопки
  if (paymentHeader) {
    // Если заголовок найден - вставляем рядом
    if (paymentHeader.parentElement) {
      // Создаем wrapper для заголовка и кнопок
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;';
      
      // Копируем стили заголовка
      const headerClone = paymentHeader.cloneNode(true);
      headerClone.style.margin = '0';
      
      // Контейнер для кнопок
      const buttonsContainer = document.createElement('div');
      buttonsContainer.style.cssText = 'display: flex; gap: 8px;';
      buttonsContainer.appendChild(clearButton);
      
      wrapper.appendChild(headerClone);
      wrapper.appendChild(buttonsContainer);
      
      paymentHeader.parentElement.replaceChild(wrapper, paymentHeader);
    }
  } else {
    // Если не нашли заголовок - добавляем плавающую кнопку справа вверху
    clearButton.style.cssText += `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999999;
      padding: 12px 20px;
      font-size: 14px;
    `;
    document.body.appendChild(clearButton);
  }
}

// Функция полной очистки данных Stripe
async function clearAllStripeData() {
  try {
    // Очистка localStorage
    localStorage.clear();
    
    // Очистка sessionStorage
    sessionStorage.clear();
    
    // Очистка IndexedDB
    if (window.indexedDB) {
      const databases = await window.indexedDB.databases();
      for (const db of databases) {
        window.indexedDB.deleteDatabase(db.name);
      }
    }
    
    // Очистка всех cookies для текущего домена
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${location.hostname}`;
    }
    
    // Очистка Cache API
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
      }
    }
    
    // Запрос на очистку через background script (для более глубокой очистки)
    chrome.runtime.sendMessage({ action: 'clearBrowsingData' });
    
    console.log('[SAF] All Stripe data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
    showNotification('⚠️ Partial clear - some data may remain', 'warning');
  }
}

// Проверить нужна ли кнопка
function shouldShowButton() {
  const cardInput = detectCardFields();
  const addressFields = detectFields();
  return cardInput || addressFields.fullName || addressFields.address1;
}

// Инициализация кнопки
function initButton() {
  if (shouldShowButton()) {
    createFillButton();
  }
}

// Оптимизированный наблюдатель за DOM (debounce для производительности)
let observerTimeout = null;
const observer = new MutationObserver(() => {
  // Debounce: ждем 100ms перед проверкой
  if (observerTimeout) {
    clearTimeout(observerTimeout);
  }
  observerTimeout = setTimeout(() => {
    if (!clearButton && shouldShowButton()) {
      createFillButton();
    }
    // Инвалидируем кэши элементов при изменениях DOM
    rootsCache = null;
    formElementsCache = null;
  }, 100);
});

if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initButton);
} else {
  initButton();
}

// Оптимизированная инициализация кнопки (объединяем множественные setTimeout)
let initAttempts = 0;
const maxInitAttempts = 3;
const initInterval = setInterval(() => {
  initAttempts++;
  if (shouldShowButton() && !clearButton) {
    createFillButton();
  }
  if (initAttempts >= maxInitAttempts) {
    clearInterval(initInterval);
  }
}, 1000);

// Слушатель сообщений
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ping') {
    // Проверка готовности content script
    sendResponse({ success: true, ready: true });
    return true;
  }
  
  if (request.action === 'fillForm') {
    autofillAll();
    sendResponse({ success: true, message: 'Form fill started' });
    return true;
  }
  
  if (request.action === 'toggle3DSDetection') {
    threeDSDetectionActive = request.enabled;
    console.log('[SAF IP Blocker] 3DS detection:', threeDSDetectionActive ? 'enabled' : 'disabled');
    sendResponse({ success: true, enabled: threeDSDetectionActive });
    return true;
  }
  
  if (request.action === 'check3DSStatus') {
    sendResponse({ 
      success: true, 
      enabled: threeDSDetectionActive,
      modalPresent: detect3DSChallengeModal()
    });
    return true;
  }
  
  return true; // Для асинхронных ответов
});

// Clear cards on page unload or reload
window.addEventListener('beforeunload', () => {
  chrome.storage.local.remove(['generatedCards']);
  console.log('[SAF] Cleared cards on page unload');
});

// Clear old cards on page load
chrome.storage.local.remove(['generatedCards'], () => {
  console.log('[SAF] Cleared old cards on page load');
});

// ========================
// IP Blocker - 3DS Challenge Detection
// ========================

let threeDSDetectionActive = true;
let lastDetectionTime = 0;
const DETECTION_COOLDOWN = 5000; // 5 секунд между обнаружениями

/**
 * Проверяет наличие модального окна 3DS Challenge
 */
function detect3DSChallengeModal() {
  if (!threeDSDetectionActive) return false;
  
  const now = Date.now();
  if (now - lastDetectionTime < DETECTION_COOLDOWN) {
    return false; // Слишком рано, пропускаем
  }
  
  try {
    const roots = collectRoots();
    
    for (const root of roots) {
      // Ищем модальное окно с классом LightboxModal
      const modalContainers = root.querySelectorAll('.LightboxModal, [class*="ThreeDS"], [class*="3DS"]');
      
      for (const modal of modalContainers) {
        // Проверяем, что модальное окно открыто и содержит iframe с 3DS Challenge
        const isOpen = modal.classList.contains('LightboxModal-open') || 
                       modal.classList.contains('open') ||
                       modal.style.display !== 'none';
        
        if (!isOpen) continue;
        
        // Ищем iframe с 3DS Challenge
        const iframe = modal.querySelector('iframe[name*="challenge"], iframe.ThreeDS2-challenge, iframe[title*="3DS"]');
        
        if (iframe) {
          console.log('[SAF IP Blocker] 🚨 3DS Challenge modal detected!');
          lastDetectionTime = now;
          return true;
        }
        
        // Дополнительная проверка по содержимому
        const modalText = modal.textContent || '';
        if (modalText.toLowerCase().includes('challenge') || 
            modalText.toLowerCase().includes('verification') ||
            modalText.toLowerCase().includes('authenticate')) {
          
          const hasIframe = modal.querySelector('iframe');
          if (hasIframe) {
            console.log('[SAF IP Blocker] 🚨 3DS Challenge modal detected (by content)!');
            lastDetectionTime = now;
            return true;
          }
        }
      }
    }
  } catch (error) {
    console.error('[SAF IP Blocker] Error detecting 3DS modal:', error);
  }
  
  return false;
}

/**
 * Получает информацию о стране по IP адресу
 */
async function getCountryByIP(ip) {
  try {
    const response = await fetch(`https://ipwho.is/${ip}`);
    const data = await response.json();
    
    if (data.success && data.country_code) {
      return {
        country: data.country,
        countryCode: data.country_code
      };
    }
    return null;
  } catch (error) {
    console.error('[SAF IP Blocker] Error fetching country info:', error);
    return null;
  }
}

/**
 * Получает текущий IP и добавляет в блокировку
 */
async function blockCurrentIP() {
  try {
    console.log('[SAF IP Blocker] Fetching current IP...');
    
    // Получаем IP через публичный API
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const currentIP = data.ip;
    
    console.log('[SAF IP Blocker] Current IP:', currentIP);
    
    // Получаем информацию о стране
    const countryInfo = await getCountryByIP(currentIP);
    console.log('[SAF IP Blocker] Country info:', countryInfo);
    
    // Получаем список заблокированных IP
    chrome.storage.local.get(['blockedIPs'], (result) => {
      let blockedIPs = result.blockedIPs || [];
      
      // Проверяем, не заблокирован ли уже этот IP
      const alreadyBlocked = blockedIPs.some(item => item.ip === currentIP);
      
      if (alreadyBlocked) {
        console.log('[SAF IP Blocker] IP already blocked:', currentIP);
        showNotification('⚠️ IP already in blocklist: ' + currentIP, 'warning');
        return;
      }
      
      // Добавляем IP в блокировку
      const blockedEntry = {
        ip: currentIP,
        date: new Date().toISOString(),
        reason: '3DS Challenge Auto-detected',
        timestamp: Date.now(),
        country: countryInfo?.country || 'Unknown',
        countryCode: countryInfo?.countryCode || '??'
      };
      
      blockedIPs.push(blockedEntry);
      
      // Сохраняем в storage
      chrome.storage.local.set({ blockedIPs: blockedIPs }, () => {
        console.log('[SAF IP Blocker] ✅ IP blocked:', currentIP);
        const countryFlag = countryInfo ? ` (${countryInfo.countryCode})` : '';
        showNotification(`🚫 IP blocked: ${currentIP}${countryFlag}`, 'error');
        
        // Отправляем сообщение в background для синхронизации
        chrome.runtime.sendMessage({
          action: 'ipBlocked',
          ip: currentIP,
          entry: blockedEntry
        });
      });
    });
    
  } catch (error) {
    console.error('[SAF IP Blocker] Error blocking IP:', error);
    showNotification('❌ Error fetching IP: ' + error.message, 'error');
  }
}

/**
 * Обработчик обнаружения 3DS Challenge
 */
async function handle3DSDetection() {
  if (detect3DSChallengeModal()) {
    console.log('[SAF IP Blocker] 3DS Challenge detected, blocking IP...');
    await blockCurrentIP();
  }
}

// Оптимизированная периодическая проверка 3DS Challenge (увеличено до 3 секунд для снижения нагрузки)
const threeDSCheckInterval = setInterval(() => {
  handle3DSDetection();
}, 3000); // Проверяем каждые 3 секунды (было 2)

// Оптимизированный MutationObserver для 3DS (debounce для производительности)
let threeDSObserverTimeout = null;
const threeDSObserver = new MutationObserver((mutations) => {
  // Debounce: проверяем только раз в 500ms
  if (threeDSObserverTimeout) {
    return; // Пропускаем если уже запланирована проверка
  }
  
  // Проверяем только если было добавлено что-то существенное
  const hasSignificantChanges = mutations.some(mutation => {
    return mutation.addedNodes.length > 0 || 
           (mutation.type === 'attributes' && mutation.attributeName === 'class');
  });
  
  if (hasSignificantChanges) {
    threeDSObserverTimeout = setTimeout(() => {
      handle3DSDetection();
      threeDSObserverTimeout = null;
    }, 500);
  }
});

// Начинаем наблюдение за изменениями в DOM
if (document.body) {
  threeDSObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });
}

console.log('[SAF IP Blocker] 3DS Challenge detection initialized ✅');
