const datetimeDifference = require('datetime-difference');

/** Update interval */
const INTERVAL_MS = 1000;
/** Original birth date */
const BIRTH_DATE = new Date('1991-07-29');
/** Time button stays pressed */
const BUTTON_POP_MS = 10200;

/** Tracked UI components. */
const UI = {
  root: document.getElementById('app'),
  ageView: undefined,
};

const soundbyte = new Audio('./assets/operator.mp3');

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
    borderRadius: '140px',
    margin: '0px auto 20px auto',
    transition: '0.2s',
  }, {
    src,
  });

  img.addEventListener('click', () => {
    // Set
    img.style.border = 'solid 8px lightgreen';

    // Reset
    setTimeout(() => {
      img.style.border = 'none';
    }, BUTTON_POP_MS);

    // Trigger sound
    soundbyte.play();
  });

  return img;
};

/**
 * YouTube embed.
 *
 * @returns {HTMLElement}
 */
const YoutubeEmbed = () => {
  const container = DOM.create('div', {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    marginTop: '30px',
    maxWidth: '100%',
  });

  container.innerHTML = `<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/8fJlxnUgz_M"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer;
    autoplay;
    clipboard-write;
    encrypted-media;
    gyroscope;
    picture-in-picture"
    allowfullscreen>
  </iframe>`;

  return container;
};

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
  const realDays = Math.max(days - 1, 0);
  return DOM.isMobile()
    ? `${years} years, ${months} months,<br/>${realDays} days, ${hours} hours,<br/>${minutes} minutes, ${seconds} seconds`
    : `${years} years, ${months} months, ${realDays} days,<br/>${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

/**
 * Create UI components.
 */
const setupUI = () => {
  const container = Container();

  DOM.addChild(container, ImageView({ src: './assets/headshot.png' }));
  
  UI.ageView = AgeView();
  DOM.addChild(container, UI.ageView);

  DOM.addChild(container, YoutubeEmbed());

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
