const http = require("http");
const axios = require("axios");
const { ORLEANS_URL, WEBHOOK_BASE_URL, WEBHOOK_PORT } = process.env;
const webhookUrl = WEBHOOK_BASE_URL + ":" + WEBHOOK_PORT;

async function registerMod() {
	try {
		const response = await axios.post(
			`${ORLEANS_URL}/meta/registermod`,
			{
				modName: "NodeJsMod",
				webhookBaseUrl: webhookUrl,
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		);
		console.log("Mod registered successfully");
	} catch (error) {
		console.error("Error registering mod:", error);
	}
}

function sendMetaRequest(targetType, requestName, targetId, serializedPayload) {
	axios
		.post(`${ORLEANS_URL}/meta/metamessage`, {
			targetType: targetType,
			targetId: targetId,
			requestName: requestName,
			serializedPayload: serializedPayload,
		})
		.then((response) => {
			console.log("Metamessage sent successfully");
		})
		.catch((error) => {
			console.error("Error sending metamessage:", error);
		});
}

async function sendMetaCall(
	interfaceName,
	interfaceKeyLong,
	methodName,
	serializedArgs,
) {
	try {
		const payload = {
			interfaceName: interfaceName,
			interfaceKeyLong: interfaceKeyLong,
			methodName: methodName,
			serializedArgs: serializedArgs,
		};
		const response = await axios.post(
			`${ORLEANS_URL}/meta/metacall`,
			payload,
		);
		console.log("Metamessage sent successfully:", response.data);
	} catch (error) {
		console.error("Error sending message:", error);
	}
}

function startApiServer() {
	const server = http.createServer((req, res) => {
		let reply = {};

		if (req.method === "POST") {
			if (req.url === "/getmodinfo") {
				reply = {
					name: "NodeJsMod",
					actions: [
						{
							id: 1,
							label: "NodeJsMod: Test Message",
							context: 0,
						},
					],
				};
			} else if (req.url.startsWith("/action/")) {
				console.log(req.url);
				const pid = parseInt(req.url.split("/")[2]);
				const serializedPayload = JSON.stringify({
					eventName: "modinjectjs",
					eventPayload:
						'CPPHud.addFailureNotification("NodeJs stuff");',
				});
				sendMetaRequest(
					"player",
					"ModTriggerHudEventRequest",
					pid,
					serializedPayload,
				);
				sendGameMessage(pid);
				reply = {}; // No response body needed
			}
		}
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(reply));
	});

	server.listen(WEBHOOK_PORT, "0.0.0.0", () => {
		console.log(`API server listening on http://0.0.0.0:${WEBHOOK_PORT}`);
	});
}

async function sendGameMessage(
	pid,
	message = "hello from nodejs modcall",
	channel = 0,
) {
	const serializedArgs = [
		JSON.stringify({
			channel: {
				channel: channel,
				channelFilter: "",
			},
			message: message,
			fromPlayerId: pid,
		}),
	];
	sendMetaCall("IChatGrain", pid, "SendMessage", serializedArgs);
}

module.exports = { startApiServer, registerMod };
