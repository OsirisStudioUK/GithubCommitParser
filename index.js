const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);



	let event = github.context.eventName;

	if (event !== "push") {
		// error how to core
		core.setFailed("This action only works on push events");
		return;
	}


	let ref = github.context.ref;
	let branch = ref.replace(/^refs\/(heads|tags)\//, '');

	let username = github.context.actor;
	let repo = github.context.repo.repo;


	let commitMessage = github.context.payload.commits[0].message;
	// explode commit message on new line
	let commitMessageArray = commitMessage.split("\n\n");

	let title = commitMessageArray[0];
	let body = commitMessageArray[1];

	let info = {
		"title": title,
		"body": body,
		"username": username,
		"repo": repo,
		"branch": branch,
		"timestamp": new Date().toISOString()
	};

	core.setOutput("info", JSON.stringify(info));
	console.log( JSON.stringify(info));

} catch (error) {
  core.setFailed(error.message);
}