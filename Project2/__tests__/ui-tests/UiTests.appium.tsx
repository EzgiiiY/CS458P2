import { AppiumSetup } from "./appium.setup.js";
import { OS_CLI_ARG_NAME, IOS_PLATFORM_NAME } from "./appium.consts.js";

let client: any;
let isIOS: boolean;
let visible: string;
beforeAll(async () => {
    client = await AppiumSetup.setup();
    if (AppiumSetup.getCommandLineArgument(OS_CLI_ARG_NAME).toLowerCase() === IOS_PLATFORM_NAME.toLowerCase()) {
        isIOS = true;
        visible = "visible";
    } else {
        isIOS = false;
        visible = "displayed";
    }
});

beforeEach(async () => {
    await client.launchApp();
});

afterAll(async () => {
    await client.deleteSession();
});

//Test Case 1: Validate that the survey page is displayed properly in both android and ios platforms. 
test("Platform Test", async () => {
    const stepOne = isIOS ? await client.$("~app-root") : await client.$("//android.widget.TextView[1]");
    expect(await stepOne.getAttribute(visible)).toBeTruthy();
});

//Test Case 2: Validate that the survey page screen is scrollable.
test("Scrollability test", async () => {

    if (!isIOS) {

        const windowSize = await client.getWindowSize();

        const input = await client.$("~side-effects")
        let location = await input.getLocation();

        await client.touchPerform([
            { action: 'press', options: { x: windowSize.width / 2, y: windowSize.height * 0.9 } },
            { action: "wait", options: { mseconds: 100 } },
            { action: 'moveTo', options: { x: windowSize.width / 2, y: windowSize.height * 0.1 } },
            { action: 'release' }
        ]);

        const input2 = await client.$("~side-effects")
        let location2 = await input2.getLocation();
        expect(location2).not.toEqual(location);
    }

    else {

        const input = await client.$("~side-effects")
        let location = await input.getLocation();

        const elm = await client.$("~app-root")

        await client.execute('mobile: scroll', { direction: 'down', element: elm })

        const input2 = await client.$("~side-effects")
        let location2 = await input2.getLocation();
        expect(location2).not.toEqual(location);

    }

});


//Test case 3: When the invalid input is entered, user should not be able to proceed by send button.
test("Invalid Input test", async () => {

    //scroll down
    if (!isIOS) {
        const windowSize = await client.getWindowSize();
        await client.touchPerform([
            { action: 'press', options: { x: windowSize.width / 2, y: windowSize.height * 0.9 } },
            { action: "wait", options: { mseconds: 100 } },
            { action: 'moveTo', options: { x: windowSize.width / 2, y: windowSize.height * 0.1 } },
            { action: 'release' }
        ]);

    }

    //Verify that the send button does not exist by default, when the required fields are empty.
    const sendButton = await client.$('~sendButton');
    expect(await sendButton.isExisting()).toBeFalsy();//validate that send button does not exist


    if (isIOS) {
        //Validate that when valid input name is entered, the page responds propoerly.

        //Fill name field with invalid input with numeric characters
        const nameInput = await client.$('~name');
        await nameInput.setValue("Irmak123");

        //Fill surname field with invalid input with symbols.
        const surnameInput = await client.$('~surname');
        await surnameInput.setValue("D!?");

        // Fill the date input with wrong format
        const dateInput = await client.$('~birth-date');
        await dateInput.setValue("1998.03.22");


        // Fill the date input with wrong format
        const cityInput = await client.$('~city');
        await cityInput.setValue("ab?");

        // Left vaccine type and side effects empty

        const sendButton = await client.$('~sendButton');
        expect(await sendButton.isExisting()).toBeFalsy();//validate that send button does not exist
    }

    else {
        const nameInput = await client.$('~name');
        await nameInput.setValue("Irmak123");

        //Fill surname field with valid input 
        const surnameInput = await client.$('~surname');
        await surnameInput.setValue("D!?");

        // Fill the date input with wrong format
        const dateInput = await client.$('~birth-date');
        await dateInput.setValue("1998.03.22");

        //Fill city field with valid input
        const cityInput = await client.$('~city');
        await cityInput.setValue("ab?");

        const vaccineInput = await client.$('~vaccine');
        await vaccineInput.clearValue();

        const windowSize = await client.getWindowSize();
        await client.touchPerform([
            { action: 'press', options: { x: windowSize.width / 2, y: windowSize.height * 0.9 } },
            { action: "wait", options: { mseconds: 100 } },
            { action: 'moveTo', options: { x: windowSize.width / 2, y: windowSize.height * 0.1 } },
            { action: 'release' }
        ]);

        //validate that the send button is not displayed.
        const sendButton = await client.$('~sendButton');
        expect(await sendButton.isExisting()).toBeFalsy();//validate that send button does not exist
    }
});

