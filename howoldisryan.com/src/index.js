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
  container: undefined,
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
  padding: '15px 0px',
  margin: 0,
  backgroundColor: 'black',
  justifyContent: DOM.isMobile() ? 'flex-start' : 'center',
  transition: '0.2s',
});

/**
 * TitleText component.
 *
 * @returns {HTMLElement}
 */
const TitleText = ({ text = '' } = {}) => DOM.create('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  fontSize: DOM.isMobile() ? '2rem' : '3rem',
}, {}, [text]);

/**
 * ImageView component.
 * 
 * @param {object} props - Component props. 
 * @returns {HTMLElement}
 */
const ImageView = ({ src, maxWidth, maxHeight }) => {
  const img = DOM.create('img', {
    maxWidth,
    maxHeight,
    borderRadius: '140px',
    margin: '20px auto 20px auto',
    transition: '0.2s',
  }, {
    src,
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
    marginTop: '10px',
    maxWidth: '100%',
    backgroundColor: '#333',
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
const GitHubLink = () => {
  const anchor = DOM.create('a', {
    color: '#555',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px auto 0px auto',
  }, {
    target: '_blank',
    href: 'https://github.com/C-D-Lewis/howoldisryan.com',
  }, [
    ImageView({
      src: './assets/github.png',
      maxWidth: '48px',
      maxHeight: '48px',
    }),
  ]);

  return anchor;
};

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
    ? `${years} years, ${months} months,<br/>${realDays} days, ${hours + 1} hours,<br/>${minutes} minutes, ${seconds} seconds`
    : `${years} years, ${months} months, ${realDays} days,<br/>${hours + 1} hours, ${minutes} minutes, ${seconds} seconds`;
};

/**
 * Create UI components.
 */
const setupUI = () => {
  UI.container = Container();

  const heroImg = ImageView({
    src: './assets/headshot.png',
    maxWidth: 256,
    maxHeight: 256,
  });
  heroImg.addEventListener('click', () => {
    heroImg.style.border = 'solid 8px lightgreen';
    UI.container.style.backgroundColor = 'rgb(0, 50, 0)';

    setTimeout(() => {
      heroImg.style.border = 'none';
      UI.container.style.backgroundColor = 'black';
    }, BUTTON_POP_MS);
    
    soundbyte.play();
  });

  DOM.addChild(UI.container, heroImg);
  
  UI.ageView = TitleText();
  DOM.addChild(UI.container, UI.ageView);

  const videoContainer = Container();
  videoContainer.style.padding = 0;
  videoContainer.style.marginTop = '50px';

  const videoLabel = TitleText({ text: 'A message from friends:' });
  videoLabel.style.fontSize = '1.4rem';
  DOM.addChild(videoContainer, videoLabel);
  DOM.addChild(videoContainer, YoutubeEmbed());
  DOM.addChild(UI.container, videoContainer);

  DOM.addChild(UI.container, GitHubLink());

  // Finally
  DOM.addChild(UI.root, UI.container);
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
