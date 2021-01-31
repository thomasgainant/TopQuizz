import { AppPage } from './app.po';
import { browser, by, element, ElementFinder, logging } from 'protractor';

describe('TopQuizz app end-to-end testing', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display all quizzes', async () => {
    await page.navigateTo();

    var quizzList = element.all(by.css('.quizz-overview'));
    expect(await quizzList.count()).toEqual(4);
  });

  it('should display one quizz', async () => {
    var quizzList = element.all(by.css('.quizz-overview'));
    var quizz:ElementFinder;

    for(let i = 0; i < await quizzList.count(); i++){
      let quizzElement = quizzList.get(i);
      if(await quizzElement.element(by.css("h2")).getText() === "Zoology"){
        quizz = quizzElement;
        break;
      }
    }

    expect(quizz).not.toBeUndefined();

    var quizzButton = quizz.element(by.css("button"));
    await quizzButton.click();

    expect(await element(by.css("span.h2.card-title")).getText()).toBe("How long does the gestation period of an african elephant last?");
  });

  it('should answer first quizz with correct answers', async () => {
    await answerQuizz("Zoology", ["22 months", "Carnivore", "1 250 000", "Cephalopoda", "Yes"], "Passed");
  });

  it('should answer second quizz with incorrect answers', async () => {
    await answerQuizz("Geography", ["32 months", "32 months", "32 months", "32 months", "32 months"], "Failed");
  });

  it('should answer third quizz with two wrong answers', async () => {
    await answerQuizz("History", ["22 months", "22 months", "32 months", "32 months", "22 months"], "Failed");
  });

  it('should display first quizz results correctly', async () => {
    await checkQuizzResult("Zoology", "Passed");
  });

  it('should display second quizz results correctly', async () => {
    await checkQuizzResult("Geography", "Failed");
  });

  it('should display third quizz results correctly', async () => {
    await checkQuizzResult("History", "Failed");
  });

  async function answerQuizz(quizzTitle:string, wantedAnswers:string[], resultExpected:string){
    await element(by.css("h1")).click();

    await browser.driver.sleep(1000);
    await browser.waitForAngular();

    var quizzList = element.all(by.css('.quizz-overview'));
    var quizz:ElementFinder;

    for(let i = 0; i < await quizzList.count(); i++){
      let quizzElement = quizzList.get(i);
      if(await quizzElement.element(by.css("h2")).getText() === quizzTitle){
        quizz = quizzElement;
        break;
      }
    }

    expect(quizz).not.toBeUndefined();
    console.log("Answering quizz "+quizzTitle);

    var quizzButton = quizz.element(by.css("button"));
    await quizzButton.click();

    let answers:string[] = wantedAnswers;
    let step:number = 0;

    for(let i = 0; i < answers.length; i++){
      let buttons = element.all(by.css("button.quizz-answer"));
      
      console.log(`Quizz step ${i+1}`);

      for(let i = 0; i < await buttons.count(); i++){
        let buttonElement = buttons.get(i);
        let buttonText = await buttonElement.getText();
        if(buttonText === answers[step]){
          console.log("Click on answer '"+buttonText+"'");
          await buttonElement.click();
          step++;
          break;
        }
      }

      await browser.driver.sleep(1000);
      await browser.waitForAngular();
    }

    expect(await element(by.css(".quizz-result")).getText() === resultExpected);
  }

  async function checkQuizzResult(quizzTitle:string, resultExpected:string){
    await element(by.css("h1")).click();

    await browser.driver.sleep(1000);
    await browser.waitForAngular();

    var quizzList = element.all(by.css('.quizz-overview'));
    var quizz:ElementFinder;

    for(let i = 0; i < await quizzList.count(); i++){
      let quizzElement = quizzList.get(i);
      if(await quizzElement.element(by.css("h2")).getText() === quizzTitle){
        quizz = quizzElement;
        break;
      }
    }

    expect(quizz).not.toBeUndefined();

    var quizzButton = quizz.element(by.css("button"));
    expect(await quizzButton.getText() === "Show results");
    await quizzButton.click();

    await browser.driver.sleep(1000);
    await browser.waitForAngular();

    expect(await element(by.css(".quizz-result")).getText() === resultExpected);
  }

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
