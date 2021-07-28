const datetimeDifference = require('datetime-difference');

/** Update interval */
const INTERVAL_MS = 1000;
/** Original birth date */
const BIRTH_DATE = new Date('1991-07-29');

/** Tracked UI components. */
const UI = {
  root: document.getElementById('app'),
  ageView: undefined,
};

/**
 * Container component.
 *
 * @returns {HTMLElement}
 */
const Container = () => DOM.create('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '15px',
  margin: 0,
  backgroundColor: 'black',
  justifyContent: 'center',
});

/**
 * AgeView component.
 *
 * @returns {HTMLElement}
 */
const AgeView = () => DOM.create('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  fontSize: DOM.isMobile() ? '2rem' : '3rem',
});

/**
 * ImageView component.
 * 
 * @param {object} props - Component props. 
 * @returns {HTMLElement}
 */
const ImageView = ({ src }) => {
  const img = DOM.create('img', {
    maxWidth: '256px',
    maxHeight: '256px',
    borderRadius: '50px',
    margin: '0px auto 20px auto',
    transition: '0.1s',
  }, {
    src,
  });

  // img.addEventListener('click', () => {
  //   // Set
  //   img.style.marginTop = '5px';
  //   img.style.maxWidth = '246px';
  //   img.style.maxHeight = '246px';
  //   img.style.marginBottom = '25px';

  //   // Reset
  //   setTimeout(() => {
  //     img.style.marginTop = '0px';
  //     img.style.maxWidth = '256px';
  //     img.style.maxHeight = '256px';
  //     img.style.marginBottom = '20px';
  //   }, BUTTON_POP_MS);
  // });

  return img;
};

const Hourglass = () => DOM.create('img', {
  maxWidth: '64px',
  maxHeight: '64px',
}, {
  src: './assets/hourglass.png',
});

/**
 * Source on GitHub link.
 *
 * @returns {HTMLElement}
 */
const GitHubLink = () => DOM.create('a', {
  color: '#555',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  bottom: '20px',
  left: 0,
  right: 0,
}, {
  target: '_blank',
  href: 'https://github.com/C-D-Lewis/howoldisryan.com',
}, ['Source available on GitHub']);

/**
 * Calculate the age string.
 *
 * @returns {string}
 */
const calculateAgeString = () => {
  const now = new Date();
  const {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  } = datetimeDifference(BIRTH_DATE, now);
  return DOM.isMobile()
    ? `${years} years, ${months} months,<br/>${days - 1} days, ${hours} hours,<br/>${minutes} minutes, ${seconds} seconds`
    : `${years} years, ${months} months, ${days - 1} days,<br/>${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

/**
 * Create UI components.
 */
const setupUI = () => {
  const container = Container();

  DOM.addChild(container, ImageView({ src: './assets/headshot.png' }));
  
  UI.ageView = AgeView();
  DOM.addChild(container, UI.ageView);

  DOM.addChild(container, GitHubLink());

  // Finally
  DOM.addChild(UI.root, container);
};

/**
 * When the UI should be updated.
 */
const updateUI = () => {
  DOM.setHtml(UI.ageView, calculateAgeString());
};

/**
 * The main function.
 */
const main = () => {
  setupUI();

  setInterval(updateUI, INTERVAL_MS);
  updateUI();
};

main();
