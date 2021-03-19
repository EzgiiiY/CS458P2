# CS458P2
Inside the project2 directory,

	Firstly, run 
		npm install.
	Then, In one shell, run 
		npm run appium-server
	In another shell, run 
		npm run android (or npm run ios to launch to the iOS emulator).
	And finally, to run the tests:
		npm run appium-test -- --os=android
		or npm run appium-test -- --os=ios
