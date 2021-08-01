const datetimeDifference = require('datetime-difference');

/** Update interval */
const INTERVAL_MS = 1000;
/** Original birth date */
const BIRTH_DATE = new Date('1991-07-29');
/** Time button stays pressed */
const BUTTON_POP_MS = 10200;

/** Tracked UI components. */
const UI = {
  ageView: undefined,
};

const soundbyte = new Audio('./assets/operator.mp3');

/**
 * Container component.
 *
 * @returns {HTMLElement}
 */
const Container = () => fabricate('div')
  .asFlex('column')
  .addStyles({
    height: '100%',
    padding: '15px 0px',
    margin: 0,
    backgroundColor: 'black',
    justifyContent: fabricate.isMobile() ? 'flex-start' : 'center',
    transition: '0.2s',
  });

/**
 * TitleText component.
 *
 * @returns {HTMLElement}
 */
const TitleText = () => fabricate('div')
  .addStyles({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: fabricate.isMobile() ? '2rem' : '3rem',
  });

/**
 * ImageView component.
 * 
 * @param {object} props - Component props. 
 * @returns {HTMLElement}
 */
const ImageView = () => fabricate('img')
  .addStyles({
    borderRadius: '140px',
    margin: '20px auto 20px auto',
    transition: '0.2s',
  });

/**
 * YouTube embed.
 *
 * @returns {HTMLElement}
 */
const YoutubeEmbed = () => fabricate('div')
  .asFlex('row')
  .addStyles({
    margin: 'auto',
    justifyContent: 'center',
    marginTop: '10px',
    maxWidth: '100%',
    backgroundColor: '#333',
  })
  .setHtml(`<iframe
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
    </iframe>`);

/**
 * Source on GitHub link.
 *
 * @returns {HTMLElement}
 */
const GitHubLink = () => fabricate('a')
  .asFlex('row')
  .addStyles({
    color: '#555',
    justifyContent: 'center',
    margin: '20px auto 0px auto',
  })
  .addAttributes({
    target: '_blank',
    href: 'https://github.com/C-D-Lewis/howoldisryan.com',
  })
  .addChildren([
    ImageView()
      .addAttributes({ src: './assets/github.png' })
      .addStyles({
        maxWidth: '48px',
        maxHeight: '48px',
      }),
  ]);

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
  return fabricate.isMobile()
    ? `${years} years, ${months} months,<br/>${days} days, ${hours + 1} hours,<br/>${minutes} minutes, ${seconds} seconds`
    : `${years} years, ${months} months, ${days} days,<br/>${hours + 1} hours, ${minutes} minutes, ${seconds} seconds`;
};

/**
 * Create UI components.
 */
const setupUI = () => {
  const container = Container();

  const portraitImg = ImageView()
    .addStyles({
      maxWidth: 256,
      maxHeight: 256,
    })
    .addAttributes({ src: './assets/headshot.png' })
    .onClick((el) => {
      el.addStyles({ border: 'solid 8px lightgreen' });
      container.addStyles({ backgroundColor: 'rgb(0, 50, 0)' });

      setTimeout(() => {
        el.addStyles({ border: 'none' });
        container.addStyles({ backgroundColor: 'black' });
      }, BUTTON_POP_MS);

      soundbyte.play();
    });

  UI.ageView = TitleText();
  
  const videoContainer = Container()
    .addStyles({
      padding: 0,
      marginTop: '50px',
      backgroundColor: '#0000',
    })
    .addChildren([
      TitleText()
        .addStyles({ fontSize: '1.4rem' })
        .setText('A message from friends:'),
      YoutubeEmbed(),
    ]);

    container.addChildren([
      portraitImg,
      UI.ageView,
      videoContainer,
      GitHubLink(),
    ]);

  // Finally
  fabricate.app(container);
};

/**
 * When the UI should be updated.
 */
const updateUI = () => {
  UI.ageView.setHtml(calculateAgeString());
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
