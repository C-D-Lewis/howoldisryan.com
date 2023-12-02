const datetimeDifference = require('datetime-difference');

/** Update interval */
const INTERVAL_MS = 1000;
/** Original birth date */
const BIRTH_DATE = new Date('1991-07-29');
/** Time button stays pressed */
const SOUND_TIMEOUT_MS = 10200;

const soundbyte = new Audio('./assets/operator.mp3');

/**
 * Calculate the age string.
 *
 * @returns {string} Age string.
 */
const buildAgeString = () => {
  const now = new Date();
  const {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  } = datetimeDifference(BIRTH_DATE, now);
  return fabricate.isNarrow()
    ? `${years} years, ${months} months,<br/>${days} days, ${hours + 1} hours,<br/>${minutes} minutes, ${seconds} seconds`
    : `${years} years, ${months} months, ${days} days,<br/>${hours + 1} hours, ${minutes} minutes, ${seconds} seconds`;
};

/**
 * PageContainer component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
const PageContainer = () => fabricate('Column')
  .setStyles({
    height: '100%',
    padding: '15px 0px',
    margin: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    transition: '0.2s',
  })
  .setNarrowStyles({
    justifyContent: 'flex-start',
  })
  .onUpdate((el, { isPlaying }) => {
    el.setStyles({ backgroundColor: isPlaying ? 'rgb(0, 50, 0)' : 'black' });
  }, ['isPlaying']);

/**
 * AgeText component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
const AgeText = () => fabricate('Text')
  .setStyles({
    margin: 'auto',
    textAlign: 'center',
    color: 'white',
    fontSize: '3rem',
  })
  .setNarrowStyles({
    fontSize: '2rem',
  })
  .onUpdate((el, { ageString }) => {
    // Allow <br/>
    el.setHtml(ageString);
  }, ['fabricate:init', 'ageString']);

/**
 * YouTube embed.
 *
 * @returns {HTMLElement} Fabricate component.
 */
const YoutubeEmbed = () => fabricate('Row')
  .setStyles({
    justifyContent: 'center',
    margin: '15px auto',
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
 * Interactive portait image component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
const PortraitImage = () => fabricate('Image', { src: './assets/headshot.png' })
  .setStyles({
    width: '256px',
    height: '256px',
    borderRadius: '140px',
    margin: '20px auto 20px auto',
    transition: '0.2s',
  })
  .onUpdate((el, { isPlaying }) => {
    el.setStyles({ border: isPlaying ? 'solid 8px lightgreen' : 'none' });
  }, ['isPlaying'])
  .onClick((el, { isPlaying }) => {
    if (isPlaying) return;

    fabricate.update({ isPlaying: true });
    setTimeout(() => fabricate.update({ isPlaying: false }), SOUND_TIMEOUT_MS);

    soundbyte.play();
  });

/**
 * Video view with message.
 *
 * @returns {HTMLElement} Fabricate component.
 */
const VideoView = () => fabricate('Column')
  .setStyles({
    padding: 0,
    marginTop: '50px',
    backgroundColor: '#0000',
  })
  .setChildren([
    fabricate('Text')
      .setStyles({
        fontSize: '1.4rem',
        color: 'white',
        margin: '5px auto',
      })
      .setText('A message from friends:'),
    YoutubeEmbed(),
  ]);

/**
 * Main App component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
const App = () => PageContainer()
  .setChildren([
    PortraitImage(),
    AgeText(),
    VideoView(),
    fabricate('Row')
      .setStyles({ justifyContent: 'center', marginTop: '30px' })
      .setChildren([
        fabricate('img')
          .setAttributes({ src: './assets/github.png' })
          .setStyles({
            width: '32px',
            height: '32px',
            cursor: 'pointer',
          })
          .onClick(() => window.open('https://github.com/C-D-Lewis/howoldisryan.com', '_blank')),
        fabricate('FabricateAttribution')
          .setStyles({ marginLeft: '15px' }),
      ]),
  ])
  .onUpdate(() => {
    setInterval(
      () => fabricate.update({ ageString: buildAgeString() }),
      INTERVAL_MS,
    );
  }, ['fabricate:created']);

const initialState = {
  ageString: buildAgeString(),
  isPlaying: false,
};

fabricate.app(App, initialState);
