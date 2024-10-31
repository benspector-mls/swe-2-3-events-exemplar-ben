/** @jest-environment jsdom */
const fs = require('fs');
const path = require('path');
const ScoreCounter = require('score-tests');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const indexHtmlText = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');

describe(testSuiteName, () => {
  beforeEach(() => {
    document.documentElement.innerHTML = indexHtmlText;

    scoreCounter.add(expect); // DO NOT TOUCH
  });

  it('Sets up the html correctly', () => {
    const head = document.querySelector('head');
    const title = head.querySelector('title').textContent;
    expect(title).toBe('Intro to events');

    const mainHeading = document.querySelector('h1');
    expect(mainHeading).toBeTruthy();
    expect(mainHeading.textContent).toBe('More Events Practice');
    expect(document.querySelectorAll('h1').length).toBe(1);

    const incrementorButton = document.querySelector('#add-one');
    expect(incrementorButton).toBeTruthy();
    expect(incrementorButton.textContent).toBe('Click me to increment!');

    const results = document.querySelector('#results');
    expect(results).toBeTruthy();
    expect(results.textContent).toBe('0');

    const scriptTag = document.querySelector('script');
    expect(scriptTag.src).toContain('index.js');
    expect(scriptTag.textContent).toBe('');
    expect(scriptTag.childNodes.length).toBe(0);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Adds the event listener to increment #results', () => {
    require('../src/index'); // eslint-disable-line global-require

    const incrementorButton = document.querySelector('#add-one');
    const results = document.querySelector('#results');

    expect(incrementorButton.onclick).toBeFalsy();

    incrementorButton.click();
    expect(results.textContent).toBe('1');

    incrementorButton.click();
    expect(results.textContent).toBe('2');

    incrementorButton.click();
    incrementorButton.click();
    incrementorButton.click();
    incrementorButton.click();
    incrementorButton.click();
    incrementorButton.click();
    incrementorButton.click();
    incrementorButton.click();
    expect(results.textContent).toBe('10');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  afterAll(scoreCounter.export);
});