//Test case 4: Validate that when the valid inputs for each required field is entered, the send button is displayed.
test("Valid Input test", async () => {

    //Fill name field with valid input 
    const nameInput = await client.$('~name');
    if(isIOS) client.execute('mobile: doubleTap', { element: nameInput });
    await nameInput.setValue("Goksu");

    //Fill surname field with valid input
    const surnameInput = await client.$('~surname');
    if(isIOS) client.execute('mobile: doubleTap', { element: surnameInput });
    await surnameInput.setValue("Turan");

    //Fill date with valid input
    const dateInput = await client.$('~birth-date');
    if(isIOS) client.execute('mobile: doubleTap', { element: dateInput });
    await dateInput.setValue("17.08.1998");

    //Fill city field with valid input
    const cityInput = await client.$('~city');
    if(isIOS) client.execute('mobile: doubleTap', { element: cityInput });
    await cityInput.setValue("Ankara");

    //Fill the vaccine type
    const vaccineInput = await client.$('~vaccine');
    if(isIOS) client.execute('mobile: doubleTap', { element: vaccineInput });
    await vaccineInput.setValue("Pfizer–BioNTech");

    //Fill the side effects
    const sideInput = await client.$('~side-effects');
    await sideInput.setValue("-");

    if (!isIOS) {
        const windowSize = await client.getWindowSize();
        await client.touchPerform([
            { action: 'press', options: { x: windowSize.width / 2, y: windowSize.height * 0.9 } },
            { action: "wait", options: { mseconds: 100 } },
            { action: 'moveTo', options: { x: windowSize.width / 2, y: windowSize.height * 0.1 } },
            { action: 'release' }
        ]);
    }
    //validate that the send button is displayed.
    const sendButton = await client.$('~sendButton');
    expect(await sendButton.isExisting()).toBeTruthy();
});

//Test case 5: Validate that radio button group for gender selection works properly.
test("Radio Button Group Test", async () => {

    if (!isIOS) {
        //Validate that Male radio button is selected by default in first load of the page
        const maleRadioButton = await client.$('~radio-buttonInput0');
        expect(await maleRadioButton.getAttribute("selected")).toBeTruthy();

        //Press the Female radio button validate that it is selected.
        const femaleRadioButton2 = await client.$('~radio-buttonInput1');
        await femaleRadioButton2.click();
        expect(await femaleRadioButton2.getAttribute("selected")).toBeTruthy();

        //Press the male radio button validate that it is selected.
        maleRadioButton.click();
        expect(await maleRadioButton.getAttribute("selected")).toBeTruthy();

    }
    else {
        const maleRadioButton = await client.$('~radio-buttonInput0');
        expect(await maleRadioButton.getAttribute("selected")).toBeTruthy();

        //Press the Female radio button validate that it is selected.
        const femaleRadioButton2 = await client.$('~radio-buttonInput1');
        client.execute('mobile: doubleTap', { element: femaleRadioButton2 });
        expect(await femaleRadioButton2.getAttribute("selected")).toBeTruthy();

        //Press the male radio button validate that it is selected.
        maleRadioButton.click();
        expect(await maleRadioButton.getAttribute("selected")).toBeTruthy();
    }

});


