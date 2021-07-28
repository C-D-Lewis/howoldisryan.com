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
  fontSize: '3rem',
});

/**
 * ImageView component.
 * 
 * @param {object} props - Component props. 
 * @returns {HTMLElement}
 */
const ImageView = ({ src }) => DOM.create('img', {
  maxWidth: '256px',
  maxHeight: '256px',
  borderRadius: '50px',
  margin: '0px auto 20px auto',
}, {
  src,
});

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
  } = datetimeDifference(BIRTH_DATE, now);
  return DOM.isMobile()
    ? `${years} years,<br/>${months} months,<br/>${days} days`
    : `${years} years, ${months} months, ${days} days`;
};

/**
 * Create UI components.
 */
const setupUI = () => {
  const container = Container();

  DOM.addChild(container, ImageView({ src: './assets/headshot.png' }));
  
  UI.ageView = AgeView();
  DOM.addChild(container, UI.ageView);

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